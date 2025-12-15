import { useEffect } from 'react'
import { useTimerStore } from '../store/timerStore'

export const useKeyboardShortcuts = (
    onStartPause: () => void,
    onReset: () => void,
    onSkip: () => void
) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Ignore if user is typing in input
            if (
                event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement
            ) {
                return
            }

            switch (event.key.toLowerCase()) {
                case ' ':
                    event.preventDefault()
                    onStartPause()
                    break
                case 'r':
                    event.preventDefault()
                    onReset()
                    break
                case 'n':
                    event.preventDefault()
                    onSkip()
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onStartPause, onReset, onSkip])
}
