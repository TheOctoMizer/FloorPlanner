import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectTitleCard() {
    return (
        <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight text-center">
                Floor Planner
            </CardTitle>
            <p className="text-muted-foreground text-center">
                Select an existing project or create a new one to get started.
            </p>
        </CardHeader>
    );
}