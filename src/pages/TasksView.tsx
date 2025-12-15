import React, { useEffect } from 'react'
import { useTaskStore } from '../store/taskStore'
import { TaskForm } from '../components/tasks/TaskForm'
import { TaskItem } from '../components/tasks/TaskItem'
import { Input } from '../components/common/Input'
import './TasksView.css'

export const TasksView: React.FC = () => {
    const {
        tasks,
        activeTaskId,
        searchQuery,
        sortBy,
        loadTasks,
        addTask,
        updateTask,
        deleteTask,
        setActiveTask,
        setSearchQuery,
        setSortBy,
    } = useTaskStore()

    useEffect(() => {
        loadTasks()
    }, [loadTasks])

    // Filter and sort tasks
    const filteredAndSortedTasks = tasks
        .filter((task) =>
            task.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name)
                case 'pomodoros':
                    return b.completedPomodoros - a.completedPomodoros
                case 'date':
                    return b.createdAt - a.createdAt
                default:
                    return 0
            }
        })

    return (
        <div className="tasks-view">
            <div className="tasks-header">
                <h2 className="view-title">Tasks</h2>
                <p className="view-subtitle">Organize your work with Pomodoro estimates</p>
            </div>

            <TaskForm onAdd={addTask} />

            <div className="tasks-controls">
                <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />

                <div className="sort-controls">
                    <label className="sort-label">Sort by:</label>
                    <select
                        className="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'name' | 'pomodoros' | 'date')}
                    >
                        <option value="date">Date</option>
                        <option value="name">Name</option>
                        <option value="pomodoros">Pomodoros</option>
                    </select>
                </div>
            </div>

            <div className="tasks-list">
                {filteredAndSortedTasks.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-icon">📝</span>
                        <p className="empty-text">
                            {searchQuery ? 'No tasks found' : 'No tasks yet. Add one to get started!'}
                        </p>
                    </div>
                ) : (
                    filteredAndSortedTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            isActive={task.id === activeTaskId}
                            onUpdate={updateTask}
                            onDelete={deleteTask}
                            onSetActive={setActiveTask}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
