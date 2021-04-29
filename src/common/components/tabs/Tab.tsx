import React from "react";

export interface TabProps {
    children: React.ReactNode;
    title: string;
    icon?: string;
}

export function Tab({ children }: TabProps) {
    return (
        <div>
            {children}
        </div>
    );
}