// src/app/layout.tsx

import { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/NavBar";
import AuthProvider from "../components/AuthProvider";
import { ThemeModeProvider } from "../components/ThemeProvider";
import { LikesProvider } from "../context/LikesContext";

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
            <LikesProvider>
              {children}
              <Navbar />
            </LikesProvider>
          </AuthProvider>
        </ThemeModeProvider>
      </body>
    </html>
  );
}