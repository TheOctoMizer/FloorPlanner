import React, { useState } from "react";
import ProjectSelector from "./components/ProjectSelector";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/ThemeProvider";
import FloorPlanner from "./components/FloorPlanner";

export interface Project {
    id: number;
    name: string;
}

export default function App() {
    const [currentProject, setCurrentProject] = useState<Project | null>(null);

    React.useEffect(() => {
        const lastProjectId = localStorage.getItem("lastProjectId");
        if (lastProjectId) {
            window.api.getProjectById(Number(lastProjectId)).then((project) => {
                if (project) {
                    setCurrentProject(project);
                }
            });
        }
    }, []);

    const handleSelectProject = (project: Project | null) => {
        setCurrentProject(project);
        if (project) {
            localStorage.setItem("lastProjectId", project.id.toString());
        } else {
            localStorage.removeItem("lastProjectId");
        }
    };

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                <Header
                    onBack={() => handleSelectProject(null)}
                    showBack={!!currentProject}
                    title={currentProject?.name}
                />

                <main>
                    {!currentProject ? (
                        <ProjectSelector onSelectProject={handleSelectProject} />
                    ) : (
                        <FloorPlanner project={currentProject} />
                    )}
                </main>

                <Toaster position="bottom-right" expand={true} richColors />
            </div>
        </ThemeProvider>
    );
}