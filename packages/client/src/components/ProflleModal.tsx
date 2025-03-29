import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (profileData: any) => void
  isSubmitting?: boolean
}

export function ProfileModal({ isOpen, onClose, onSubmit, isSubmitting = false }: ProfileModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const profileData = Object.fromEntries(formData)
    onSubmit(profileData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isSubmitting && !open && onClose()}>
      <DialogContent className="sm:max-w-[90vw] w-full max-h-[90vh] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Complete Your Professional Profile</DialogTitle>
          <DialogDescription>
            Fill in the details below to create your freelancer profile and apply for this gig.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4 flex flex-col h-full">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-gray-700">Personal Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-600">Full Name *</Label>
                <Input id="fullName" name="fullName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="professionalTitle" className="text-gray-600">Professional Title *</Label>
                <Input 
                  id="professionalTitle" 
                  name="professionalTitle" 
                  placeholder="e.g. Full Stack Developer" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-600">Email Address *</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="your.email@example.com"
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-600">Professional Bio *</Label>
              <Textarea 
                id="bio" 
                name="bio" 
                placeholder="Brief introduction about yourself and your experience" 
                className="min-h-[100px]"
                required
              />
            </div>
          </div>

          {/* Skills & Experience */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-gray-700">Skills & Experience</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experienceLevel" className="text-gray-600">Experience Level *</Label>
                <Select name="experienceLevel" defaultValue="intermediate">
                  <SelectTrigger className="text-black font-medium">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white [&>*]:text-black [&>*]:font-medium [&>*]:!opacity-100">
                    <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                    <SelectItem value="expert">Expert (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourlyRate" className="text-gray-600">Hourly Rate (USD) *</Label>
                <Input 
                  id="hourlyRate" 
                  name="hourlyRate" 
                  type="number" 
                  placeholder="e.g. 50" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills" className="text-gray-600">Skills *</Label>
              <Textarea 
                id="skills" 
                name="skills" 
                placeholder="List your relevant skills (e.g. React, Node.js, UI/UX Design)"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolioLink" className="text-gray-600">Portfolio Link</Label>
              <Input 
                id="portfolioLink" 
                name="portfolioLink" 
                type="url" 
                placeholder="https://your-portfolio.com" 
              />
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-gray-700">Availability</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="availability" className="text-gray-600">Availability *</Label>
                <Select name="availability" defaultValue="fullTime">
                  <SelectTrigger className="text-black font-medium">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent className="bg-white [&>*]:text-black [&>*]:font-medium [&>*]:!opacity-100">
                    <SelectItem value="fullTime">Full-time (40+ hrs/week)</SelectItem>
                    <SelectItem value="partTime">Part-time (20-30 hrs/week)</SelectItem>
                    <SelectItem value="limited">Limited (10-20 hrs/week)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-gray-600">Available From *</Label>
                <Input 
                  id="startDate" 
                  name="startDate" 
                  type="date" 
                  required 
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              disabled={isSubmitting}
              className="border-blue-500 text-blue-500 hover:bg-blue-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}