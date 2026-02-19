import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Folder } from "lucide-react";

export default function ProjectSelector() {
    const [projects, setProjects] = useState<{ name: string }[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const list = await window.api.getProjects();
            setProjects(list);
        };
        fetchProjects();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background/50 p-4">
            <Card className="w-full max-w-3xl shadow-xl border-border/50 backdrop-blur-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold tracking-tight text-center">
                        Floor Planner
                    </CardTitle>
                    <p className="text-muted-foreground text-center">
                        Select an existing project or create a new one to get started.
                    </p>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-8 items-stretch">
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
                                            <Folder className="h-4 w-4 text-blue-500 group-hover:text-blue-600" />
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

                        <div className="hidden md:block w-[1px] bg-gradient-to-b from-transparent via-border to-transparent" />

                        <div className="flex-1 flex flex-col justify-center gap-4">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-1">
                                Get Started
                            </h3>
                            <Button
                                className="w-full h-32 flex-col gap-3 text-lg font-semibold shadow-lg hover:shadow-primary/20 transition-all duration-300"
                                onClick={() => console.log('New Project Button Clicked')}
                            >
                                <div className="p-3 bg-primary-foreground/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                                    <Plus className="h-8 w-8" />
                                </div>
                                <span>Create New Project</span>
                            </Button>
                            <p className="text-xs text-muted-foreground text-center px-4">
                                Start from scratch or import an existing floor plan image.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
