import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Folder } from "lucide-react";
import ProjectTitleCard from "./ProjectTitleCard";
import RecentProjectsCard from "./RecentProjectsCard";
import NewProjectCard from "./NewProjectCard";

import { Project } from "../../App";

interface ProjectSelectorProps {
    onSelectProject: (project: Project) => void;
}

export default function ProjectSelector({ onSelectProject }: ProjectSelectorProps) {
    const [projects, setProjects] = useState<Project[]>([]);



    const fetchProjects = async () => {
        const list = await window.api.getProjects();
        setProjects(list);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background/50 p-4">
            <Card className="w-full max-w-3xl shadow-xl border-border/50 backdrop-blur-sm">
                <ProjectTitleCard />
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-8 items-stretch">
                        <RecentProjectsCard
                            projects={projects}
                            onRefresh={fetchProjects}
                            onSelectProject={onSelectProject}
                        />

                        <div className="hidden md:block w-[1px] bg-gradient-to-b from-transparent via-border to-transparent" />

                        <NewProjectCard
                            onRefresh={fetchProjects}
                            onSelectProject={onSelectProject}
                        />


                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
