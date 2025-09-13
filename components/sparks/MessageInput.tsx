"use client";

import React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

interface MessageInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
}

const MessageInput = ({
  inputValue,
  setInputValue,
  onSendMessage,
  isLoading,
}: MessageInputProps) => {
  const { t } = useLanguage();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
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
              target.style.height = Math.min(target.scrollHeight, 80) + "px";
            }}
          />
          {inputValue.length > 1500 && (
            <div className="absolute bottom-1 right-2 text-xs text-muted-foreground">
              {inputValue.length}/2000
            </div>
          )}
        </div>
        <Button
          onClick={onSendMessage}
          disabled={!inputValue.trim() || isLoading || inputValue.length > 2000}
          className="px-3 py-2 h-9"
          size="sm"
        >
          <Send className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
