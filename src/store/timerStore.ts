import { create } from 'zustand'
import { SessionType, TimerStatus } from '../types'

interface TimerStore {
    timeRemaining: number
    sessionType: SessionType
    status: TimerStatus
    pomodorosCompletedInCycle: number

    setTimeRemaining: (time: number) => void
    setSessionType: (type: SessionType) => void
    setStatus: (status: TimerStatus) => void
    incrementCycleCount: () => void
    resetCycleCount: () => void
    tick: () => void
    reset: () => void
}

export const useTimerStore = create<TimerStore>((set) => ({
    timeRemaining: 25 * 60, // 25 minutes in seconds
    sessionType: 'work',
    status: 'idle',
    pomodorosCompletedInCycle: 0,

    setTimeRemaining: (time) => set({ timeRemaining: time }),

    setSessionType: (type) => set({ sessionType: type }),

    setStatus: (status) => set({ status }),

    incrementCycleCount: () =>
        set((state) => ({
            pomodorosCompletedInCycle: state.pomodorosCompletedInCycle + 1
        })),

    resetCycleCount: () => set({ pomodorosCompletedInCycle: 0 }),

    tick: () =>
        set((state) => ({
            timeRemaining: Math.max(0, state.timeRemaining - 1)
        })),

    reset: () =>
        set({
            timeRemaining: 25 * 60,
            status: 'idle'
        }),
}))
