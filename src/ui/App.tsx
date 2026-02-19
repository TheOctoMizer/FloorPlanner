import React from "react";
import ProjectSelector from "./components/ProjectSelector";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
    return (
        <div>
            {/* TODO: Add a header component */}
            <Header />
            <ProjectSelector />
            <Toaster position="bottom-right" expand={true} richColors />
        </div>
    );
}