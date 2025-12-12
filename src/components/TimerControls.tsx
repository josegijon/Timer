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
                className="cursor-pointer p-3 bg-white text-center text-black rounded-2xl"
                onClick={onAction}
            >
                {action}
            </button>

            <button
                className="cursor-pointer p-3 bg-white text-center text-black rounded-2xl"
                onClick={onReset}
            >
                Reset
            </button>
        </div >
    )
}
