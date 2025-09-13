"use client";

import React from "react";
import { Bot } from "lucide-react";

const LoadingIndicator = () => {
  return (
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
  );
};

export default LoadingIndicator;
