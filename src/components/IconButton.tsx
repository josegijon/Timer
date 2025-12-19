import { cloneElement, type ReactElement, type ReactNode } from "react";

interface Props {
    icon: ReactNode;
    disabled: boolean;
    onClick: () => void;
}

interface ColorableIconProps {
    color?: string;
}

export const IconButton = ({ icon, onClick, disabled }: Props) => {
    const coloredIcon = cloneElement(icon as ReactElement<ColorableIconProps>, {
        color: disabled ? "#000000" : "#CBD5E1"
    });

    return (
        <button
            className={`rounded-full text-center p-2 transition ease-in-out duration-300
                ${disabled
                    ? 'bg-gray-400 cursor-auto'
                    : 'bg-slate-800 cursor-pointer hover:bg-slate-700'
                }`}
            onClick={onClick}
            disabled={disabled}
        >
            {coloredIcon}
        </button>
    )
}
