import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Maximize2 } from "lucide-react";
import ExppandedTextComponent from "./ExppandedTextComponent";

export default function ChatComponent() {
    const [message, setMessage] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [showExpand, setShowExpand] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-expand textarea height based on content
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "inherit";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = `${scrollHeight}px`;

            // Show expand button if more than 3 lines (approx 68px including padding)
            setShowExpand(scrollHeight > 68);
        }
    }, [message]);

    const handleSend = () => {
        if (message.trim()) {
            // Send logic would go here
            console.log("Sending:", message);
            setMessage("");
            setIsExpanded(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="w-80 border-r bg-background/50 backdrop-blur-sm flex flex-col h-full bg-checkerboard-subtle shadow-inner">
            <div className="p-4 border-b font-medium text-foreground flex items-center justify-between">
                <span>AI Assistant</span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-none">
                <div className="bg-muted/80 backdrop-blur-md px-3 py-2 rounded-2xl text-sm max-w-[85%] text-muted-foreground border border-border/50 shadow-sm">
                    Hello! I'm your AI assistant. How can I help you design your floor plan today?
                </div>
            </div>

            <div className="p-4 border-t bg-background/30 backdrop-blur-xl">
                <div className="relative flex items-end gap-2 bg-secondary/30 p-2 rounded-2xl border border-border/50 focus-within:border-primary/30 transition-all duration-300">
                    <div className="relative flex-1 flex items-end">
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask AI..."
                            className="flex-1 bg-transparent px-2 py-1 outline-none resize-none text-sm max-h-24 overflow-y-auto min-h-[24px] pr-8 scrollbar-none"
                        />
                    </div>
                        {showExpand && (
                            <button
                                onClick={() => setIsExpanded(true)}
                                className="absolute top-1 right-1 bg-background/80 backdrop-blur-sm border border-border shadow-sm rounded-lg p-1 hover:bg-secondary transition-colors z-10 text-muted-foreground shadow-sm"
                                title="Expand to full screen"
                            >
                                <Maximize2 className="w-3 h-3" />
                            </button>
                        )}
                    <Button
                        onClick={handleSend}
                        size="icon"
                        disabled={!message.trim()}
                        className="h-8 w-8 rounded-xl shadow-lg shadow-primary/10 transition-all active:scale-95 flex-shrink-0 disabled:opacity-50 disabled:grayscale"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <ExppandedTextComponent
                message={message}
                setMessage={setMessage}
                isOpen={isExpanded}
                onClose={() => setIsExpanded(false)}
                onSend={handleSend}
            />
        </div>
    );
}