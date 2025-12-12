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
                flex-1 cursor-pointer border p-3 rounded-3xl transition-all
                ${isActive
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-black border-gray-300 hover:bg-blue-50'
                }
            `}
            onClick={onClick}
        >
            {mode}
        </button>
    );
};