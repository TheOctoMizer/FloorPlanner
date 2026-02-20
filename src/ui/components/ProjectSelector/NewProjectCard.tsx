import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateProject from "../CreateProject";

import { Project } from "../../App";

interface NewProjectCardProps {
    onRefresh: () => void;
    onSelectProject: (project: Project) => void;
}

export default function NewProjectCard({ onRefresh, onSelectProject }: NewProjectCardProps) {


    const [open, setOpen] = useState(false);

    const handleNewProject = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="flex-1 flex flex-col justify-center gap-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-1">
                Get Started
            </h3>
            <Button
                className="w-full h-32 flex-col gap-3 text-lg font-semibold shadow-lg hover:shadow-accent/20 transition-all duration-300 bg-accent text-accent-foreground hover:bg-accent/90 border-none"
                onClick={handleNewProject}
            >
                <div className="p-3 bg-white/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Plus className="h-8 w-8" />
                </div>
                <span>Create New Project</span>
            </Button>
            <p className="text-xs text-muted-foreground text-center px-4">
                Start from scratch or import an existing floor plan image.
            </p>
            <CreateProject open={open} onOpenChange={handleClose} onRefresh={onRefresh} onSelectProject={onSelectProject} />


        </div>
    )
};