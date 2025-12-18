import { useEffect, useState } from "react"
import { ModeButton } from './ModeButton';
import { TimerDisplay } from "./TimerDisplay";
import { PomodoroDisplay } from "./PomodoroDisplay";
import { useTimer } from "../hooks/useTimer";
import type { TimerMode } from "../types/timerMode.types"
import { usePomodoro } from "../hooks/usePomodoro";
import { formatSecondsToMinSec } from "../utils/timerUtils";

export const TimerApp = () => {
    const [mode, setMode] = useState<TimerMode>('Timer');

    const timer = useTimer();
    const pomodoro = usePomodoro();

    useEffect(() => {
        if ("Notification" in window && Notification.permission === "default") {
            Notification.requestPermission();
        }
    }, []);


    // Timer
    useEffect(() => {
        if (!timer.isRunning) return;

        const intervalId = setInterval(() => {
            timer.handleSubtractSeg();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timer.isRunning, timer.handleSubtractSeg]);

    // Pomodoro
    useEffect(() => {
        if (!pomodoro.isRunning) return;

        const intervalId = setInterval(() => {
            pomodoro.handleSubtractSeg();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [pomodoro.isRunning, pomodoro.handleSubtractSeg]);

    const timerTime = formatSecondsToMinSec(timer.seg);
    const pomodoroTime = formatSecondsToMinSec(pomodoro.seg);

    const handleModeChange = (newMode: TimerMode) => {
        if (newMode !== mode) {
            if (timer.isRunning) {
                timer.handleAction();
            }
            if (pomodoro.isRunning) {
                pomodoro.handleAction();
            }
        }

        setMode(newMode);
    };

    return (
        <div className="flex flex-col gap-10">
            {/* Mode Selector */}
            <div className="flex gap-3">
                <ModeButton
                    mode="Timer"
                    isActive={mode === 'Timer'}
                    onClick={() => handleModeChange('Timer')}
                />
                <ModeButton
                    mode="Pomodoro"
                    isActive={mode === 'Pomodoro'}
                    onClick={() => handleModeChange('Pomodoro')}
                />
            </div>

            {mode === 'Timer' && (
                <TimerDisplay
                    min={timerTime.minutes}
                    seg={timerTime.seconds}
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
            {mode === 'Pomodoro' && (
                <PomodoroDisplay
                    min={pomodoroTime.minutes}
                    seg={pomodoroTime.seconds}
                    action={pomodoro.action}
                    isRunning={pomodoro.isRunning}
                    phase={pomodoro.phase}
                    cycles={pomodoro.cycles}
                    onAction={pomodoro.handleAction}
                    onSkipStage={pomodoro.handleSkipStage}
                    onReset={pomodoro.handleReset}
                />
            )}
        </div>
    )
}
