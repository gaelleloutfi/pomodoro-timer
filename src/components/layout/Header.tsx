import React from 'react'
import { useSettingsStore } from '../../store/settingsStore'
import './Header.css'

export const Header: React.FC = () => {
    const { theme, updateSettings } = useSettingsStore()

    const toggleTheme = () => {
        updateSettings({ theme: theme === 'light' ? 'dark' : 'light' })
    }

    return (
        <header className="header">
            <div className="header-content">
                <div className="brand">
                    <svg width="32" height="32" viewBox="0 0 32 32" className="logo">
                        <circle cx="16" cy="16" r="14" fill="var(--matcha-500)" opacity="0.2" />
                        <path
                            d="M16 4 C 10 4, 6 8, 6 14 C 6 20, 10 24, 16 28 C 22 24, 26 20, 26 14 C 26 8, 22 4, 16 4 Z"
                            fill="var(--matcha-500)"
                        />
                        <ellipse cx="16" cy="6" rx="3" ry="1.5" fill="var(--matcha-700)" />
                    </svg>
                    <h1 className="app-title">Pomodoro Timer</h1>
                </div>

                <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </header>
    )
}
