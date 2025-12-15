import React, { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { TimerView } from './pages/TimerView'
import { TasksView } from './pages/TasksView'
import { StatsView } from './pages/StatsView'
import { SettingsView } from './pages/SettingsView'
import { useSettingsStore } from './store/settingsStore'
import { useTaskStore } from './store/taskStore'
import { useStatsStore } from './store/statsStore'
import { ROUTES } from './utils/constants'
import './styles/globals.css'
import './styles/animations.css'

function App() {
    const theme = useSettingsStore((state) => state.theme)
    const loadSettings = useSettingsStore((state) => state.loadSettings)
    const loadTasks = useTaskStore((state) => state.loadTasks)
    const loadStats = useStatsStore((state) => state.loadStats)

    // Load all data on mount
    useEffect(() => {
        loadSettings()
        loadTasks()
        loadStats()
    }, [loadSettings, loadTasks, loadStats])

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<TimerView />} />
                    <Route path={ROUTES.TIMER} element={<TimerView />} />
                    <Route path={ROUTES.TASKS} element={<TasksView />} />
                    <Route path={ROUTES.STATS} element={<StatsView />} />
                    <Route path={ROUTES.SETTINGS} element={<SettingsView />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App
