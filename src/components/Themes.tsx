"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";  // Import Theme type

// Create a context
interface ThemeModeContextType {
  theme: Theme;  // Use Theme type for the theme
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<boolean>(false);  // Explicitly define 'mode' type as boolean

  // Create the theme based on the current mode
  const theme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });

  return (
    <ThemeModeContext.Provider value={{ theme, setMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
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
