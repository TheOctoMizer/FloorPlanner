import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

interface SettingsProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function Settings({ open, onOpenChange }: SettingsProps) {
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
                    {/* Placeholder for settings content */}
                    <div className="p-8 border-2 border-dashed border-border rounded-lg bg-accent/20 flex flex-col items-center justify-center text-center">
                        <p className="text-sm text-muted-foreground">
                            Settings configuration will appear here.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}