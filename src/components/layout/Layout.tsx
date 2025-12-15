import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Navigation } from './Navigation'
import './Layout.css'

export const Layout: React.FC = () => {
    return (
        <div className="layout">
            <Header />

            <div className="background-decoration">
                <svg className="decoration-svg decoration-top-left" width="300" height="300" viewBox="0 0 300 300">
                    <circle cx="0" cy="0" r="150" fill="var(--matcha-100)" opacity="0.3" />
                </svg>

                <svg className="decoration-svg decoration-bottom-right" width="300" height="300" viewBox="0 0 300 300">
                    <circle cx="300" cy="300" r="150" fill="var(--matcha-100)" opacity="0.3" />
                </svg>
            </div>

            <div className="content-wrapper">
                <Navigation />

                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
