import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";

interface MessageComponentProps {
    message: string;
    isUser: boolean;
    isDesign: boolean;
}

export function MessageComponent({ message, isUser, isDesign }: MessageComponentProps) {
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${isUser ? "bg-primary text-black" : "bg-muted text-white"}`}>
                <div className={`prose prose-sm max-w-none break-words ${isUser ? "prose-neutral" : "prose-invert"}`}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                            li: ({ children }) => <li className="mb-1">{children}</li>,
                            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            code: ({ children }) => (
                                <code className="bg-black/20 rounded px-1 py-0.5 font-mono text-xs">
                                    {children}
                                </code>
                            ),
                            a: ({ href, children }) => (
                                <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                    {children}
                                </a>
                            ),
                        }}
                    >
                        {message}
                    </ReactMarkdown>
                </div>
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