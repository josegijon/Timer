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
                w-full flex-1 p-3 rounded-3xl transition-all ease-in-out duration-300 text-gray-200
                ${isActive
                    ? 'bg-sky-400'
                    : 'bg-slate-700 hover:bg-slate-800 hover:text-white cursor-pointer'
                }
            `}
            onClick={onClick}
        >
            {mode}
        </button>
    );
};