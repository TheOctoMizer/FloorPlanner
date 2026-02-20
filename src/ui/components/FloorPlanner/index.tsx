import React from "react";
import ChatComponent from "../ChatComponent";
import DesignCanvas from "../DesignCanvas";
import { Project } from "../../App";


export default function FloorPlanner({ project }: { project: Project }) {
    return (
        <div className="flex flex-col h-[calc(100vh-65px)]">
            <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span className="text-muted-foreground font-normal">Project:</span>
                    {project.name}
                </h2>
            </div>
            <div className="flex-1 flex overflow-hidden">
                <ChatComponent />
                <DesignCanvas />
            </div>
        </div>
    )
}