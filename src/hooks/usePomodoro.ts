import { useCallback, useState } from 'react'
import type { TimerAction } from '../types/timerAction.types';
import { INITIAL_ACTION, INITIAL_PHASE, INITIAL_SEG, LONG_BREAK_TIME, POMODORO_WORK_TIME, SHORT_BREAK_TIME } from '../constants/timer';
import type { PomodoroPhase } from '../types/pomodoroPhase.types';

export const usePomodoro = () => {
    const [seg, setSeg] = useState(POMODORO_WORK_TIME);
    const [action, setAction] = useState<TimerAction>(INITIAL_ACTION);
    const [isRunning, setIsRunning] = useState(false);
    const [phase, setPhase] = useState<PomodoroPhase>(INITIAL_PHASE);
    const [cycles, setCycles] = useState(0);

    // Time adjustment handlers
    const handleSubtractSeg = useCallback(() => {
        setSeg((prev) => {
            if (prev <= 1) {
                notifyTimerEnd();
                setIsRunning(false);
                setAction("Start");
                return 0;
            }
            return prev - 1;
        });
    }, []);

    // Action handlers
    const handleAction = () => {
        if (action === "Start" || action === "Restart") {
            setAction("Pause");
            setIsRunning(true);
        } else if (action === "Pause") {
            setAction("Restart");
            setIsRunning(false);
        };

        if (action === "Start" && phase === "idle") {
            setPhase("work");
        };
    };

    const handleSkipStage = () => {
        if (phase === "idle" || phase === "work") {
            if ((cycles + 1) % 4 === 0) {
                setPhase("longBreak");
                setSeg(LONG_BREAK_TIME);
            } else {
                setPhase("shortBreak");
                setSeg(SHORT_BREAK_TIME);
            }
            return;
        }

        setPhase("work");
        setSeg(POMODORO_WORK_TIME);
        setCycles((prev) => prev + 1);
    };

    const handleReset = () => {
        setAction(INITIAL_ACTION);
        setPhase(INITIAL_PHASE);
        setIsRunning(false);
        setSeg(POMODORO_WORK_TIME);
        setCycles(0);
    };

    // Alerts
    const notifyTimerEnd = () => {
        const audio = new Audio("/final-countdown-timer.mp3");
        audio.play().catch((err) => console.log("Error al reproducir el audio: ", err));

        if ("Notification" in window && Notification.permission === "granted") {
            if (phase === "work") {
                new Notification("Timer ended", {
                    body: "Your work time has reached 0! Relax!",
                });
            } else if (phase === "shortBreak") {
                new Notification("Timer ended", {
                    body: "Your short break time has reached 0! To work!",
                });
            } else {
                new Notification("Timer ended", {
                    body: "Your long break time has reached 0! To work!",
                });
            }
        };
    };

    return {
        seg,
        action,
        isRunning,
        phase,
        cycles,

        handleSubtractSeg,
        handleAction,
        handleSkipStage,
        handleReset
    }
}
