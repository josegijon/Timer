import { Minus, Plus } from "lucide-react";
import { IconButton } from './IconButton';
import { TimerControls } from "./TimerControls";
import type { TimerAction } from "../types/timerAction.types";
import { ProgressBar } from "./ProgressBar";
import { COLOR_PROGRESS_BAR_TIMER } from "../constants/timer";

interface Props {
    total: number;
    min: number;
    seg: number;
    initialTime: number;
    action: TimerAction;
    isRunning: boolean;
    onAddMin: () => void;
    onSubtractMin: () => void;
    onAddSeg: () => void;
    onSubtractSeg: () => void;
    onAction: () => void;
    onReset: () => void;
}

export const TimerDisplay = ({ total, min, seg, initialTime, action, isRunning, onAddMin, onSubtractMin, onAddSeg, onSubtractSeg, onAction, onReset }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center gap-9">
            <div className="flex items-center justify-center gap-3">
                <div className="flex flex-col gap-3">
                    <IconButton
                        icon={<Plus color="black" size={15} />}
                        onClick={onAddMin}
                        disabled={isRunning}
                    />
                    <IconButton
                        icon={<Minus color="black" size={15} />}
                        onClick={onSubtractMin}
                        disabled={isRunning}
                    />
                </div>

                <div className={`text-center text-5xl xs:text-[60px] 2xs:text-7xl font-kode-mono xs:w-sm flex justify-center transition-all ease-in-out duration-300 tracking-wider
                    ${isRunning
                        ? 'text-blue-500 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] scale-105 animate-pulse'
                        : 'text-gray-400 drop-shadow-[0_0_10px_rgba(156,163,175,0.3)] scale-100'
                    }`}>
                    {String(min).padStart(2, "0")}:{String(seg).padStart(2, "0")}
                </div>

                <div className="flex flex-col gap-3">
                    <IconButton
                        icon={<Plus color="black" size={15} />}
                        onClick={onAddSeg}
                        disabled={isRunning}
                    />
                    <IconButton
                        icon={<Minus color="black" size={15} />}
                        onClick={onSubtractSeg}
                        disabled={isRunning}
                    />
                </div>
            </div>

            <ProgressBar
                current={total}
                total={initialTime}
                color={COLOR_PROGRESS_BAR_TIMER}
            />

            {/* TimerControls */}
            <TimerControls
                seg={total}
                action={action}
                onAction={onAction}
                onReset={onReset}
            />
        </div>
    )
}
