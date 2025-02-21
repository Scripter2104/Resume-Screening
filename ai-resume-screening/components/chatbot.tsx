"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Send } from "lucide-react"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([])
  const [input, setInput] = useState("")

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }])
      // In a real application, you would call an AI service here to get the bot's response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Thank you for your message. How can I assist you today?", sender: "bot" },
        ])
      }, 1000)
      setInput("")
    }
  }

  return (
    <>
      {!isOpen && (
        <Button className="fixed bottom-4 right-4 rounded-full p-4" onClick={() => setIsOpen(true)}>
          <MessageCircle size={24} />
        </Button>
      )}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-80">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Chatbot
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-auto mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg ${
                    message.sender === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-secondary"
                  }`}
                  style={{ maxWidth: "80%" }}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="flex">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} className="ml-2">
                <Send size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

