import React from 'react'
import { TimerStatus } from '../../types'
import { Button } from '../common/Button'
import './TimerControls.css'

interface TimerControlsProps {
    status: TimerStatus
    onStart: () => void
    onPause: () => void
    onResume: () => void
    onReset: () => void
    onSkip: () => void
}

export const TimerControls: React.FC<TimerControlsProps> = ({
    status,
    onStart,
    onPause,
    onResume,
    onReset,
    onSkip,
}) => {
    return (
        <div className="timer-controls">
            <div className="main-controls">
                {status === 'idle' && (
                    <Button variant="primary" size="lg" onClick={onStart}>
                        Start
                    </Button>
                )}

                {status === 'running' && (
                    <Button variant="primary" size="lg" onClick={onPause}>
                        Pause
                    </Button>
                )}

                {status === 'paused' && (
                    <Button variant="primary" size="lg" onClick={onResume}>
                        Resume
                    </Button>
                )}
            </div>

            <div className="secondary-controls">
                <Button variant="ghost" size="sm" onClick={onReset} disabled={status === 'idle'}>
                    Reset
                </Button>
                <Button variant="ghost" size="sm" onClick={onSkip}>
                    Skip
                </Button>
            </div>
        </div>
    )
}
