import React, {
    useState,
    createContext,
    useContext,
    ReactNode,
    useEffect
} from 'react';

type ThemeContextData = {
    theme: string;
    toogleTheme: () => void;
}

type ThemeContextProviderProps = {
    children: ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
    const [theme, setTheme] = useState("light");

    const toogleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("tema", newTheme);
    }

    useEffect(() => {
        const temaStorage = localStorage.getItem("tema");

        if (temaStorage === "light" || temaStorage === null) {
            return setTheme("light");
        } else {
            return setTheme("dark");
        }
    }, []);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toogleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    return useContext(ThemeContext);
}