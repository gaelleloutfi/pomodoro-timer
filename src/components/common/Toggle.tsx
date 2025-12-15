import React from 'react'
import './Toggle.css'

interface ToggleProps {
    checked: boolean
    onChange: (checked: boolean) => void
    label?: string
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
    return (
        <div className="toggle-wrapper">
            {label && <span className="toggle-label">{label}</span>}
            <button
                className={`toggle ${checked ? 'toggle-checked' : ''}`}
                onClick={() => onChange(!checked)}
                role="switch"
                aria-checked={checked}
            >
                <span className="toggle-thumb" />
            </button>
        </div>
    )
}
