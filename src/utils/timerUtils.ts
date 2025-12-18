import type { PomodoroPhase } from "../types/pomodoroPhase.types";
import { AUDIO } from "../constants/timer";

export const formatSecondsToMinSec = (totalSeconds: number) => {
    return {
        minutes: Math.floor(totalSeconds / 60),
        seconds: totalSeconds % 60
    };
};

// Timer notification
export const notifyTimerEnd = () => {
    AUDIO.play().catch((err) => console.error("Audio playback failed:", err));

    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Timer ended", {
            body: "Your time has reached 0!",
        });
    }
};

// Pomodoro notification
export const notifyPomodoroEnd = (phase: PomodoroPhase) => {
    AUDIO.play().catch((err) => console.error("Audio playback failed:", err));

    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Pomodoro Timer", {
            body: getPomodoroMessage(phase)
        });
    }
};

// Helper para mensajes de Pomodoro
const getPomodoroMessage = (phase: PomodoroPhase): string => {
    switch (phase) {
        case "work":
            return "Work session completed! Time for a break.";
        case "shortBreak":
            return "Short break over! Ready to focus again?";
        case "longBreak":
            return "Long break finished! Great work today!";
        case "idle":
            return "Timer ended.";
    }
};