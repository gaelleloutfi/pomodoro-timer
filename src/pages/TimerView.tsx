import React from 'react'
import { CircularProgress } from '../components/timer/CircularProgress'
import { TimerDisplay } from '../components/timer/TimerDisplay'
import { TimerControls } from '../components/timer/TimerControls'
import { useTimer } from '../hooks/useTimer'
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts'
import './TimerView.css'

export const TimerView: React.FC = () => {
    const {
        timeRemaining,
        sessionType,
        status,
        pomodorosCompletedInCycle,
        percentage,
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
        skipSession,
    } = useTimer()

    const handleStartPause = () => {
        if (status === 'idle') {
            startTimer()
        } else if (status === 'running') {
            pauseTimer()
        } else if (status === 'paused') {
            resumeTimer()
        }
    }

    useKeyboardShortcuts(handleStartPause, resetTimer, skipSession)

    return (
        <div className="timer-view">
            <div className="timer-container">
                <div className="timer-display-wrapper">
                    <CircularProgress percentage={percentage} sessionType={sessionType} />
                    <TimerDisplay
                        timeRemaining={timeRemaining}
                        sessionType={sessionType}
                        pomodorosCompleted={pomodorosCompletedInCycle}
                    />
                </div>

                <TimerControls
                    status={status}
                    onStart={startTimer}
                    onPause={pauseTimer}
                    onResume={resumeTimer}
                    onReset={resetTimer}
                    onSkip={skipSession}
                />
            </div>

            <div className="keyboard-hints">
                <div className="hint">
                    <kbd>Space</kbd>
                    <span>Start / Pause</span>
                </div>
                <div className="hint">
                    <kbd>R</kbd>
                    <span>Reset</span>
                </div>
                <div className="hint">
                    <kbd>N</kbd>
                    <span>Skip</span>
                </div>
            </div>
        </div>
    )
}
