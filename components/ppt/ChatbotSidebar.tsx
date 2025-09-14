import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  X,
  Sparkles,
  FileText,
  GraduationCap,
  BookOpen,
  Calculator,
  Globe,
  Atom,
  Heart,
} from "lucide-react";
import { Slide, ThemeSettings } from "../../lib/ppt/ppttypes";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  slideData?: {
    slides: Slide[];
    theme: ThemeSettings;
  };
}

interface ChatbotSidebarProps {
  onClose: () => void;
  currentTheme: ThemeSettings;
  existingSlides: Slide[];
  onSlidesGenerated: (slides: Slide[], theme: ThemeSettings) => void;
}

export const ChatbotSidebar = ({
  onClose,
  currentTheme,
  existingSlides,
  onSlidesGenerated,
}: ChatbotSidebarProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI teaching assistant. I can help you create engaging lesson presentations, educational slides, and interactive content for your students. Try saying 'Create a lesson about photosynthesis' or 'Make slides for teaching fractions'.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [slideCount, setSlideCount] = useState(5);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = inputText.trim();
    setInputText("");
    setIsTyping(true);

    try {
      const isSlideGenerationRequest =
        userInput.toLowerCase().includes("create") ||
        userInput.toLowerCase().includes("make") ||
        userInput.toLowerCase().includes("generate") ||
        userInput.toLowerCase().includes("presentation") ||
        userInput.toLowerCase().includes("slides");

      if (isSlideGenerationRequest) {
        console.log("Generating slides with count:", slideCount);
        const response = await fetch("/api/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "generateSlides",
            prompt: userInput,
            currentTheme,
            existingSlides,
            slideCount,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate slides");
        }

        const data = await response.json();

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          isUser: false,
          timestamp: new Date(),
          slideData: {
            slides: data.slides,
            theme: data.theme,
          },
        };

        setMessages((prev) => [...prev, botMessage]);
        onSlidesGenerated(data.slides, data.theme);
      } else {
        const response = await fetch("/api/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "chat",
            prompt: userInput,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        const data = await response.json();

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          isUser: false,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I encountered an error. Please make sure your API key is configured correctly and try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-80 bg-card/50 backdrop-blur-sm border-l border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <h2 className="text-sm font-medium text-card-foreground">
              AI Assistant
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            {!message.isUser && (
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 ${
                message.isUser
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <p className="text-sm">{message.text}</p>

              {message.slideData && (
                <div className="mt-2 p-2 bg-accent/50 rounded border border-border">
                  <div className="flex items-center gap-1 mb-1">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-xs text-primary font-medium">
                      Generated {message.slideData.slides.length} slides
                    </span>
                  </div>
                  <div className="text-xs text-foreground">
                    {message.slideData.slides.map((slide, index) => (
                      <div key={slide.id} className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>
                          Slide {index + 1}: {slide.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            {message.isUser && (
              <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-3 h-3 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 justify-start">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Bot className="w-3 h-3 text-primary-foreground" />
            </div>
            <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-4 h-4 text-primary" />
            <Label
              htmlFor="slideCount"
              className="text-xs text-muted-foreground"
            >
              Number of slides:
            </Label>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Input
              id="slideCount"
              type="number"
              min="1"
              max="20"
              value={slideCount}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 1 && value <= 20) {
                  setSlideCount(value);
                } else if (e.target.value === "") {
                  setSlideCount(5);
                }
              }}
              onBlur={(e) => {
                if (e.target.value === "" || parseInt(e.target.value) < 1) {
                  setSlideCount(5);
                }
              }}
              className="w-20 h-8 text-center"
            />
            <span className="text-xs text-muted-foreground">slides</span>
            <div className="text-xs text-primary font-medium">
              (Will generate {slideCount} slides)
            </div>
          </div>

          <div className="text-xs text-muted-foreground mb-2">
            Quick lesson prompts:
          </div>
          <div className="grid grid-cols-1 gap-1">
            {[
              { text: "Create a lesson about photosynthesis", icon: BookOpen },
              { text: "Make slides for teaching fractions", icon: Calculator },
              { text: "Generate a geography lesson", icon: Globe },
              { text: "Create a chemistry presentation", icon: Atom },
              { text: "Make slides about human anatomy", icon: Heart },
            ].map(({ text, icon: Icon }) => (
              <Button
                key={text}
                variant="outline"
                size="sm"
                onClick={() => setInputText(text)}
                className="justify-start h-8 text-xs"
              >
                <Icon className="w-3 h-3 mr-2" />
                {text}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your lesson idea or select a prompt above..."
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
