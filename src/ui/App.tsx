import React from "react";
import ProjectSelector from "./components/ProjectSelector";
import Header from "./components/Header";

export default function App() {
    return (
        <div>
            {/* TODO: Add a header component */}
            <Header />
            <ProjectSelector />
        </div>
    );
}