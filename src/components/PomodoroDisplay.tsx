import type { PomodoroPhase } from "../types/pomodoroPhase.types";
import type { TimerAction } from "../types/timerAction.types";
import { PomodoroControls } from "./PomodoroControls";

interface Props {
    min: number;
    seg: number;
    action: TimerAction;
    isRunning: boolean;
    phase: PomodoroPhase;
    cycles: number;
    onAction: () => void;
    onSkipStage: () => void;
    onReset: () => void;
}

export const PomodoroDisplay = ({ min, seg, action, isRunning, phase, cycles, onAction, onSkipStage, onReset }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center gap-9">

            <div className="capitalize flex flex-col gap-2 items-center justify-center">
                <p className="text-xl font-bold">{phase}</p>
                <p>Completed cycles: {cycles}</p>
            </div>

            {/* container */}
            <div className="flex items-center justify-center gap-3">
                <div className={`text-center text-7xl font-kode-mono w-sm flex justify-center transition-all ease-in-out duration-300 tracking-wider
                    ${isRunning
                        ? phase === 'shortBreak' || phase === 'longBreak'
                            ? 'text-green-300 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] scale-105 animate-pulse'
                            : 'text-cyan-200 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] scale-105 animate-pulse'
                        : 'text-gray-400 drop-shadow-[0_0_10px_rgba(156,163,175,0.3)] scale-100'
                    }`}>
                    {String(min).padStart(2, "0")}:{String(seg).padStart(2, "0")}
                </div>
            </div>

            {/* PomodoroControls */}
            <PomodoroControls
                action={action}
                onAction={onAction}
                onSkipStage={onSkipStage}
                onReset={onReset}
            />
        </div>
    )
}
