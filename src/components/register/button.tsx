import { tw } from "@/ultis/tailwind-ultis";


const RegisterButton = (
    {children, className, onClick, colorPicker}: {
        children: React.ReactNode;
        onClick: (event: React.MouseEvent) => void;
        className?: string;
        colorPicker?: {
            static: string;
            movement?: string;
        }
    }
) => {
    return (
        <button
            onClick={onClick}
            className={tw(
                " text-white font-bold py-2 px-4 rounded",
                className || "",
                (colorPicker?.static
                    ? colorPicker?.movement
                        ? colorPicker?.static + " " + colorPicker?.movement
                        : colorPicker.static
                    : "bg-blue-500 hover:bg-blue-700"
                )
            )}
        >
            {children}
        </button>
    );
}

export default RegisterButton;