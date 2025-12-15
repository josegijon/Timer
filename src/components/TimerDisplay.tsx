import { Minus, Plus } from "lucide-react";
import { IconButton } from './IconButton';
import { TimerControls } from "./TimerControls";
import type { TimerAction } from "../types/timerAction.types";

interface Props {
    min: number;
    seg: number;
    action: TimerAction;
    isRunning: boolean;
    onAddMin: () => void;
    onSubtractMin: () => void;
    onAddSeg: () => void;
    onSubtractSeg: () => void;
    onAction: () => void;
    onReset: () => void;
}

export const TimerDisplay = ({ min, seg, action, isRunning, onAddMin, onSubtractMin, onAddSeg, onSubtractSeg, onAction, onReset }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center gap-9">
            {/* container */}
            <div className="flex items-center justify-center gap-3">
                {/* container buttons */}
                <div className="flex flex-col gap-3">
                    <IconButton icon={<Plus color="black" size={15} />} onClick={onAddMin} />
                    <IconButton icon={<Minus color="black" size={15} />} onClick={onSubtractMin} />
                </div>

                <div className={`text-center text-7xl font-kode-mono w-sm flex justify-center transition-all ease-in-out duration-300 tracking-wider
                    ${isRunning
                        ? 'text-cyan-200 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] scale-105 animate-pulse'
                        : 'text-gray-400 drop-shadow-[0_0_10px_rgba(156,163,175,0.3)] scale-100'
                    }`}>
                    {String(min).padStart(2, "0")}:{String(seg).padStart(2, "0")}
                </div>

                {/* container buttons */}
                <div className="flex flex-col gap-3">
                    <IconButton icon={<Plus color="black" size={15} />} onClick={onAddSeg} />
                    <IconButton icon={<Minus color="black" size={15} />} onClick={onSubtractSeg} />
                </div>
            </div>

            {/* TimerControls */}
            <TimerControls action={action} onAction={onAction} onReset={onReset} />
        </div>
    )
}
