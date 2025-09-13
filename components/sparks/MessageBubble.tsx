"use client";

import React from "react";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div
      className={`flex gap-2 ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {message.sender === "ai" && (
        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-3 h-3 text-primary" />
        </div>
      )}

      <div
        className={`max-w-[75%] rounded-lg px-3 py-2 ${
          message.sender === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        }`}
      >
        <div className="text-sm prose prose-sm max-w-none dark:prose-invert">
          {message.sender === "ai" ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-2 space-y-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-2 space-y-1">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className="text-sm">{children}</li>,
                h1: ({ children }) => (
                  <h1 className="text-xl font-bold mb-2">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-lg font-bold mb-2">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-md font-bold mb-1">{children}</h3>
                ),
                code: ({ children }) => (
                  <code className="bg-background/50 px-1 py-0.5 rounded text-xs font-mono">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-background/50 p-2 rounded text-xs font-mono overflow-x-auto mb-2">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-primary/30 pl-2 italic mb-2">
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="text-primary underline hover:no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>
        <p className="text-xs opacity-70 mt-1">
          {message.timestamp.getHours().toString().padStart(2, "0")}:
          {message.timestamp.getMinutes().toString().padStart(2, "0")}
        </p>
      </div>

      {message.sender === "user" && (
        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-3 h-3 text-primary-foreground" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
