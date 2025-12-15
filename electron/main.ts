import { app, BrowserWindow, ipcMain, Notification } from 'electron'
import path from 'path'

let mainWindow: BrowserWindow | null = null

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        minWidth: 600,
        minHeight: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
        titleBarStyle: 'default',
        backgroundColor: '#f3f8f3',
        show: false,
    })

    // Show window when ready to avoid flicker
    mainWindow.once('ready-to-show', () => {
        mainWindow?.show()
    })

    // Load the app
    if (process.env.VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
        // Open DevTools in development
        mainWindow.webContents.openDevTools()
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
    }

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// IPC Handlers
ipcMain.handle('show-notification', async (_event, title: string, body: string) => {
    if (Notification.isSupported()) {
        new Notification({
            title,
            body,
            silent: false,
        }).show()
    }
    return true
})

ipcMain.handle('get-app-version', () => {
    return app.getVersion()
})
