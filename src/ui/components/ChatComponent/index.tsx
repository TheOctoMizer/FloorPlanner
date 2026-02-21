import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Maximize2 } from "lucide-react";
import ExpandedTextComponent from "./ExpandedTextComponent";
import MessageComponent from "./MessageComponent";

export default function ChatComponent() {
    const [message, setMessage] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [showExpand, setShowExpand] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [chatHistory, setChatHistory] = useState([
        {
            message: "Hello! I'm your AI assistant. How can I help you design your floor plan today?",
            isUser: false,
            isDesign: false,
            timestamp: "Fri • 12:00 PM",
        },
        {
            message: "I want to design a building with 4 floors.\nGround floor should be a parking lot. Second floor should be a gym. Third floor should be a restaurant. Fourth floor should be a hotel.",
            isUser: true,
            isDesign: false,
            timestamp: "Fri • 12:00 PM",
        },
        {
            message: "Certainly! Here's a design concept for an empty, four-story building with the following details:\n\n**Flooring Dimensions:** 10m x 10m\n\n**Ground Floor:** Parking Lot\n\n**Second Floor:** Reception Area & Gym Space\n\n**Third Floor:** Restaurant (Dining Area & Kitchen)\n\n**Fourth Floor:** Hotel (Lobby & Rooms)",
            isDesign: true,
            isUser: false,
            timestamp: "Fri • 12:01 PM",
        },
    ]);

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
            setChatHistory((prev) => [...prev, { message, isUser: true, isDesign: false, timestamp: new Date().toLocaleString() }]);
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
        <div className="w-80 border-r bg-background/50 backdrop-blur-md flex flex-col h-full bg-checkerboard-subtle shadow-2xl relative">
            {/* Header */}
            <div className="p-4 border-b bg-background/40 backdrop-blur-lg flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold tracking-tight">AI Assistant</h2>
                    <p className="text-[10px] text-muted-foreground font-medium">Ready to design</p>
                </div>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none scroll-smooth">
                {chatHistory.map((item, index) => (
                    <MessageComponent key={index} message={item.message} isUser={item.isUser} isDesign={item.isDesign} timestamp={item.timestamp} />
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-background/40 backdrop-blur-xl">
                <div className="relative group transition-all duration-500">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-primary/10 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-1000"></div>
                    <div className="relative flex items-end gap-2 bg-secondary/20 p-2.5 rounded-2xl border border-border/40 focus-within:border-accent/40 focus-within:bg-secondary/40 transition-all duration-300">
                        <div className="relative flex-1 flex items-end">
                            <textarea
                                ref={textareaRef}
                                rows={1}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Describe your vision..."
                                className="flex-1 bg-transparent px-2 py-1 outline-none resize-none text-sm max-h-32 overflow-y-auto min-h-[24px] pr-8 scrollbar-none placeholder:text-muted-foreground/50 transition-all"
                            />
                        </div>
                        {showExpand && (
                            <button
                                onClick={() => setIsExpanded(true)}
                                className="absolute top-1 right-1 bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm rounded-lg p-1.5 hover:bg-secondary transition-all z-10 text-muted-foreground hover:text-foreground"
                                title="Expand to full screen"
                            >
                                <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                        )}
                        <Button
                            onClick={handleSend}
                            size="icon"
                            disabled={!message.trim()}
                            className="h-9 w-9 rounded-xl shadow-lg shadow-accent/20 bg-accent hover:bg-accent/90 text-accent-foreground transition-all active:scale-90 disabled:opacity-30 disabled:grayscale"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            <ExpandedTextComponent
                message={message}
                setMessage={setMessage}
                isOpen={isExpanded}
                onClose={() => setIsExpanded(false)}
                onSend={handleSend}
            />
        </div>
    );
}