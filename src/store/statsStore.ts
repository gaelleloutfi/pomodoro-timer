import { create } from 'zustand'
import { Stats } from '../types'
import { saveToStorage, loadFromStorage } from '../services/storage'
import { STORAGE_KEYS } from '../utils/constants'
import { getTodayString } from '../utils/time'

interface StatsStore {
    dailyPomodoros: Record<string, number>
    totalFocusTime: number
    lastCompletedDate: string | null

    loadStats: () => void
    recordPomodoro: (duration: number) => void
    getStats: () => Stats
}

export const useStatsStore = create<StatsStore>((set, get) => ({
    dailyPomodoros: {},
    totalFocusTime: 0,
    lastCompletedDate: null,

    loadStats: () => {
        const stats = loadFromStorage<Stats>(STORAGE_KEYS.STATS, {
            dailyPomodoros: {},
            totalFocusTime: 0,
            lastCompletedDate: null,
        })
        set(stats)
    },

    recordPomodoro: (duration) => {
        const today = getTodayString()
        const state = get()

        const dailyPomodoros = {
            ...state.dailyPomodoros,
            [today]: (state.dailyPomodoros[today] || 0) + 1,
        }

        const totalFocusTime = state.totalFocusTime + duration

        const newState = {
            dailyPomodoros,
            totalFocusTime,
            lastCompletedDate: today,
        }

        set(newState)
        saveToStorage(STORAGE_KEYS.STATS, newState)
    },

    getStats: () => ({
        dailyPomodoros: get().dailyPomodoros,
        totalFocusTime: get().totalFocusTime,
        lastCompletedDate: get().lastCompletedDate,
    }),
}))
