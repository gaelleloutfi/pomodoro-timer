import React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'
import './Navigation.css'

export const Navigation: React.FC = () => {
    return (
        <nav className="navigation">
            <NavLink to={ROUTES.TIMER} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <span className="nav-icon">⏱️</span>
                <span className="nav-label">Timer</span>
            </NavLink>

            <NavLink to={ROUTES.TASKS} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <span className="nav-icon">✅</span>
                <span className="nav-label">Tasks</span>
            </NavLink>

            <NavLink to={ROUTES.STATS} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <span className="nav-icon">📊</span>
                <span className="nav-label">Stats</span>
            </NavLink>

            <NavLink to={ROUTES.SETTINGS} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <span className="nav-icon">⚙️</span>
                <span className="nav-label">Settings</span>
            </NavLink>
        </nav>
    )
}
