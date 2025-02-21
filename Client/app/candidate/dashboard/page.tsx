"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BriefcaseIcon, SearchIcon } from "lucide-react"
import { ResumeUpload } from "@/components/resume-upload"

export default function CandidateDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const jobs = [
    { id: 1, title: "Software Engineer", company: "Tech Co", matchScore: 85 },
    { id: 2, title: "Data Scientist", company: "Data Corp", matchScore: 72 },
    { id: 3, title: "UX Designer", company: "Design Inc", matchScore: 90 },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Candidate Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResumeUpload />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Job Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline">
                <SearchIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Applied Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">5</p>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-bold mb-4">Recommended Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{job.company}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Match Score: {job.matchScore}%</span>
                  <Button size="sm">
                    <BriefcaseIcon className="mr-2 h-4 w-4" /> Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

