import type { PomodoroPhase } from "../types/pomodoroPhase.types";
import type { TimerAction } from "../types/timerAction.types";
import { PomodoroControls } from "./PomodoroControls";
import { ProgressBar } from "./ProgressBar";

interface Props {
    total: number;
    min: number;
    seg: number;
    initialTime: number;
    action: TimerAction;
    isRunning: boolean;
    phase: PomodoroPhase;
    cycles: number;
    onAction: () => void;
    onSkipStage: () => void;
    onReset: () => void;
}

export const PomodoroDisplay = ({ total, min, seg, initialTime, action, isRunning, phase, cycles, onAction, onSkipStage, onReset }: Props) => {

    const getPhaseLabel = (phase: PomodoroPhase): string => {
        switch (phase) {
            case 'work': return 'Focus Time';
            case 'shortBreak': return 'Short Break';
            case 'longBreak': return 'Long Break';
            case 'idle': return 'Ready';
        }
    };

    const getPhaseColor = (phase: PomodoroPhase): string => {
        switch (phase) {
            case 'work': return '#EF4444';
            case 'shortBreak': return '#10B981';
            case 'longBreak': return '#3B82F6';
            case 'idle': return '#6B7280';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-9">

            <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-2xl font-semibold">{getPhaseLabel(phase)}</p>
                <p className="text-LG text-gray-600">Cycles completed: {cycles}</p>
            </div>

            {/* container */}
            <div className="flex items-center justify-center gap-3 w-full">
                <div className={`text-center text-6xl 2xs:text-7xl font-kode-mono w-sm flex justify-center transition-all ease-in-out duration-300 tracking-wider
                    ${isRunning
                        ? phase === 'shortBreak' || phase === 'longBreak'
                            ? 'text-[#10B981] drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] scale-105 animate-pulse'
                            : 'text-[#EF4444] drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] scale-105 animate-pulse'
                        : 'text-gray-400 drop-shadow-[0_0_10px_rgba(156,163,175,0.3)] scale-100'
                    }`}>
                    {String(min).padStart(2, "0")}:{String(seg).padStart(2, "0")}
                </div>
            </div>

            <ProgressBar
                current={total}
                total={initialTime}
                color={getPhaseColor(phase)}
            />

            {/* PomodoroControls */}
            <PomodoroControls
                seg={total}
                action={action}
                onAction={onAction}
                onSkipStage={onSkipStage}
                onReset={onReset}
            />
        </div>
    )
}