import { useEffect, useState } from "react"
import { ModeButton } from './ModeButton';
import { TimerDisplay } from "./TimerDisplay";
import { PomodoroDisplay } from "./PomodoroDisplay";
import { useTimer } from "../hooks/useTimer";
import type { TimerMode } from "../types/timerMode.types"

export const TimerApp = () => {
    const [mode, setMode] = useState<TimerMode>('Timer');

    const timer = useTimer();

    useEffect(() => {
        if ("Notification" in window) {
            Notification.requestPermission().then((permission) => {
                console.log("Permission for notifications: ", permission);
            });
        }

        if (!timer.isRunning) return;

        const intervalId = setInterval(() => {
            timer.handleSubtractSeg();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timer.isRunning]);


    return (
        <div className="flex flex-col gap-10">
            <div className="flex gap-3 mb-10">
                <ModeButton
                    mode="Timer"
                    isActive={mode === 'Timer'}
                    onClick={() => setMode('Timer')}
                />
                <ModeButton
                    mode="Pomodoro"
                    isActive={mode === 'Pomodoro'}
                    onClick={() => setMode('Pomodoro')}
                />
            </div>

            {mode === 'Timer' && (
                <TimerDisplay
                    min={(Math.floor(timer.seg / 60))}
                    seg={(timer.seg % 60)}
                    action={timer.action}
                    isRunning={timer.isRunning}
                    onAddMin={timer.handleAddMin}
                    onSubtractMin={timer.handleSubtractMin}
                    onAddSeg={timer.handleAddSeg}
                    onSubtractSeg={timer.handleSubtractSeg}
                    onAction={timer.handleAction}
                    onReset={timer.handleReset}
                />
            )}
            {mode === 'Pomodoro' && <PomodoroDisplay />}
        </div>
    )
}
