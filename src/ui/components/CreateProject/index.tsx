import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Project } from "../../App";

export default function CreateProject({ open, onOpenChange, onRefresh, onSelectProject }: { open: boolean, onOpenChange: (open: boolean) => void, onRefresh: () => void, onSelectProject: (project: Project) => void }) {
    const [projectName, setProjectName] = useState<string>("");
    const [folderPath, setFolderPath] = useState<string>("");

    const handleCreate = async () => {
        if (!projectName.trim()) return;
        const project = await window.api.createProject(projectName);
        setProjectName("");
        onRefresh();
        onOpenChange(false);
        onSelectProject(project);
    };



    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Create Project</DialogTitle>
                    <DialogDescription className="text-muted-foreground flex flex-col gap-2">
                        <Input
                            type="text"
                            placeholder="Project Name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">

                            <Button
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <button
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                onClick={handleCreate}
                            >
                                Create
                            </button>

                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}