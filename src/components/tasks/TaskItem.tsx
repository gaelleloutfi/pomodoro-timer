import React, { useState } from 'react'
import { Task } from '../../types'
import { Card } from '../common/Card'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import './TaskItem.css'

interface TaskItemProps {
    task: Task
    isActive: boolean
    onUpdate: (id: string, updates: Partial<Task>) => void
    onDelete: (id: string) => void
    onSetActive: (id: string | null) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({
    task,
    isActive,
    onUpdate,
    onDelete,
    onSetActive,
}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState(task.name)

    const handleSave = () => {
        if (editName.trim()) {
            onUpdate(task.id, { name: editName.trim() })
            setIsEditing(false)
        }
    }

    const handleDelete = () => {
        if (confirm(`Delete task "${task.name}"?`)) {
            onDelete(task.id)
        }
    }

    const progress = task.estimatedPomodoros > 0
        ? (task.completedPomodoros / task.estimatedPomodoros) * 100
        : 0

    return (
        <Card className={`task-item ${isActive ? 'task-active' : ''}`}>
            <div className="task-content">
                {isEditing ? (
                    <div className="task-edit">
                        <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSave()
                                if (e.key === 'Escape') setIsEditing(false)
                            }}
                            autoFocus
                        />
                        <Button size="sm" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                ) : (
                    <div className="task-header">
                        <h3 className="task-name" onDoubleClick={() => setIsEditing(true)}>
                            {task.name}
                        </h3>
                        <div className="task-pomodoros">
                            {task.completedPomodoros} / {task.estimatedPomodoros} 🍅
                        </div>
                    </div>
                )}

                <div className="task-progress">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
                    </div>
                </div>

                <div className="task-actions">
                    <Button
                        variant={isActive ? 'secondary' : 'primary'}
                        size="sm"
                        onClick={() => onSetActive(isActive ? null : task.id)}
                    >
                        {isActive ? 'Deactivate' : 'Set Active'}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                        Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </div>
        </Card>
    )
}
