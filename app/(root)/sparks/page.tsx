"use client";

import React, { useState, useEffect, useRef } from "react";
import { streamSpark } from "@/lib/ai/spark.server";
import { useLanguage } from "@/lib/language-context";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import ChatHeader from "@/components/sparks/ChatHeader";
import MessagesList from "@/components/sparks/MessagesList";
import MessageInput from "@/components/sparks/MessageInput";

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
  const hasUpdatedInitialMessage = useRef(false);

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

  return (
    <div className="bg-background flex flex-col">
      <div className="flex flex-col h-[80vh] max-w-4xl mx-auto w-full">
        <ChatHeader />
        <MessagesList messages={messages} isLoading={isLoading} />
        <MessageInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default SparkPage;
