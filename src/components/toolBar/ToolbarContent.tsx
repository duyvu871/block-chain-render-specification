import {tw} from "@/ultis/tailwind-ultis";

interface ToolbarContentProps {
    children: React.ReactNode;
    className?: string;
}

const ToolbarContent = ({
    children, className
}: ToolbarContentProps) => {
    return (
       <div className={tw(
           "flex flex-col justify-start items-start p-4 gap-4 text-xl border-gray-500 border-[1px]",
           "bg-gray-800 h-full w-64",
           "absolute top-[62px] left-0 z-10",
           className || "",
       )}>
           {children}
       </div>
    );
}

export default ToolbarContent;