import { useCallback, useState } from 'react'
import type { TimerAction } from '../types/timerAction.types';
import { INITIAL_ACTION, INITIAL_PHASE, LONG_BREAK_TIME, POMODORO_WORK_TIME, SHORT_BREAK_TIME } from '../constants/timer';
import type { PomodoroPhase } from '../types/pomodoroPhase.types';
import { notifyPomodoroEnd } from '../utils/timerUtils';

export const usePomodoro = () => {
    const [sec, setSec] = useState(POMODORO_WORK_TIME);
    const [action, setAction] = useState<TimerAction>(INITIAL_ACTION);
    const [isRunning, setIsRunning] = useState(false);
    const [phase, setPhase] = useState<PomodoroPhase>(INITIAL_PHASE);
    const [cycles, setCycles] = useState(0);

    const getInitialTimeForPhase = (phase: PomodoroPhase): number => {
        switch (phase) {
            case 'work': return POMODORO_WORK_TIME;
            case 'shortBreak': return SHORT_BREAK_TIME;
            case 'longBreak': return LONG_BREAK_TIME;
            case 'idle': return POMODORO_WORK_TIME;
        }
    };

    // Time adjustment handlers
    const handleSubtractSec = useCallback(() => {
        setSec((prev) => {
            if (prev <= 1) {
                setPhase((currentPhase) => {
                    notifyPomodoroEnd(currentPhase);
                    return currentPhase;
                });
                setIsRunning(false);
                setAction("Start");
                return 0;
            }
            return prev - 1;
        });
    }, []);

    // Action handlers
    const handleAction = () => {
        if (action === "Start" && phase === "idle") {
            setPhase("work");
        };

        if (action === "Start" || action === "Restart") {
            setAction("Pause");
            setIsRunning(true);
        } else if (action === "Pause") {
            setAction("Restart");
            setIsRunning(false);
        };

    };

    const handleSkipStage = () => {
        if (phase === "idle" || phase === "work") {
            if ((cycles + 1) % 4 === 0) {
                setPhase("longBreak");
                setSec(LONG_BREAK_TIME);
            } else {
                setPhase("shortBreak");
                setSec(SHORT_BREAK_TIME);
            }
            return;
        }

        setPhase("work");
        setSec(POMODORO_WORK_TIME);
        setCycles((prev) => prev + 1);
    };

    const handleReset = () => {
        setAction(INITIAL_ACTION);
        setPhase(INITIAL_PHASE);
        setIsRunning(false);
        setSec(POMODORO_WORK_TIME);
        setCycles(0);
    };

    return {
        sec,
        initialTime: getInitialTimeForPhase(phase),
        action,
        isRunning,
        phase,
        cycles,

        handleSubtractSec,
        handleAction,
        handleSkipStage,
        handleReset
    }
}
