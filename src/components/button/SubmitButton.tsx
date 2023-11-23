import {tw} from "@/ultis/tailwind-ultis";
import React from "react";


interface SubmitButtonProps {
    children: React.ReactElement | string;
    className?: string;
    onClick?: () => void;
}
const SubmitButton = (props: SubmitButtonProps) => {
    return (
        <button
            className={tw(
                "flex flex-row justify-center items-center",
                "w-full rounded-lg p-2 text-white text-sm font-semibold",
                props.className || ""
            )}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export default SubmitButton;