import { Settings } from '../types'

export const DEFAULT_SETTINGS: Settings = {
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    pomodorosUntilLongBreak: 4,
    autoStartNext: false,
    soundEnabled: true,
    soundVolume: 70,
    theme: 'light',
}

export const STORAGE_KEYS = {
    TASKS: 'pomodoro_tasks',
    SETTINGS: 'pomodoro_settings',
    STATS: 'pomodoro_stats',
}

export const ROUTES = {
    TIMER: '/',
    TASKS: '/tasks',
    STATS: '/stats',
    SETTINGS: '/settings',
}
