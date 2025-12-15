import React from 'react'
import { SessionType } from '../../types'
import './CircularProgress.css'

interface CircularProgressProps {
    percentage: number
    sessionType: SessionType
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
    percentage,
    sessionType,
}) => {
    const radius = 140
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    const getStrokeColor = () => {
        switch (sessionType) {
            case 'work':
                return 'var(--matcha-500)'
            case 'shortBreak':
                return 'var(--matcha-400)'
            case 'longBreak':
                return 'var(--matcha-600)'
            default:
                return 'var(--matcha-500)'
        }
    }

    return (
        <div className="circular-progress">
            <svg width="320" height="320" className="progress-svg">
                {/* Background circle */}
                <circle
                    cx="160"
                    cy="160"
                    r={radius}
                    fill="none"
                    stroke="var(--matcha-100)"
                    strokeWidth="12"
                />

                {/* Progress circle */}
                <circle
                    cx="160"
                    cy="160"
                    r={radius}
                    fill="none"
                    stroke={getStrokeColor()}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="progress-circle"
                    style={{
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%',
                    }}
                />
            </svg>
        </div>
    )
}
