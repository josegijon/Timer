import { useCallback, useState } from "react"
import { INITIAL_SEG, INITIAL_ACTION } from "../constants/timer";
import type { TimerAction } from "../types/timerAction.types";
import { notifyTimerEnd } from "../utils/timerUtils";

export const useTimer = () => {
    const [seg, setSeg] = useState(INITIAL_SEG);
    const [action, setAction] = useState<TimerAction>(INITIAL_ACTION);
    const [isRunning, setIsRunning] = useState(false);

    // Action handlers
    const handleAction = () => {
        if (action === "Start" || action === "Restart") {
            setAction("Pause");
            setIsRunning(true);
        } else if (action === "Pause") {
            setAction("Restart");
            setIsRunning(false);
        };
    };

    const handleReset = () => {
        setAction(INITIAL_ACTION);
        setIsRunning(false);
        setSeg(INITIAL_SEG);
    };

    // Time adjustment handlers
    const handleAddMin = () => setSeg((prev) => prev + 60);

    const handleSubtractMin = () => {
        setSeg((prev) => (prev < 60 ? prev : prev - 60));
    };

    const handleAddSeg = () => {
        setSeg((prev) => prev + 1);
    };

    const handleSubtractSeg = useCallback(() => {
        setSeg((prev) => {
            if (prev <= 1) {
                setAction("Start");
                setIsRunning(false);
                notifyTimerEnd();
                return 0;
            }
            return prev - 1;
        });
    }, []);

    return {
        seg,
        action,
        isRunning,

        handleAction,
        handleReset,
        handleAddMin,
        handleSubtractMin,
        handleAddSeg,
        handleSubtractSeg,
    }
}
