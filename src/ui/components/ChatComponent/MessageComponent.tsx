import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";

interface MessageComponentProps {
    message: string;
    isUser: boolean;
    isDesign: boolean;
    timestamp: string;
}

export function MessageComponent({ message, isUser, isDesign, timestamp }: MessageComponentProps) {
    const formatTimestamp = (ts: string) => {
        try {
            const date = new Date(ts);
            if (isNaN(date.getTime())) return ts;

            const now = new Date();
            const isToday = date.toDateString() === now.toDateString();

            const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
            const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', ...timeOptions };

            if (isToday) {
                return `Today · ${date.toLocaleTimeString([], timeOptions)}`;
            }
            return date.toLocaleString([], dateOptions);
        } catch {
            return ts;
        }
    };

    return (
        <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} gap-1 mb-2`}>
            <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm shadow-sm transition-all duration-300 border ${isUser
                ? "bg-primary text-primary-foreground border-primary/20 shadow-primary/5"
                : "bg-muted text-foreground border-border/50 shadow-black/5"
                }`}>
                <div className={`prose prose-sm max-w-none break-words leading-relaxed ${isUser
                    ? "prose-invert dark:prose-neutral"
                    : "prose-neutral dark:prose-invert"
                    }`}>
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
                                <code className={`rounded px-1.5 py-0.5 font-mono text-[11px] ${isUser ? "bg-black/20" : "bg-primary/10"
                                    }`}>
                                    {children}
                                </code>
                            ),
                            a: ({ href, children }) => (
                                <a href={href} target="_blank" rel="noopener noreferrer" className={`underline underline-offset-4 ${isUser ? "text-primary-foreground" : "text-accent"
                                    }`}>
                                    {children}
                                </a>
                            ),
                        }}
                    >
                        {message}
                    </ReactMarkdown>
                </div>
                {isDesign && <div className="mt-4 pt-2 border-t border-white/10">
                    <Button
                        onClick={() => { }}
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-xl shadow-lg shadow-accent/20 transition-all active:scale-[0.98]"
                    >
                        Approve Design
                    </Button>
                </div>}
            </div>
            <span className="text-[10px] text-muted-foreground/50 px-2 select-none font-medium">
                {formatTimestamp(timestamp)}
            </span>
        </div>
    );
};

export default MessageComponent;