import React from "react";
import { Button } from "@/components/ui/button";
import { Folder } from "lucide-react";

export default function RecentProjectsCard({ projects }: { projects: { name: string }[] }) {
    return (
        <div className="flex-1 flex flex-col gap-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-1">
                Recent Projects
            </h3>
            <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            className="w-full justify-start gap-3 text-left font-medium hover:bg-accent group transition-all duration-200 border border-transparent hover:border-border/50"
                            onClick={() => console.log(`Project selected with Index ${index}`)}
                        >
                            <Folder className="h-4 w-4 text-accent" />
                            <span className="truncate">{project.name}</span>
                        </Button>
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