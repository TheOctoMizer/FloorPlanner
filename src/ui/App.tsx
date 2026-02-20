import React from "react";
import ProjectSelector from "./components/ProjectSelector";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/ThemeProvider";

export default function App() {
    return (
        <ThemeProvider>
            <div>
                {/* TODO: Add a header component */}
                <Header />
                <ProjectSelector />
                <Toaster position="bottom-right" expand={true} richColors />
            </div>
        </ThemeProvider>
    );
}