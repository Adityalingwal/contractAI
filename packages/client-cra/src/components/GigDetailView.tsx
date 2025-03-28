import React, { useState } from 'react'
import { Button } from './ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card'
import { GigDetailViewProps } from '../types/gigsTypes'
import { ProfileModal } from './ProflleModal'

export function GigDetailView({ gig, onBack }: GigDetailViewProps) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  const handleApplyClick = () => {
    setIsProfileModalOpen(true)
  }

  const handleProfileSubmit = (profileData: any) => {
    console.log('Profile submitted:', profileData)
    // Here you would handle the profile submission,
    // e.g., save to database, send application, etc.
    setIsProfileModalOpen(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Gigs
        </Button>
        <h1 className="text-3xl font-bold">{gig.title}</h1>
      </div>

      {/* Main Card */}
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="p-6">
          <div className="flex justify-between items-start md:items-center">
            <div>
              <CardTitle className="text-2xl font-bold">{gig.title}</CardTitle>
              <CardDescription className="text-sm mt-1">
                {gig.category}
              </CardDescription>
            </div>
            <div className="bg-primary/10 px-4 py-2 rounded-full">
              <span className="font-bold text-primary">{gig.budget}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <p className="leading-relaxed">{gig.description}</p>
          </div>

          {/* Stack Client Info first, then Project Details */}
          <div className="space-y-6">
            {/* Client Information */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Client Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Client Name</p>
                      <p className="text-sm text-muted-foreground">
                        Member since {new Date().getFullYear() - 2}
                      </p>
                    </div>
                  </div>
                  <div className="pl-3">
                    <p className="text-sm">
                      <span className="font-medium">Success Rate:</span> 95%
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Projects Posted:</span> 15
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="whitespace-pre-line">
                {gig.details}
              </CardContent>
            </Card>
          </div>

          {/* Requirements */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                <li>Experience with required technologies</li>
                <li>Availability for the project timeline</li>
                <li>Portfolio of similar work</li>
                <li>Strong communication skills</li>
                <li>Ability to meet deadlines</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>

        <CardFooter className="p-6 flex justify-end space-x-4">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button onClick={handleApplyClick}>Apply Now</Button>
        </CardFooter>
      </Card>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)}
        onSubmit={handleProfileSubmit}
      />
    </div>
  )
}
