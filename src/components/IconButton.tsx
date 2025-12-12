import type { ReactNode } from "react";

interface Props {
    icon: ReactNode;
    onClick: () => void;
}

export const IconButton = ({ icon, onClick }: Props) => {
    return (
        <button
            className="cursor-pointer bg-white text-black rounded-full text-center p-2"
            onClick={onClick}
        >
            {icon}
        </button>
    )
}
