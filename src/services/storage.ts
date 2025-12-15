// Simple localStorage wrapper for web, will work in Electron renderer
export const saveToStorage = <T>(key: string, data: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
        console.error('Error saving to storage:', error)
    }
}

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
    try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : defaultValue
    } catch (error) {
        console.error('Error loading from storage:', error)
        return defaultValue
    }
}

export const removeFromStorage = (key: string): void => {
    try {
        localStorage.removeItem(key)
    } catch (error) {
        console.error('Error removing from storage:', error)
    }
}
