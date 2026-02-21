import React from "react";
import ChatComponent from "../ChatComponent";
import DesignCanvas from "../DesignCanvas";
import { Project } from "../../App";


export default function FloorPlanner({ project }: { project: Project }) {
    return (
        <div className="flex flex-col h-[calc(100vh-50px)]">
            <div className="flex-1 flex overflow-hidden">
                <ChatComponent projectId={project.id} />
                <DesignCanvas />
            </div>
        </div>

    )
}