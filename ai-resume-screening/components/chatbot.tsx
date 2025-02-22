"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send } from "lucide-react";
import axios from "axios";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (input.trim()) {
      // Add user's message to state
      setMessages([...messages, { text: input, sender: "user" }]);

      try {
        // Send the message to the backend using axios
        const response = await axios.post(
          "http://127.0.0.1:8000/api/chatbot/",
          {
            message: input,
          }
        );

        // Assuming the bot's reply is in the 'data.reply' field
        setMessages((prev) => [
          ...prev,
          { text: response.data.answer, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => [
          ...prev,
          { text: "Error: Unable to connect to the server", sender: "bot" },
        ]);
      }

      // Clear the input field
      setInput("");
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          className="fixed bottom-4 right-4 rounded-full p-4"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={24} />
        </Button>
      )}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-80">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Chatbot
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
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
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-secondary"
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
  );
}
