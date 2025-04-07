"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Trash2, Brain, Calendar } from "lucide-react";
import { useMessages } from "@/features/assistant-coach/hooks/useMessages";
import { MessageList } from "@/features/assistant-coach/components/MessageList";
import { InsightsPanel } from "@/features/assistant-coach/components/InsightsPanel";
import { TrainingContext } from "@/features/assistant-coach/components/TrainingContext";
import { Card, CardContent } from "@/components/ui/card";

export default function AssistantCoachPage() {
  const [showInsightsPanel, setShowInsightsPanel] = useState(false);
  const [isAIMode, setIsAIMode] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    isLoading,
    messagesEndRef,
    handleSendMessage,
    handleInsightClick,
    handleClearMemory,
    scrollToBottom,
  } = useMessages();

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center p-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Assistant Coach</h1>
            <p className="text-muted-foreground">
              Your AI-powered coaching assistant to help with training plans,
              philosophy, and team management
            </p>
          </div>
        </div>

        <div className="flex flex-1 px-6 pb-6 gap-6">
          {/* Left Panel */}
          <div className="w-[380px] space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-semibold">Assistant Settings</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3>Show Insights Panel</h3>
                      <Switch
                        checked={showInsightsPanel}
                        onCheckedChange={setShowInsightsPanel}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Enable quick access to AI coaching insights
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3>AI Mode</h3>
                      <Switch
                        checked={isAIMode}
                        onCheckedChange={setIsAIMode}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Enable AI-powered responses
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              className="w-full text-red-400 hover:text-red-400 flex items-center justify-center gap-2 h-12"
              onClick={handleClearMemory}
            >
              <Trash2 className="h-5 w-5" />
              Clear Memory
            </Button>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-semibold">Training Context</h2>
                </div>
                <TrainingContext />
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <Card className="flex-1 flex flex-col">
            <CardContent className="flex-1 p-0 flex flex-col">
              <ScrollArea className="flex-1 px-4">
                <MessageList
                  messages={messages}
                  messagesEndRef={messagesEndRef}
                />
              </ScrollArea>

              <div className="p-4 border-t">
                <form
                  onSubmit={(e) => handleSendMessage(e, inputRef)}
                  className="flex items-center gap-2"
                >
                  <Input
                    ref={inputRef}
                    placeholder="Ask me anything about coaching..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-10 w-10 p-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <InsightsPanel
        isOpen={showInsightsPanel}
        onClose={() => setShowInsightsPanel(false)}
        onInsightClick={handleInsightClick}
      />
    </div>
  );
}
