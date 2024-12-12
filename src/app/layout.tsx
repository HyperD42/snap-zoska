// src/app/layout.tsx

import { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/NavBar";
import AuthProvider from "../components/AuthProvider";
import { Container, CssBaseline, Paper } from "@mui/material";
import { ThemeModeProvider } from "../components/Themes";

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
          <CssBaseline />
          <Paper elevation={0} sx={{ height: "100vh" }} square>
            <AuthProvider>
              <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <main style={{ flexGrow: 1 }}>
                  <Container>
                    {children}
                  </Container>
                </main>
              </div>
              <Navbar />
            </AuthProvider>
          </Paper>
        </ThemeModeProvider>
      </body>
    </html>
  );
}