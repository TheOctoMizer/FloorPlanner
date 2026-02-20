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

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                <Header onBack={() => setCurrentProject(null)} showBack={!!currentProject} />
                <main>
                    {!currentProject ? (
                        <ProjectSelector onSelectProject={setCurrentProject} />
                    ) : (
                        <FloorPlanner project={currentProject} />
                    )}
                </main>
                <Toaster position="bottom-right" expand={true} richColors />
            </div>
        </ThemeProvider>
    );
}