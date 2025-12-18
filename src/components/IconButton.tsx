import type { ReactNode } from "react";

interface Props {
    icon: ReactNode;
    disabled: boolean;
    onClick: () => void;
}

export const IconButton = ({ icon, onClick, disabled }: Props) => {
    return (
        <button
            className={`rounded-full text-center p-2 transition ease-in-out duration-300
                ${disabled
                    ? 'bg-gray-400 cursor-auto'
                    : 'bg-white cursor-pointer hover:bg-blue-500 text-white'
                }`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon}
        </button>
    )
}
