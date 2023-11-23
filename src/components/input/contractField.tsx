import {tw} from "@/ultis/tailwind-ultis";
import React from "react";


const ContractField = ({
setValue, label, placeholder, type, className, wrapperStyle, props
} : {
    // contract: any;
    setValue: (e: React.MouseEvent) => void;
    label: string;
    placeholder?: string;
    type: "text" | "number" | "password";
    className?: string;
    wrapperStyle?: string;
    props?: any;
}) => {


    return (
        <div className={tw(
            "flex flex-col justify-start items-start p-2 w-full",
            wrapperStyle || ""
        )}>
            <span className={"text-sm font-semibold"}>
                {label}
            </span>
            <input
                className={tw(
                    "my-2 w-full rounded-sm p-2 outline-none border-[1px] border-gray-400 text-sm white-glassmorphism",
                    "rounded-lg",
                    className || ""
                )}
                onChange={setValue}
                placeholder={placeholder}
                type={type}
                {...props}
            />
        </div>
    );
}

export default ContractField;