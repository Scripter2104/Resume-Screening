"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

export default function JobDetails({ params }: { params: { id: string } }) {
  const [candidates, setCandidates] = useState([
    { id: 1, name: "John Doe", overallScore: 85 },
    { id: 2, name: "Jane Smith", overallScore: 78 },
    { id: 3, name: "Bob Johnson", overallScore: 92 },
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Job Details: Software Engineer</h1>
      <h2 className="text-2xl font-bold mb-4">Shortlisted Candidates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{candidate.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div style={{ width: 80, height: 80 }}>
                    <CircularProgressbar value={candidate.overallScore} text={`${candidate.overallScore}%`} />
                  </div>
                  <Button asChild>
                    <Link href={`/recruiter/candidate/${candidate.id}`}>View Profile</Link>
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

