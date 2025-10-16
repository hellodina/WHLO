import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// PUT /api/missions/[id] - Update a specific mission
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: missionId } = await params
    const body = await request.json()
    const { title, description, status } = body

    console.log('Update mission request:', { missionId, title, description, status })

    // Validate required fields
    if (!title || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Check if mission exists and belongs to the user
    const existingMission = await prisma.mission.findFirst({
      where: {
        id: missionId,
        userId: session.user.id
      }
    })

    if (!existingMission) {
      return NextResponse.json(
        { error: 'Mission not found' },
        { status: 404 }
      )
    }

    const updatedMission = await prisma.mission.update({
      where: {
        id: missionId
      },
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        status: status || existingMission.status
      }
    })

    return NextResponse.json(updatedMission)
  } catch (error) {
    console.error('Error updating mission:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// DELETE /api/missions/[id] - Delete a specific mission
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: missionId } = await params

    // Check if mission exists and belongs to the user
    const existingMission = await prisma.mission.findFirst({
      where: {
        id: missionId,
        userId: session.user.id
      }
    })

    if (!existingMission) {
      return NextResponse.json(
        { error: 'Mission not found' },
        { status: 404 }
      )
    }

    await prisma.mission.delete({
      where: {
        id: missionId
      }
    })

    return NextResponse.json({ message: 'Mission deleted successfully' })
  } catch (error) {
    console.error('Error deleting mission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
