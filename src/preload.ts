import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    getProjects: () => ipcRenderer.invoke('get-projects'),
    getLLMProvider: () => ipcRenderer.invoke('get-llm-provider'),
    setLLMProvider: (provider: string) => ipcRenderer.invoke('set-llm-provider', provider),
    getLLMProviderBaseUrl: () => ipcRenderer.invoke('get-llm-provider-base-url'),
    setLLMProviderBaseUrl: (baseUrl: string) => ipcRenderer.invoke('set-llm-provider-base-url', baseUrl),
    getLLMProviderApiKey: () => ipcRenderer.invoke('get-llm-provider-api-key'),
    setLLMProviderApiKey: (apiKey: string) => ipcRenderer.invoke('set-llm-provider-api-key', apiKey),
});
