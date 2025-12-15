import { create } from 'zustand'
import { Task } from '../types'
import { saveToStorage, loadFromStorage } from '../services/storage'
import { STORAGE_KEYS } from '../utils/constants'

interface TaskStore {
    tasks: Task[]
    activeTaskId: string | null
    searchQuery: string
    sortBy: 'name' | 'pomodoros' | 'date'

    loadTasks: () => void
    addTask: (name: string, estimatedPomodoros: number) => void
    updateTask: (id: string, updates: Partial<Task>) => void
    deleteTask: (id: string) => void
    setActiveTask: (id: string | null) => void
    incrementTaskPomodoro: (id: string) => void
    setSearchQuery: (query: string) => void
    setSortBy: (sortBy: 'name' | 'pomodoros' | 'date') => void
}

export const useTaskStore = create<TaskStore>((set, get) => ({
    tasks: [],
    activeTaskId: null,
    searchQuery: '',
    sortBy: 'date',

    loadTasks: () => {
        const tasks = loadFromStorage<Task[]>(STORAGE_KEYS.TASKS, [])
        set({ tasks })
    },

    addTask: (name, estimatedPomodoros) => {
        const newTask: Task = {
            id: Date.now().toString(),
            name,
            estimatedPomodoros,
            completedPomodoros: 0,
            createdAt: Date.now(),
        }

        const tasks = [...get().tasks, newTask]
        set({ tasks })
        saveToStorage(STORAGE_KEYS.TASKS, tasks)
    },

    updateTask: (id, updates) => {
        const tasks = get().tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
        )
        set({ tasks })
        saveToStorage(STORAGE_KEYS.TASKS, tasks)
    },

    deleteTask: (id) => {
        const tasks = get().tasks.filter((task) => task.id !== id)
        set({ tasks, activeTaskId: get().activeTaskId === id ? null : get().activeTaskId })
        saveToStorage(STORAGE_KEYS.TASKS, tasks)
    },

    setActiveTask: (id) => set({ activeTaskId: id }),

    incrementTaskPomodoro: (id) => {
        const tasks = get().tasks.map((task) =>
            task.id === id
                ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
                : task
        )
        set({ tasks })
        saveToStorage(STORAGE_KEYS.TASKS, tasks)
    },

    setSearchQuery: (query) => set({ searchQuery: query }),

    setSortBy: (sortBy) => set({ sortBy }),
}))
