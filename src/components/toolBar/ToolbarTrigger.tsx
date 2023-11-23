import { tw } from "@/ultis/tailwind-ultis";

interface ToolbarTriggerProps {
    children: React.ReactNode;
    action?: (e: React.MouseEvent) => void;
}

const ToolbarTrigger = ({
    children,
    action,
    ...props
}: ToolbarTriggerProps) => {
    return (
        <div
            {...props}
            className={tw(
                "flex flex-row justify-start items-center p-2 rounded-lg",
                "cursor-pointer",
                "text-gray-400",
                "hover:bg-gray-700",
            )}
            onClick={action}
        >
            {children}
        </div>
    )
}

export default ToolbarTrigger;