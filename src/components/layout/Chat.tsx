"use client";

import React, { useRef, useEffect } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

interface Message {
    role: string;
    content: string;
}

const Chat = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([]);

  const [status, setStatus] = React.useState<
    "idle" | "submitted"
  >("idle");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input) {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitted");
    try {
      if (input?.trim()) {
        const userMessage = { role: "user", content: input };

        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const response = await fetch(`/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
          }),
        });

        const data = await response.json();

        setMessages((prevMessages) => [
          ...prevMessages,
          { role: data.role, content: data.content },
        ]);
        setInput("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className="flex flex-col items-end justify-end bg-transparent w-full h-full max-h-[87vh] max-w-4xl mx-auto">
      {/* Messages Area */}
      <ScrollArea className="w-full h-[500px] md:h-[530px]" ref={scrollAreaRef}>
        <div className="space-y-4 z-0">
          {messages.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg animate-pulse">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Welcome! How can I assist you today?
              </h3>
              <p className="text-gray-300 max-w-md mx-auto leading-relaxed">
                I'm here to help answer your questions, provide information, or
                just have a friendly conversation.
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={`${message.content}-${index}`}
              className={cn(
                "flex gap-3 max-w-[85%]",
                message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              {/* Avatar */}
              <Avatar className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                {message.role === "user" ? (
                  <AvatarFallback className="bg-gradient-to-r from-slate-900 to-slate-700">
                    you
                  </AvatarFallback>
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-teal-800 via-teal-500 to-[#373069] text-white rounded-full">
                    AI
                  </AvatarFallback>
                )}
              </Avatar>

              {/* Message Bubble */}
              <div
                className={cn(
                  "rounded-2xl px-4 py-2 max-w-full break-words",
                  message.role === "user"
                    ? "bg-gray-200 text-black rounded-br-md"
                    : "bg-gray-300 text-gray-900 rounded-bl-md"
                )}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {status === "submitted" && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                AI
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="w-full py-2 flex flex-col bg-neutral-800 rounded-lg px-2">
        <div className="flex items-end gap-3 rounded-2xl">
          <Input
            value={input}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            className="flex-1 border-none bg-transparent text-white placeholder-gray-200 resize-none min-h-[44px] text-base"
            placeholder="Type your message..."
            disabled={status === "submitted"}
          />
          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || status === "submitted"}
            size="icon"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
