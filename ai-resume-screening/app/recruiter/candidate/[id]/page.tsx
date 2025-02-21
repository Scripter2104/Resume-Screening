"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ExternalLink, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function CandidateProfile({ params }: { params: { id: string } }) {
  const [candidate] = useState({
    name: "Soumil Rathi",
    email: "soumilrathi@gmail.com",
    education: {
      degree: "Bachelors",
      major: "Computer Science",
      school: "University of Illinois Urbana Champaign",
      gpa: "NA",
      score: 85,
    },
    workExperience: {
      score: 78,
      positions: [
        {
          title: "Machine Learning Intern",
          company: "SatSure Analytics India Private Limited",
          date: "Jun 2022",
          description: [
            "Conducted research(now implemented) in the prediction of collisions of the satellites of SatSure with space debris.",
            "The machine learning model developed during the project will help predict satellite collision and determine satellite insurance.",
          ],
        },
        {
          title: "Data Science Intern",
          company: "Amica Financial Technologies Private Limited",
          date: "May 2021",
        },
      ],
    },
    technicalSkills: [
      {
        skill: "Javascript",
        score: 90,
        seenIn: ["EyeClik", "Data Science Inte..."],
      },
      {
        skill: "Python",
        score: 85,
        seenIn: ["EyeClik", "Bayesian Machine..."],
      },
    ],
    interviews: [
      {
        number: 1,
        score: 100,
        feedback: "Feedback Form",
        companyFit: "Company Fit Form",
        interviewer: "Soumil Rathi",
      },
    ],
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xJcngCf04bFu4fMVa46a1hBgyhCiqx.png`}
              />
              <AvatarFallback>SR</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold">{candidate.name}</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">{candidate.email}</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
            <Button variant="outline" className="text-sm">
              Change Stage
            </Button>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Education Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Education</h2>
                <CircularProgress value={candidate.education.score} />
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-purple-600 dark:text-purple-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Major: {candidate.education.major}</p>
                  <p className="font-medium">{candidate.education.school}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">GPA: {candidate.education.gpa}</p>
                  <p className="text-sm">{candidate.education.degree}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Skills Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Technical Skills</h2>
                <CircularProgress value={85} />
              </div>
              <div className="space-y-6">
                {candidate.technicalSkills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{skill.skill}</span>
                      <CircularProgress value={skill.score} size="small" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Seen in: {skill.seenIn.join(", ")}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Work Experience Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Work Experience</h2>
                <CircularProgress value={candidate.workExperience.score} />
              </div>
              <div className="flex space-x-8 mb-6">
                <Button
                  variant="ghost"
                  className="text-purple-600 dark:text-purple-400 font-medium border-b-2 border-purple-600 dark:border-purple-400 rounded-none"
                >
                  Jobs
                </Button>
                <Button variant="ghost" className="text-gray-500">
                  Projects
                </Button>
              </div>
              <div className="space-y-6">
                {candidate.workExperience.positions.map((position, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CircularProgress value={85} size="small" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{position.title}</h3>
                        <span className="text-sm text-gray-500">{position.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{position.company}</p>
                      {position.description?.map((desc, i) => (
                        <p key={i} className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                          {desc}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interview Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Interview #{candidate.interviews[0].number}</h2>
                <CircularProgress value={candidate.interviews[0].score} />
              </div>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start text-left">
                  {candidate.interviews[0].feedback}
                </Button>
                <Button variant="outline" className="w-full justify-start text-left">
                  {candidate.interviews[0].companyFit}
                </Button>
                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-2">Interviewers</h3>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>SR</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{candidate.interviews[0].interviewer}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function CircularProgress({ value, size = "default" }: { value: number; size?: "default" | "small" }) {
  return (
    <div className={cn("relative flex items-center justify-center", size === "default" ? "w-12 h-12" : "w-8 h-8")}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          className="text-gray-200 dark:text-gray-700"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="16"
          cx="50%"
          cy="50%"
        />
        <circle
          className="text-purple-600 dark:text-purple-400"
          strokeWidth="4"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="16"
          cx="50%"
          cy="50%"
          style={{
            strokeDasharray: `${2 * Math.PI * 16}`,
            strokeDashoffset: `${2 * Math.PI * 16 * (1 - value / 100)}`,
          }}
        />
      </svg>
      <span
        className={cn(
          "absolute text-purple-600 dark:text-purple-400 font-medium",
          size === "default" ? "text-sm" : "text-xs",
        )}
      >
        {value}
      </span>
    </div>
  )
}

