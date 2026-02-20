import React from "react";

export default function ChatComponent() {
    return (
        <div className="w-80 border-r bg-transparent flex flex-col h-full">
            <div className="p-4 border-b font-medium">AI Assistant</div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                <div className="bg-muted px-3 py-2 rounded-lg text-sm max-w-[80%]">
                    Hello! I'm your AI assistant. How can I help you design your floor plan today?
                </div>
            </div>
            <div className="p-4 border-t">
                <input
                    type="text"
                    placeholder="Ask AI..."
                    className="w-full bg-secondary px-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-accent transition-all text-sm"
                />
            </div>
        </div>
    )
}