export interface IElectronAPI {
    showNotification: (title: string, body: string) => Promise<boolean>
    getAppVersion: () => Promise<string>
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}
