"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadIcon } from "lucide-react"

export function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    // Here you would typically send the file to your server
    // For this example, we'll just log it
    console.log("Uploading file:", file.name)

    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("File uploaded successfully")
    setFile(null)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="resume">Upload Resume (PDF or DOCX)</Label>
        <Input id="resume" type="file" accept=".pdf,.docx" onChange={handleFileChange} />
      </div>
      {file && (
        <Button onClick={handleUpload} className="w-full">
          <UploadIcon className="mr-2 h-4 w-4" /> Upload {file.name}
        </Button>
      )}
    </div>
  )
}

