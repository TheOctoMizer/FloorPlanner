export interface IElectronAPI {
    getProjects: () => Promise<{ name: string }[]>;
}

declare global {
    interface Window {
        api: IElectronAPI;
    }
}
