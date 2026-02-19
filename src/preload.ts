import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    getProjects: () => ipcRenderer.invoke('get-projects'),
    getLLMProvider: () => ipcRenderer.invoke('get-llm-provider'),
    setLLMProvider: (provider: string) => ipcRenderer.invoke('set-llm-provider', provider),
});
