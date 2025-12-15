export const showNotification = async (title: string, body: string): Promise<void> => {
    // Use Electron API if available
    if (window.electronAPI) {
        try {
            await window.electronAPI.showNotification(title, body)
            return
        } catch (error) {
            console.error('Electron notification failed:', error)
        }
    }

    // Fallback to Web Notification API
    if ('Notification' in window) {
        if (Notification.permission === 'granted') {
            new Notification(title, { body })
        } else if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission()
            if (permission === 'granted') {
                new Notification(title, { body })
            }
        }
    }
}

export const requestNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
        return false
    }

    if (Notification.permission === 'granted') {
        return true
    }

    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission()
        return permission === 'granted'
    }

    return false
}

export const getNotificationPermission = (): string => {
    if (!('Notification' in window)) {
        return 'unsupported'
    }
    return Notification.permission
}
