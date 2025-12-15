import { create } from 'zustand'
import { Settings } from '../types'
import { saveToStorage, loadFromStorage } from '../services/storage'
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '../utils/constants'

interface SettingsStore extends Settings {
    loadSettings: () => void
    updateSettings: (updates: Partial<Settings>) => void
    getSettings: () => Settings
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
    ...DEFAULT_SETTINGS,

    loadSettings: () => {
        const settings = loadFromStorage<Settings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
        set(settings)
    },

    updateSettings: (updates) => {
        const newSettings = { ...get(), ...updates }
        // Remove methods before saving
        const { loadSettings, updateSettings, getSettings, ...settingsToSave } = newSettings
        set(newSettings)
        saveToStorage(STORAGE_KEYS.SETTINGS, settingsToSave)
    },

    getSettings: () => {
        const state = get()
        return {
            workDuration: state.workDuration,
            shortBreakDuration: state.shortBreakDuration,
            longBreakDuration: state.longBreakDuration,
            pomodorosUntilLongBreak: state.pomodorosUntilLongBreak,
            autoStartNext: state.autoStartNext,
            soundEnabled: state.soundEnabled,
            soundVolume: state.soundVolume,
            theme: state.theme,
        }
    },
}))
