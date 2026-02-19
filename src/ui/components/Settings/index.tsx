import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { AIProvider } from "@/ai_provider/types";
import { toast } from "sonner";

interface SettingsProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function Settings({ open, onOpenChange }: SettingsProps) {
    const [aiProvider, setAiProvider] = useState<AIProvider | string>("");

    useEffect(() => {
        if (open) {
            const fetchProvider = async () => {
                const provider = await window.api.getLLMProvider();
                setAiProvider(provider);
            };
            fetchProvider();
        }
    }, [open]);

    const handleProviderChange = async (value: string) => {
        setAiProvider(value);
        await window.api.setLLMProvider(value as AIProvider);
        toast.success(`AI Provider updated to ${value}`, {
            description: "Your settings have been saved successfully.",
        });
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Manage your application settings and AI preferences.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                AI Provider
                            </label>
                            <Select
                                value={aiProvider}
                                onValueChange={handleProviderChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select AI Provider" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(AIProvider).map((provider) => (
                                        <SelectItem key={provider} value={provider}>
                                            {provider}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="p-4 border-2 border-dashed border-border rounded-lg bg-accent/20 flex flex-col items-center justify-center text-center">
                            <p className="text-xs text-muted-foreground">
                                Additional settings for {aiProvider || 'the selected provider'} will appear here.
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}