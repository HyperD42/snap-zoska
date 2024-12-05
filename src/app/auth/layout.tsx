"use client"
import { useThemeMode } from "../../components/Themes"; // Import your theme hook
import "../globals.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useThemeMode(); // Get the current theme from the context

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Horizontally center the content
        alignItems: "center", // Vertically center the content
        height: "100vh", // Full height of the viewport
        backgroundColor: theme.palette.background.default, // Use the background from the theme
      }}
    >
      <div
        style={{
          backgroundColor: theme.palette.background.paper, // Use paper background from the theme
          borderRadius: "8px", // Rounded corners
          padding: "2rem",
          boxShadow: theme.palette.mode === "dark" ? "0px 4px 12px rgba(255, 255, 255, 0.1)" : "0px 4px 12px rgba(0, 0, 0, 0.1)", // Different shadow for dark mode
          maxWidth: "400px", // Set a max width for the box
          width: "100%", // Make it responsive
          textAlign: "center", // Center the text inside the box
        }}
      >
        {children}
      </div>
    </div>
  );
}
