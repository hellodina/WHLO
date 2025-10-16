"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

interface Mission {
  id: string
  title: string
  description: string | null
  status: string
  createdAt: string
  updatedAt: string
}

interface MissionCardProps {
  mission: Mission
  onEdit: (mission: Mission) => void
  onDelete: (missionId: string) => void
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'in progress':
      return 'bg-[#FF4500]/10 text-[#FF4500] border-[#FF4500]/20'
    case 'completed':
      return 'bg-[#64FFDA]/10 text-[#64FFDA] border-[#64FFDA]/20'
    case 'planning':
      return 'bg-[#64FFDA]/10 text-[#64FFDA] border-[#64FFDA]/20'
    case 'not started':
      return 'bg-[#CCD6F6]/10 text-[#CCD6F6] border-[#CCD6F6]/20'
    default:
      return 'bg-[#FF4500]/10 text-[#FF4500] border-[#FF4500]/20'
  }
}

export default function MissionCard({ mission, onEdit, onDelete }: MissionCardProps) {
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${mission.title}"? This action cannot be undone.`)) {
      onDelete(mission.id)
    }
  }

  return (
    <Card className="bg-[#112240] border-[#233554] hover:border-[#FF4500]/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,69,0,0.15)] cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-[#E6F1FF] text-xl font-['Space_Grotesk',_'Inter',_sans-serif] group-hover:text-[#FF4500] transition-colors flex-1 pr-2">
            {mission.title}
          </CardTitle>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(mission)
              }}
              className="h-8 w-8 p-0 hover:bg-[#FF4500]/20 text-[#8892B0] hover:text-[#FF4500]"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete()
              }}
              className="h-8 w-8 p-0 hover:bg-red-500/20 text-[#8892B0] hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-[#8892B0] leading-relaxed">
          {mission.description || 'No description provided.'}
        </p>
      </CardContent>
      <CardFooter>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(mission.status)}`}>
          {mission.status}
        </span>
      </CardFooter>
    </Card>
  )
}
