import React from 'react'
import './Slider.css'

interface SliderProps {
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    step?: number
    label?: string
    showValue?: boolean
}

export const Slider: React.FC<SliderProps> = ({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    label,
    showValue = true,
}) => {
    return (
        <div className="slider-wrapper">
            {label && (
                <div className="slider-header">
                    <span className="slider-label">{label}</span>
                    {showValue && <span className="slider-value">{value}</span>}
                </div>
            )}
            <input
                type="range"
                className="slider"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                min={min}
                max={max}
                step={step}
            />
        </div>
    )
}
