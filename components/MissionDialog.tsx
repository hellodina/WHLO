"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Mission {
  id: string
  title: string
  description: string | null
  status: string
  createdAt: string
  updatedAt: string
}

interface MissionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mission?: Mission | null
  onSubmit: (data: { title: string; description: string; status: string }) => Promise<void>
  isLoading?: boolean
}

const statusOptions = [
  { value: 'Planning', label: 'Planning' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Not Started', label: 'Not Started' }
]

export default function MissionDialog({ 
  open, 
  onOpenChange, 
  mission, 
  onSubmit, 
  isLoading = false 
}: MissionDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('In Progress')

  // Reset form when dialog opens/closes or mission changes
  useEffect(() => {
    if (open) {
      if (mission) {
        setTitle(mission.title)
        setDescription(mission.description || '')
        setStatus(mission.status)
      } else {
        setTitle('')
        setDescription('')
        setStatus('In Progress')
      }
    }
  }, [open, mission])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('Please enter a title for your mission.')
      return
    }

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || '',
        status
      })
      
      // Reset form and close dialog
      setTitle('')
      setDescription('')
      setStatus('In Progress')
      onOpenChange(false)
    } catch (error) {
      console.error('Error submitting mission:', error)
    }
  }

  const isEditMode = !!mission

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#112240] border-[#233554] text-[#E6F1FF] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#E6F1FF]">
            {isEditMode ? 'Edit Mission' : 'Create New Mission'}
          </DialogTitle>
          <DialogDescription className="text-[#8892B0]">
            {isEditMode 
              ? 'Update your mission details below.' 
              : 'Fill in the details for your new mission below.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-[#E6F1FF]">
              Title *
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter mission title..."
              className="bg-[#0A192F] border-[#233554] text-[#E6F1FF] placeholder:text-[#8892B0] focus:border-[#FF4500]"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-[#E6F1FF]">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter mission description..."
              className="bg-[#0A192F] border-[#233554] text-[#E6F1FF] placeholder:text-[#8892B0] focus:border-[#FF4500] min-h-[100px]"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium text-[#E6F1FF]">
              Status
            </label>
            <Select value={status} onValueChange={setStatus} disabled={isLoading}>
              <SelectTrigger className="bg-[#0A192F] border-[#233554] text-[#E6F1FF] focus:border-[#FF4500]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-[#112240] border-[#233554]">
                {statusOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="text-[#E6F1FF] hover:bg-[#233554] focus:bg-[#233554]"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="border-[#8892B0] text-[#8892B0] hover:bg-[#8892B0] hover:text-[#0A192F] bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="bg-[#FF4500] hover:bg-[#FF4500]/90 text-white font-semibold"
            >
              {isLoading ? 'Saving...' : (isEditMode ? 'Update Mission' : 'Create Mission')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
