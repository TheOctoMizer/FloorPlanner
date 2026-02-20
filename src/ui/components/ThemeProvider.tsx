import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeType } from "@/types/themeType";

type ThemeProviderProps = {
    children: React.ReactNode;
};

type ThemeProviderState = {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
    undefined
);

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setThemeState] = useState<ThemeType>(ThemeType.Dark);

    useEffect(() => {
        const initTheme = async () => {
            try {
                const savedTheme = await window.api.getTheme();
                if (savedTheme) {
                    setThemeState(savedTheme);
                }
            } catch (error) {
                console.error("Failed to fetch theme from DB:", error);
            }
        };
        initTheme();
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
    }, [theme]);

    const setTheme = async (newTheme: ThemeType) => {
        setThemeState(newTheme);
        try {
            await window.api.setTheme(newTheme);
        } catch (error) {
            console.error("Failed to save theme to DB:", error);
        }
    };

    return (
        <ThemeProviderContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
