import React from "react";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";
import SettingsModal from "../Settings";


export default function Header() {
    const [open, setOpen] = React.useState(false);

    return (
        <header className="border-b bg-card">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-foreground">Floor Planner</span>
                    </div>
                    {/* Settings button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-accent transition-colors"
                        onClick={() => setOpen(true)}
                    >
                        <SettingsIcon className="h-5 w-5" />
                    </Button>
                </div>
            </div>
            {/* Settings Modal */}
            <SettingsModal open={open} onOpenChange={setOpen} />
        </header>
    );
}