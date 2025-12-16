import type { TimerAction } from "../types/timerAction.types";

interface Props {
    action: TimerAction;
    onAction: () => void;
    onSkipStage: () => void;
    onReset: () => void;
}

export const PomodoroControls = ({ action, onAction, onSkipStage, onReset }: Props) => {
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
                onClick={onSkipStage}
            >
                Skip stage
            </button>


            <button
                className="cursor-pointer p-3 bg-white text-center text-black rounded-2xl"
                onClick={onReset}
            >
                Reset
            </button>
        </div>
    )
}
