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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { ThemeType } from "@/types/themeType";

interface SettingsProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function Settings({ open, onOpenChange }: SettingsProps) {
    const [aiProvider, setAiProvider] = useState<AIProvider | string>("");
    const [baseUrl, setBaseUrl] = useState<string>("");
    const [apiKey, setApiKey] = useState<string>("");
    const [showApiKey, setShowApiKey] = useState(false);
    const [theme, setTheme] = useState<ThemeType | string>("");


    useEffect(() => {
        if (open) {
            const fetchProvider = async () => {
                const provider = await window.api.getLLMProvider();
                const baseUrl = await window.api.getLLMProviderBaseUrl();
                const apiKey = await window.api.getLLMProviderApiKey();
                const theme = await window.api.getTheme();
                setAiProvider(provider);
                setBaseUrl(baseUrl || "");
                setApiKey(apiKey || "");
                setTheme(theme);
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

        // Refresh base URL if needed for the new provider
        const newBaseUrl = await window.api.getLLMProviderBaseUrl();
        setBaseUrl(newBaseUrl || "");
    };

    const handleSaveBaseUrl = async () => {
        await window.api.setLLMProviderBaseUrl(baseUrl);
        toast.success("Base URL updated", {
            description: `Saved URL for ${aiProvider}`,
        });
    };

    const handleSaveApiKey = async () => {
        await window.api.setLLMProviderApiKey(apiKey);
        toast.success("API Key updated", {
            description: `Saved API Key for ${aiProvider}`,
        });
    };

    const handleThemeChange = async (value: string) => {
        setTheme(value);
        await window.api.setTheme(value as ThemeType);
        toast.success(`Theme updated to ${value}`, {
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
                    <div className="flex flex-col gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none flex items-center gap-2">
                                Theme
                            </label>
                            <Select
                                value={theme}
                                onValueChange={handleThemeChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(ThemeType).map((theme) => (
                                        <SelectItem key={theme} value={theme}>
                                            {theme}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none flex items-center gap-2">
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

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                                API Base URL
                            </label>
                            <div className="relative group">
                                <Input
                                    type="text"
                                    value={baseUrl}
                                    onChange={(e) => setBaseUrl(e.target.value)}
                                    placeholder="Enter provider base URL..."
                                    className="w-full bg-accent/10 border-border focus-visible:ring-accent/50 pr-4"
                                />
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="absolute right-1 top-1 h-8 px-3 text-xs bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/5 text-foreground/80 transition-all duration-200 active:scale-95 shadow-sm"
                                    onClick={handleSaveBaseUrl}
                                >
                                    Save
                                </Button>
                            </div>
                            <p className="text-[10px] text-muted-foreground px-1">
                                Configuration for <span className="font-semibold">{aiProvider || 'selected provider'}</span>.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                                API Key
                            </label>
                            <div className="relative group">
                                <Input
                                    type={showApiKey ? "text" : "password"}
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="Enter API key..."
                                    className="w-full bg-accent/10 border-border focus-visible:ring-accent/50 pr-4"
                                />
                                <div className="absolute right-1 top-1 flex items-center gap-1">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/5 text-foreground/80 transition-all duration-200 active:scale-95 shadow-sm"
                                        onClick={() => setShowApiKey(!showApiKey)}
                                        type="button"
                                    >
                                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 px-3 text-xs bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/5 text-foreground/80 transition-all duration-200 active:scale-95 shadow-sm"
                                        onClick={handleSaveApiKey}
                                        type="button"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>


                            <p className="text-[10px] text-muted-foreground px-1">
                                Configuration for <span className="font-semibold">{aiProvider || 'selected provider'}</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}