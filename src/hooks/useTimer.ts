import { useEffect, useRef } from 'react'
import { useTimerStore } from '../store/timerStore'
import { useSettingsStore } from '../store/settingsStore'
import { useStatsStore } from '../store/statsStore'
import { useTaskStore } from '../store/taskStore'
import { showNotification } from '../services/notifications'
import { audioService } from '../services/audio'

export const useTimer = () => {
    const {
        timeRemaining,
        sessionType,
        status,
        pomodorosCompletedInCycle,
        setTimeRemaining,
        setSessionType,
        setStatus,
        incrementCycleCount,
        resetCycleCount,
        tick,
    } = useTimerStore()

    const settings = useSettingsStore()
    const recordPomodoro = useStatsStore((state) => state.recordPomodoro)
    const { activeTaskId, incrementTaskPomodoro } = useTaskStore()

    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Calculate initial time based on session type
    const getSessionDuration = () => {
        switch (sessionType) {
            case 'work':
                return settings.workDuration * 60
            case 'shortBreak':
                return settings.shortBreakDuration * 60
            case 'longBreak':
                return settings.longBreakDuration * 60
            default:
                return settings.workDuration * 60
        }
    }

    // Start timer
    const startTimer = () => {
        setStatus('running')
        if (timeRemaining === 0 || status === 'idle') {
            setTimeRemaining(getSessionDuration())
        }
    }

    // Pause timer
    const pauseTimer = () => {
        setStatus('paused')
    }

    // Resume timer
    const resumeTimer = () => {
        setStatus('running')
    }

    // Reset timer
    const resetTimer = () => {
        setStatus('idle')
        setTimeRemaining(getSessionDuration())
    }

    // Skip to next session
    const skipSession = () => {
        setStatus('idle')
        goToNextSession()
    }

    // Determine next session type
    const goToNextSession = () => {
        if (sessionType === 'work') {
            // After work, check if it's time for long break
            if (pomodorosCompletedInCycle >= settings.pomodorosUntilLongBreak - 1) {
                setSessionType('longBreak')
                resetCycleCount()
            } else {
                setSessionType('shortBreak')
            }
        } else {
            // After any break, go back to work
            setSessionType('work')
        }
        setTimeRemaining(getSessionDuration())
    }

    // Handle session completion
    const handleSessionComplete = () => {
        const isWorkSession = sessionType === 'work'

        // Send notification
        const title = isWorkSession ? 'Work Session Complete!' : 'Break Time Over!'
        const body = isWorkSession
            ? 'Great job! Time for a break.'
            : 'Break is over. Ready to focus?'

        showNotification(title, body)

        // Play sound if enabled
        if (settings.soundEnabled) {
            audioService.playNotificationSound(settings.soundVolume)
        }

        // Record pomodoro if work session
        if (isWorkSession) {
            recordPomodoro(settings.workDuration)
            incrementCycleCount()

            // Increment active task pomodoro
            if (activeTaskId) {
                incrementTaskPomodoro(activeTaskId)
            }
        }

        // Stop timer
        setStatus('idle')

        // Auto-start next session if enabled
        if (settings.autoStartNext) {
            goToNextSession()
            setStatus('running')
        } else {
            goToNextSession()
        }
    }

    // Timer interval effect
    useEffect(() => {
        if (status === 'running') {
            intervalRef.current = setInterval(() => {
                tick()
            }, 1000)
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    // Check for completion
    useEffect(() => {
        if (timeRemaining === 0 && status === 'running') {
            handleSessionComplete()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeRemaining, status])

    // Calculate progress percentage
    const totalDuration = getSessionDuration()
    const percentage = totalDuration > 0 ? ((totalDuration - timeRemaining) / totalDuration) * 100 : 0

    return {
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
    }
}
