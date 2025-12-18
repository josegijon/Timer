import type { TimerMode } from "../types/timerMode.types"

interface Props {
    mode: TimerMode;
    isActive: boolean;
    onClick: () => void;
}

export const ModeButton = ({ mode, isActive, onClick }: Props) => {
    return (
        <button
            className={`
                flex-1 p-3 rounded-3xl transition-all ease-in-out duration-300
                ${isActive
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-black hover:bg-blue-500 hover:text-white cursor-pointer'
                }
            `}
            onClick={onClick}
        >
            {mode}
        </button>
    );
};