import React, { useEffect } from 'react'
import { useStatsStore } from '../store/statsStore'
import { Card } from '../components/common/Card'
import { getTodayString, getWeekDates, calculateStreak } from '../utils/time'
import './StatsView.css'

export const StatsView: React.FC = () => {
    const { dailyPomodoros, totalFocusTime, loadStats } = useStatsStore()

    useEffect(() => {
        loadStats()
    }, [loadStats])

    const today = getTodayString()
    const todayPomodoros = dailyPomodoros[today] || 0

    const weekDates = getWeekDates()
    const weekPomodoros = weekDates.reduce(
        (sum, date) => sum + (dailyPomodoros[date] || 0),
        0
    )

    const weekFocusTime = weekDates.reduce(
        (sum, date) => sum + ((dailyPomodoros[date] || 0) * 25),
        0
    )

    const streak = calculateStreak(dailyPomodoros)

    const maxWeekPomodoros = Math.max(...weekDates.map(date => dailyPomodoros[date] || 0), 1)

    return (
        <div className="stats-view">
            <div className="stats-header">
                <h2 className="view-title">Statistics</h2>
                <p className="view-subtitle">Track your productivity over time</p>
            </div>

            <div className="stats-grid">
                <Card className="stat-card">
                    <div className="stat-icon">🍅</div>
                    <div className="stat-value">{todayPomodoros}</div>
                    <div className="stat-label">Today's Pomodoros</div>
                </Card>

                <Card className="stat-card">
                    <div className="stat-icon">📅</div>
                    <div className="stat-value">{weekPomodoros}</div>
                    <div className="stat-label">This Week</div>
                </Card>

                <Card className="stat-card">
                    <div className="stat-icon">⏱️</div>
                    <div className="stat-value">{weekFocusTime}</div>
                    <div className="stat-label">Minutes This Week</div>
                </Card>

                <Card className="stat-card">
                    <div className="stat-icon">🔥</div>
                    <div className="stat-value">{streak}</div>
                    <div className="stat-label">Day Streak</div>
                </Card>
            </div>

            <Card className="chart-card">
                <h3 className="chart-title">Last 7 Days</h3>
                <div className="bar-chart">
                    {weekDates.map((date, index) => {
                        const count = dailyPomodoros[date] || 0
                        const height = maxWeekPomodoros > 0 ? (count / maxWeekPomodoros) * 100 : 0
                        const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' })

                        return (
                            <div key={date} className="bar-item">
                                <div className="bar-container">
                                    <div
                                        className="bar"
                                        style={{ height: `${Math.max(height, 5)}%` }}
                                        title={`${count} pomodoros`}
                                    />
                                </div>
                                <div className="bar-label">{dayName}</div>
                                <div className="bar-count">{count}</div>
                            </div>
                        )
                    })}
                </div>
            </Card>
        </div>
    )
}
