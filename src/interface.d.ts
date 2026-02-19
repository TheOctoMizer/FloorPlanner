import { AIProvider } from "./ai_provider/types";

export interface IElectronAPI {
    getProjects: () => Promise<{ name: string }[]>;
    getLLMProvider: () => Promise<AIProvider>;
    setLLMProvider: (provider: AIProvider) => Promise<void>;
    getLLMProviderBaseUrl: () => Promise<string>;
    setLLMProviderBaseUrl: (baseUrl: string) => Promise<void>;
    getLLMProviderApiKey: () => Promise<string>;
    setLLMProviderApiKey: (apiKey: string) => Promise<void>;
}

declare global {
    interface Window {
        api: IElectronAPI;
    }
}
