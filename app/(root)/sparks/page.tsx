"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { streamSpark } from "@/lib/spark.server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLanguage } from "@/lib/language-context";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const SparkPage = () => {
  const { t, currentLanguage } = useLanguage();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: t("initialGreeting"),
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasUpdatedInitialMessage = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && !hasUpdatedInitialMessage.current) {
      const userName = user.displayName?.split(" ")[0] || "Teacher";
      const personalizedGreeting = t("personalizedGreeting").replace(
        "{name}",
        userName
      );
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === "1"
            ? {
                ...msg,
                content: personalizedGreeting,
              }
            : msg
        )
      );
      hasUpdatedInitialMessage.current = true;
    }
  }, [user?.uid, t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();

    if (!trimmedInput || isLoading) return;

    if (trimmedInput.length > 2000) {
      const errorResponse: Message = {
        id: Date.now().toString(),
        content: t("yourMessageTooLong"),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
      return;
    }

    const now = Date.now();
    const timeSinceLastMessage = now - lastMessageTime;

    if (timeSinceLastMessage < 1000) {
      const errorResponse: Message = {
        id: Date.now().toString(),
        content: t("pleaseWait"),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: trimmedInput,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setLastMessageTime(now);

    const aiMessageId = (Date.now() + 1).toString();
    const initialAiMessage: Message = {
      id: aiMessageId,
      content: "",
      sender: "ai",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, initialAiMessage]);
    setIsLoading(false);

    try {
      const userName = user?.displayName?.split(" ")[0] || "Teacher";
      const chunks = await streamSpark(trimmedInput, currentLanguage, userName);
      let fullContent = "";

      for (const chunk of chunks) {
        if (!chunk.success) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessageId ? { ...msg, content: chunk.message } : msg
            )
          );
          break;
        }

        if (chunk.isStreaming) {
          fullContent += chunk.message;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessageId ? { ...msg, content: fullContent } : msg
            )
          );
          await new Promise((resolve) => setTimeout(resolve, 50));
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessageId ? { ...msg, content: fullContent } : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);

      let errorMessage = t("sorryTrouble");

      if (error instanceof Error) {
        if (error.message.includes("fetch")) {
          errorMessage = t("networkIssue");
        } else if (error.message.includes("timeout")) {
          errorMessage = t("requestTimeout");
        } else if (error.message.includes("No response")) {
          errorMessage = t("serverNotResponding");
        }
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId ? { ...msg, content: errorMessage } : msg
        )
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-background flex flex-col">
      <div className="flex flex-col h-[80vh] max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 p-4 border-b bg-card flex-shrink-0">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-primary">
              {t("classSparks")}
            </h1>
            <p className="text-xs text-muted-foreground">
              {t("makeClassMoreClasssy")}
            </p>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-3 overflow-hidden">
          <div className="h-full overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
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
                          li: ({ children }) => (
                            <li className="text-sm">{children}</li>
                          ),
                          h1: ({ children }) => (
                            <h1 className="text-xl font-bold mb-2">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-lg font-bold mb-2">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-md font-bold mb-1">
                              {children}
                            </h3>
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
                            <strong className="font-semibold">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic">{children}</em>
                          ),
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
            ))}

            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 text-primary" />
                </div>
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full border-t bg-card p-4 flex-shrink-0 z-50">
          <div className="max-w-2xl mx-auto flex gap-2">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t("askMeAnything")}
                className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                rows={1}
                maxLength={2000}
                style={{
                  minHeight: "36px",
                  maxHeight: "80px",
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height =
                    Math.min(target.scrollHeight, 80) + "px";
                }}
              />
              {inputValue.length > 1500 && (
                <div className="absolute bottom-1 right-2 text-xs text-muted-foreground">
                  {inputValue.length}/2000
                </div>
              )}
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={
                !inputValue.trim() || isLoading || inputValue.length > 2000
              }
              className="px-3 py-2 h-9"
              size="sm"
            >
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SparkPage;
