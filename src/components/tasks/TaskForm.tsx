import React, { useState } from 'react'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import './TaskForm.css'

interface TaskFormProps {
    onAdd: (name: string, estimatedPomodoros: number) => void
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
    const [name, setName] = useState('')
    const [estimatedPomodoros, setEstimatedPomodoros] = useState(4)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (name.trim() && estimatedPomodoros > 0) {
            onAdd(name.trim(), estimatedPomodoros)
            setName('')
            setEstimatedPomodoros(4)
        }
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <Input
                label="Task Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter task name..."
                required
            />

            <Input
                label="Estimated Pomodoros"
                type="number"
                value={estimatedPomodoros}
                onChange={(e) => setEstimatedPomodoros(Number(e.target.value))}
                min={1}
                max={99}
                required
            />

            <Button type="submit" variant="primary" className="add-button">
                Add Task
            </Button>
        </form>
    )
}
