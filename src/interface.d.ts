import { AIProvider } from "./ai_provider/types";
import { ThemeType } from "./types/themeType";

export interface IElectronAPI {
    getProjects: () => Promise<{ id: number, name: string }[]>;

    getLLMProvider: () => Promise<AIProvider>;
    setLLMProvider: (provider: AIProvider) => Promise<void>;
    getLLMProviderBaseUrl: () => Promise<string>;
    setLLMProviderBaseUrl: (baseUrl: string) => Promise<void>;
    getLLMProviderApiKey: () => Promise<string>;
    setLLMProviderApiKey: (apiKey: string) => Promise<void>;
    getTheme: () => Promise<ThemeType>;
    setTheme: (theme: ThemeType) => Promise<void>;
    createProject: (name: string) => Promise<{ id: number, name: string }>;

    deleteProject: (id: number) => Promise<void>;
}

declare global {
    interface Window {
        api: IElectronAPI;
    }
}
