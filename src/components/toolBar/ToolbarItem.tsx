import React from "react";
import {tw} from "@/ultis/tailwind-ultis";

interface ToolbarItemProps {
    children: React.ReactNode;
    action?: (e: React.MouseEvent) => void;
    active?: boolean;
    role?: string;
}

const ToolbarItem = ({
    children,
    active,
    action,
    role,
    ...props
}: ToolbarItemProps) => {
    return (
        <div
            className={tw(
                "flex flex-row justify-start items-center p-2 rounded-lg w-full",
                "cursor-pointer",
                active ? "text-white" : "text-gray-400",
                active ? "bg-gray-700" : "hover:bg-gray-700",
            )}
            key={role}
            {...props}
            onClick={action}
        >
            {children}
        </div>
    );
}

export default ToolbarItem;