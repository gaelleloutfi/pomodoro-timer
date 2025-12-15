export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp)
    return date.toLocaleDateString()
}

export const getTodayString = (): string => {
    const today = new Date()
    return today.toISOString().split('T')[0]
}

export const getWeekDates = (): string[] => {
    const dates: string[] = []
    const today = new Date()

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        dates.push(date.toISOString().split('T')[0])
    }

    return dates
}

export const calculateStreak = (dailyPomodoros: Record<string, number>): number => {
    const today = new Date()
    let streak = 0

    for (let i = 0; i < 365; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const dateString = date.toISOString().split('T')[0]

        if (dailyPomodoros[dateString] && dailyPomodoros[dateString] > 0) {
            streak++
        } else {
            break
        }
    }

    return streak
}
