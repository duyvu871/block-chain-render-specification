import React from "react";
import {tw} from "@/ultis/tailwind-ultis";


interface ContractCheckboxProps {
    setConfirm: (value: boolean) => void;
    label: string;
    className?: string;
    wrapperStyle?: string;
    props?: any;
}
const ContractCheckbox = ({
    setConfirm,
    label,
    className,
    wrapperStyle,
    props
}: ContractCheckboxProps): React.ReactElement => {
    return (
        <div className={tw(
            "flex flex-row justify-start items-center text-xs ",
            wrapperStyle || ""
        )}>
            <input
                type="checkbox"
                onChange={(e) => setConfirm(e.target.checked)}
                className={tw(
                    "mr-2",
                    className || ""
                )}
                {...props}
            />
            <label>{label}</label>
        </div>
    );
}

export default ContractCheckbox;