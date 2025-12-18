import type { TimerAction } from "../types/timerAction.types";

interface Props {
    action: TimerAction;
    onAction: () => void;
    onReset: () => void;
}

export const TimerControls = ({ action, onAction, onReset }: Props) => {
    return (
        <div className="flex gap-3">
            <button
                className={`cursor-pointer p-3 text-center rounded-2xl transition ease-in-out duration-300 min-w-30
                    ${action === "Start" || action === "Restart"
                        ? 'bg-blue-500 text-white hover:bg-blue-700'
                        : action === 'Pause'
                            ? 'bg-amber-500 text-white hover:bg-amber-600'
                            : ''
                    }`}
                onClick={onAction}
            >
                {action}
            </button>

            <button
                className="cursor-pointer p-3 bg-gray-500 text-center text-white rounded-2xl transition ease-in-out duration-300 min-w-30 hover:bg-gray-700"
                onClick={onReset}
            >
                Reset
            </button>
        </div >
    )
}
