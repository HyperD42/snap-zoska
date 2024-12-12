"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Create a context
interface ThemeModeContextType {
  theme: Theme;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<boolean>(false);

  // Create the theme based on the current mode
  const theme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
      primary: {
        main: mode ? '#CE93D8' : '#9C27B0',  // Purple color (you can change this to any color you want)
      },
    },
  });

  return (
    <ThemeModeContext.Provider value={{ theme, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return context;
};
