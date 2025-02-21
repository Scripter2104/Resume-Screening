import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Chatbot } from "@/components/chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AI Resume Screening Platform",
  description: "Find the perfect match for your job openings with AI-powered resume screening.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'