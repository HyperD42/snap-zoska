// src/app/layout.tsx

import { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/NavBar";
import AuthProvider from "../components/AuthProvider";
import { Container, CssBaseline, Paper } from "@mui/material";
import { ThemeModeProvider } from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "SnapZoška",
  description: "Created by Daniel Fučík of SPŠE Zochova 9, Bratislava",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <ThemeModeProvider>
          <AuthProvider>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <main style={{ flexGrow: 1 }}>
                {children}
              </main>
            </div>
            <Navbar />
          </AuthProvider>
        </ThemeModeProvider>
      </body>
    </html>
  );
}