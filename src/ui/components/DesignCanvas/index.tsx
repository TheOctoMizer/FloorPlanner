import React from "react";
import BabylonCanvas from "./BabylonCanvas";

export default function DesignCanvas() {
    return (
        <div className="flex-1 bg-transparent relative overflow-hidden">
            {/* Background Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <div className="text-muted-foreground/10 font-bold text-6xl uppercase tracking-[0.2em]">
                    Design Canvas
                </div>
            </div>

            {/* Babylon.js Engine */}
            <div className="absolute inset-0">
                <BabylonCanvas />
            </div>

            {/* Grid Legend */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2 p-3 rounded-lg bg-background/60 backdrop-blur-md border border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground select-none pointer-events-none">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-[1px] bg-muted-foreground/40" />
                    <span>Minor: 1 Unit (1m)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-[1.5px] bg-muted-foreground/80" />
                    <span>Major: 1 Unit (1m)</span>
                </div>
            </div>
        </div>
    )
}