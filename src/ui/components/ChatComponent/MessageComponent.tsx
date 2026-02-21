import React from "react";
import { Button } from "@/components/ui/button";

interface MessageComponentProps {
    message: string;
    isUser: boolean;
    isDesign: boolean;
}

export function MessageComponent({ message, isUser, isDesign }: MessageComponentProps) {
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap ${isUser ? "bg-primary" : "bg-muted"} ${isUser ? "text-black" : "text-white"}`}>
                {message}
                {isDesign && <div className="mt-2">
                    <Button
                        onClick={() => { }}
                        className="w-full"
                    >
                        Approve
                    </Button>
                </div>}
            </div>
        </div>
    );
};

export default MessageComponent;