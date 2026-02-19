import React from "react";

export default function Header() {
    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">Floor Planner</span>
                    </div>
                </div>
            </div>
        </header>
    );
}