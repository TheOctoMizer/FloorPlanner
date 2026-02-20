import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateProject({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const [projectName, setProjectName] = useState<string>("");
    const [folderPath, setFolderPath] = useState<string>("");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Create Project</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        <Input
                            type="text"
                            placeholder="Project Name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                        
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}