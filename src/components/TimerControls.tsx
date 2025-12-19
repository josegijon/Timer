import type { TimerAction } from "../types/timerAction.types";

interface Props {
    seg: number;
    action: TimerAction;
    onAction: () => void;
    onReset: () => void;
}

export const TimerControls = ({ seg, action, onAction, onReset }: Props) => {
    return (
        <div className="flex gap-3">
            <button
                className={`cursor-pointer p-3 text-center rounded-2xl transition ease-in-out duration-300 min-w-30 text-white disabled:bg-gray-500 disabled:cursor-auto
                    ${action === "Start"
                        ? 'bg-green-500 hover:bg-green-700'
                        : action === 'Pause'
                            ? 'bg-amber-500 hover:bg-amber-600'
                            : 'bg-blue-500 hover:bg-blue-700'
                    }`}
                onClick={onAction}
                disabled={seg === 0 && action === 'Start'}
            >
                {action}
            </button>

            <button
                className="cursor-pointer p-3 bg-red-500 text-center text-white rounded-2xl transition ease-in-out duration-300 min-w-30 hover:bg-red-700"
                onClick={onReset}
            >
                Reset
            </button>
        </div >
    )
}
