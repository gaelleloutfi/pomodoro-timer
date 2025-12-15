export type SessionType = 'work' | 'shortBreak' | 'longBreak'
export type TimerStatus = 'idle' | 'running' | 'paused'

export interface Task {
    id: string
    name: string
    estimatedPomodoros: number
    completedPomodoros: number
    createdAt: number
}

export interface Settings {
    workDuration: number // minutes
    shortBreakDuration: number // minutes
    longBreakDuration: number // minutes
    pomodorosUntilLongBreak: number
    autoStartNext: boolean
    soundEnabled: boolean
    soundVolume: number // 0-100
    theme: 'light' | 'dark'
}

export interface Stats {
    dailyPomodoros: Record<string, number> // date string -> count
    totalFocusTime: number // total minutes
    lastCompletedDate: string | null
}

export interface TimerState {
    timeRemaining: number // seconds
    sessionType: SessionType
    status: TimerStatus
    pomodorosCompletedInCycle: number
}
