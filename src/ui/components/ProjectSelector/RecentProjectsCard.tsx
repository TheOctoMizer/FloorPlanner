import React from "react";
import { Button } from "@/components/ui/button";
import { Folder, Trash } from "lucide-react";

import { Project } from "../../App";

interface RecentProjectsCardProps {
    projects: Project[];
    onRefresh: () => void;
    onSelectProject: (project: Project) => void;
}

export default function RecentProjectsCard({ projects, onRefresh, onSelectProject }: RecentProjectsCardProps) {
    const handleDelete = async (id: number) => {
        await window.api.deleteProject(id);
        onRefresh();
    };


    return (

        <div className="flex-1 flex flex-col gap-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-1">
                Recent Projects
            </h3>
            <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <div
                            key={index}
                            className="w-full flex items-center justify-between gap-3 p-2 rounded-md bg-secondary text-secondary-foreground font-medium hover:bg-accent hover:text-accent-foreground group transition-all duration-200 border border-transparent hover:border-border/50 cursor-pointer"
                            onClick={() => onSelectProject(project)}
                        >

                            <div className="flex items-center gap-3 overflow-hidden">
                                <Folder className="h-4 w-4 text-accent group-hover:text-accent-foreground shrink-0 transition-colors" />
                                <span className="truncate">{project.name}</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-white hover:bg-red-500 shrink-0 transition-all duration-200"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(project.id);
                                }}

                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    ))

                ) : (
                    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-border rounded-lg bg-accent/20">
                        <Folder className="h-8 w-8 text-muted-foreground/50 mb-2" />
                        <p className="text-sm text-muted-foreground">No projects found</p>
                    </div>
                )}
            </div>
        </div>
    )
};