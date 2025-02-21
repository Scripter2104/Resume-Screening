"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PostJob() {
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  
  // Main weights
  const [weights, setWeights] = useState({
    education: 25,
    workHistory: 25,
    technicalSkills: 25,
    softSkills: 25
  })

  // Education sub-weights
  const [educationWeights, setEducationWeights] = useState({
    gpa: 50,
    universityRank: 50
  })

  // Work history sub-weights
  const [workHistoryWeights, setWorkHistoryWeights] = useState({
    jobRoles: 50,
    projects: 50
  })

  // Skills state with better structure
  const [skills, setSkills] = useState({
    technical: [{ name: "", weight: 0 }],
    soft: [{ name: "", weight: 0 }]
  })

  // Weight validation
  const [weightError, setWeightError] = useState("")

  // Validate total weights equals 100
  useEffect(() => {
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0)
    if (totalWeight !== 100) {
      setWeightError(`Total weight must be 100%. Current total: ${totalWeight}%`)
    } else {
      setWeightError("")
    }
  }, [weights])

  // Handle main weight changes
  const handleWeightChange = (category: keyof typeof weights, value: number) => {
    const otherCategories = Object.keys(weights).filter(key => key !== category) as Array<keyof typeof weights>
    const remainingWeight = 100 - value
    const scaleFactor = remainingWeight / (100 - weights[category])
    
    const newWeights = { ...weights }
    newWeights[category] = value
    
    otherCategories.forEach(key => {
      newWeights[key] = Math.round(weights[key] * scaleFactor)
    })
    
    setWeights(newWeights)
  }

  // Handle skills management
  const addSkill = (type: 'technical' | 'soft') => {
    setSkills(prev => ({
      ...prev,
      [type]: [...prev[type], { name: "", weight: 0 }]
    }))
  }

  const updateSkill = (type: 'technical' | 'soft', index: number, field: 'name' | 'weight', value: string | number) => {
    const newSkills = { ...skills }
    newSkills[type][index][field] = value
    setSkills(newSkills)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (weightError) {
      alert("Please adjust weights to total 100% before submitting")
      return
    }
    
    console.log("Job posted", {
      jobTitle,
      jobDescription,
      weights,
      educationWeights,
      workHistoryWeights,
      skills
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">Post a New Job</h1>
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input
                    id="job-title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="job-description">Job Description</Label>
                  <Textarea
                    id="job-description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Main Weights */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Scoring Criteria</h3>
                {weightError && (
                  <Alert variant="destructive">
                    <AlertDescription>{weightError}</AlertDescription>
                  </Alert>
                )}
                {Object.entries(weights).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label className="flex justify-between">
                      {key.replace(/([A-Z])/g, ' $1').trim()}: {value}%
                    </Label>
                    <Slider
                      value={[value]}
                      onValueChange={([newValue]) => handleWeightChange(key as keyof typeof weights, newValue)}
                      max={100}
                      step={1}
                      className="my-4"
                    />
                  </div>
                ))}
              </div>

              {/* Detailed Criteria */}
              <Accordion type="single" collapsible className="w-full">
                {/* Education Section */}
                <AccordionItem value="education">
                  <AccordionTrigger>Education Criteria</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    {Object.entries(educationWeights).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <Label>{key.replace(/([A-Z])/g, ' $1').trim()}: {value}%</Label>
                        <Slider
                          value={[value]}
                          onValueChange={([newValue]) => setEducationWeights(prev => ({
                            ...prev,
                            [key]: newValue,
                            [Object.keys(educationWeights).find(k => k !== key)!]: 100 - newValue
                          }))}
                          max={100}
                          step={1}
                        />
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                {/* Work History Section */}
                <AccordionItem value="work-history">
                  <AccordionTrigger>Work History Criteria</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    {Object.entries(workHistoryWeights).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <Label>{key.replace(/([A-Z])/g, ' $1').trim()}: {value}%</Label>
                        <Slider
                          value={[value]}
                          onValueChange={([newValue]) => setWorkHistoryWeights(prev => ({
                            ...prev,
                            [key]: newValue,
                            [Object.keys(workHistoryWeights).find(k => k !== key)!]: 100 - newValue
                          }))}
                          max={100}
                          step={1}
                        />
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                {/* Skills Sections */}
                {['technical', 'soft'].map((skillType) => (
                  <AccordionItem key={skillType} value={skillType}>
                    <AccordionTrigger>
                      {skillType.charAt(0).toUpperCase() + skillType.slice(1)} Skills
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {skills[skillType as keyof typeof skills].map((skill, index) => (
                          <div key={index} className="space-y-2">
                            <Input
                              placeholder={`Enter ${skillType} skill`}
                              value={skill.name}
                              onChange={(e) => updateSkill(skillType as 'technical' | 'soft', index, 'name', e.target.value)}
                              className="mb-2"
                            />
                            <Label>Weight: {skill.weight}%</Label>
                            <Slider
                              value={[skill.weight]}
                              onValueChange={([newValue]) => updateSkill(skillType as 'technical' | 'soft', index, 'weight', newValue)}
                              max={100}
                              step={1}
                            />
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() => addSkill(skillType as 'technical' | 'soft')}
                          className="mt-4"
                        >
                          Add {skillType} Skill
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Button type="submit" className="w-full">
                Post Job
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

