import React from 'react'
import { SessionType } from '../../types'
import { formatTime } from '../../utils/time'
import './TimerDisplay.css'

interface TimerDisplayProps {
    timeRemaining: number
    sessionType: SessionType
    pomodorosCompleted: number
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
    timeRemaining,
    sessionType,
    pomodorosCompleted,
}) => {
    const getSessionLabel = () => {
        switch (sessionType) {
            case 'work':
                return 'Focus Time'
            case 'shortBreak':
                return 'Short Break'
            case 'longBreak':
                return 'Long Break'
            default:
                return 'Focus Time'
        }
    }

    return (
        <div className="timer-display">
            <div className="session-label">{getSessionLabel()}</div>
            <div className="time-text">{formatTime(timeRemaining)}</div>
            {sessionType === 'work' && pomodorosCompleted > 0 && (
                <div className="pomodoro-badge">
                    {pomodorosCompleted} 🍅
                </div>
            )}
        </div>
    )
}
