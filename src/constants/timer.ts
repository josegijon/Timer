import type { PomodoroPhase } from "../types/pomodoroPhase.types";
import type { TimerAction } from "../types/timerAction.types";

// Audio
export const AUDIO = new Audio("/final-countdown-timer.mp3");

// Timer
export const INITIAL_SEG = 300;

// Pomodoro
export const INITIAL_ACTION: TimerAction = "Start";
export const INITIAL_PHASE: PomodoroPhase = "idle";
export const POMODORO_WORK_TIME = 5;
export const SHORT_BREAK_TIME = 3;
export const LONG_BREAK_TIME = 10;