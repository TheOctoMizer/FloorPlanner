import React, { useEffect, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

export default function ExpandedTextComponent({
    message,
    setMessage,
    isOpen,
    onClose,
    onSend,
}: {
    message: string;
    setMessage: (message: string) => void;
    isOpen: boolean;
    onClose: () => void;
    onSend: () => void;
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Focus textarea when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => textareaRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-2xl bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold tracking-tight">Compose Message</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 mt-4">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Describe your design vision in detail..."
                        className="w-full min-h-[300px] bg-secondary/20 p-4 rounded-2xl outline-none resize-none text-base border border-border/50 focus:border-primary/30 transition-all scrollbar-none"
                    />
                    <div className="flex justify-end gap-3">
                        <Button variant="ghost" onClick={onClose} className="rounded-xl">
                            Cancel
                        </Button>
                        <Button
                            onClick={onSend}
                            disabled={!message.trim()}
                            className="rounded-xl px-6 shadow-lg shadow-primary/20 flex gap-2"
                        >
                            <span>Send Message</span>
                            <SendHorizontal className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
