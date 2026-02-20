import React from "react";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, ChevronLeft } from "lucide-react";
import SettingsModal from "../Settings";

interface HeaderProps {
    onBack?: () => void;
    showBack?: boolean;
    title?: string;
}

export default function Header({ onBack, showBack, title }: HeaderProps) {
    const [open, setOpen] = React.useState(false);



    return (
        <header className="border-b bg-card">
            <div className="container mx-auto px-2 py-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {showBack && onBack && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-accent transition-colors"
                                onClick={onBack}
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                        )}
                        <span className="text-xl font-bold text-foreground transition-all duration-300">
                            {title || "Floor Planner"}
                        </span>

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