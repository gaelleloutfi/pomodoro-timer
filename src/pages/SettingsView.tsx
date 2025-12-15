import React from 'react'
import { useSettingsStore } from '../store/settingsStore'
import { Card } from '../components/common/Card'
import { Input } from '../components/common/Input'
import { Toggle } from '../components/common/Toggle'
import { Slider } from '../components/common/Slider'
import { Button } from '../components/common/Button'
import { audioService } from '../services/audio'
import { requestNotificationPermission, getNotificationPermission } from '../services/notifications'
import './SettingsView.css'

export const SettingsView: React.FC = () => {
    const settings = useSettingsStore()

    const handleTestNotification = async () => {
        const hasPermission = await requestNotificationPermission()
        if (hasPermission) {
            const { showNotification } = await import('../services/notifications')
            showNotification('Test Notification', 'Notifications are working! 🎉')
        } else {
            alert('Please enable notifications in your browser settings.')
        }
    }

    const handleTestSound = () => {
        audioService.playNotificationSound(settings.soundVolume)
    }

    const notificationPermission = getNotificationPermission()

    return (
        <div className="settings-view">
            <div className="settings-header">
                <h2 className="view-title">Settings</h2>
                <p className="view-subtitle">Customize your Pomodoro experience</p>
            </div>

            <div className="settings-sections">
                <Card>
                    <h3 className="section-title">Timer Durations</h3>
                    <div className="settings-grid">
                        <Input
                            label="Work Duration (minutes)"
                            type="number"
                            value={settings.workDuration}
                            onChange={(e) => settings.updateSettings({ workDuration: Number(e.target.value) })}
                            min={1}
                            max={60}
                        />

                        <Input
                            label="Short Break (minutes)"
                            type="number"
                            value={settings.shortBreakDuration}
                            onChange={(e) => settings.updateSettings({ shortBreakDuration: Number(e.target.value) })}
                            min={1}
                            max={30}
                        />

                        <Input
                            label="Long Break (minutes)"
                            type="number"
                            value={settings.longBreakDuration}
                            onChange={(e) => settings.updateSettings({ longBreakDuration: Number(e.target.value) })}
                            min={1}
                            max={60}
                        />

                        <Input
                            label="Pomodoros Until Long Break"
                            type="number"
                            value={settings.pomodorosUntilLongBreak}
                            onChange={(e) => settings.updateSettings({ pomodorosUntilLongBreak: Number(e.target.value) })}
                            min={2}
                            max={10}
                        />
                    </div>
                </Card>

                <Card>
                    <h3 className="section-title">Behavior</h3>
                    <div className="toggle-section">
                        <Toggle
                            label="Auto-start next session"
                            checked={settings.autoStartNext}
                            onChange={(checked) => settings.updateSettings({ autoStartNext: checked })}
                        />
                    </div>
                </Card>

                <Card>
                    <h3 className="section-title">Notifications</h3>

                    {notificationPermission === 'denied' && (
                        <div className="notification-warning">
                            ⚠️ Notifications are blocked. Please enable them in your browser settings.
                        </div>
                    )}

                    {notificationPermission === 'default' && (
                        <div className="notification-info">
                            💡 Click "Test Notification" to enable notifications.
                        </div>
                    )}

                    <div className="toggle-section">
                        <Toggle
                            label="Sound notifications"
                            checked={settings.soundEnabled}
                            onChange={(checked) => settings.updateSettings({ soundEnabled: checked })}
                        />
                    </div>

                    {settings.soundEnabled && (
                        <div className="slider-section">
                            <Slider
                                label="Sound Volume"
                                value={settings.soundVolume}
                                onChange={(value) => settings.updateSettings({ soundVolume: value })}
                                min={0}
                                max={100}
                                step={5}
                            />
                        </div>
                    )}

                    <div className="test-buttons">
                        <Button variant="secondary" onClick={handleTestNotification}>
                            Test Notification
                        </Button>
                        <Button variant="secondary" onClick={handleTestSound}>
                            Test Sound
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
