"use client"; // This ensures we can use hooks like useSession

import { useSession } from "next-auth/react"; // Import only useSession
import * as React from 'react';
import { useThemeMode } from "../components/Themes"; // Import for the theme context
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Link from 'next/link';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GavelIcon from '@mui/icons-material/Gavel';
import AddIcon from '@mui/icons-material/Add';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode'; // Import LightModeIcon
import Avatar from '@mui/material/Avatar'; // Import Avatar for profile picture

// Define a type for navigation items
interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  key: string; // Ensure each item has a unique key
}

// Function to create BottomNavigationAction components
const createNavAction = (item: NavItem) => (
  <BottomNavigationAction
    key={item.key}
    label={item.label}
    icon={item.icon}
    component={Link}
    href={item.href}
  />
);

export default function NavBar() {
  const { theme, setMode } = useThemeMode(); // Access theme and setMode
  const { data: session } = useSession(); // Get user session
  const [value, setValue] = React.useState(0);

  // Non-authenticated nav items
  const nonAuthNavItems: NavItem[] = [
    { label: "Domov", icon: <HomeIcon />, href: "/", key: "home" },
    { label: "GDPR", icon: <GavelIcon />, href: "/gdpr", key: "gdpr" },
    { label: "O Mne", icon: <InfoIcon />, href: "/o-mne", key: "about" },
    { label: "Podmienky", icon: <ListAltIcon />, href: "/podmienky", key: "terms" },
    { label: "Prihlásenie", icon: <LoginIcon />, href: "/auth/prihlasenie", key: "sign-in" },
    { label: "Registrácia", icon: <AppRegistrationIcon />, href: "/auth/registracia", key: "register" },
  ];

  // Authenticated nav items
  const authNavItems: NavItem[] = [
    { label: "Domov", icon: <HomeIcon />, href: "/", key: "home" },
    { label: "Prispevky", icon: <PostAddIcon />, href: "/prispevok", key: "posts" },
    { label: "Hladanie", icon: <SearchIcon />, href: "/hladanie", key: "search" },
    { label: "Notifikacie", icon: <NotificationsActiveIcon />, href: "/notifikacie", key: "notifications" },
    { label: "Pridat", icon: <AddIcon />, href: "/pridat", key: "add" },
    {
      label: "Profil",
      icon: (
        <Avatar
          alt={session?.user?.name || "User"}
          src={session?.user?.image || "/default-avatar.png"}
        />
      ),
      href: "/profil",
      key: "profile",
    },
    { label: "Odhlásiť sa", icon: <LoginIcon />, href: "/auth/odhlasenie", key: "sign-out" },
  ];

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, borderTop: "1px solid", borderColor: theme.palette.mode === "dark" ? "#333" : "#ddd", boxShadow: theme.palette.mode === "dark" ? "0px 4px 10px rgba(0, 0, 0, 0.3)" : "0px 4px 10px rgba(0, 0, 0, 0.1)",}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {/* Render non-authenticated or authenticated nav items based on session */}
        {(session ? authNavItems : nonAuthNavItems).map(createNavAction)}
        {/* Toggle Dark/Light Mode */}
        <button
          onClick={() => setMode((prevMode) => !prevMode)}
          style={{
            position: "absolute",
            bottom: "16px", // Space from the bottom
            right: "16px",  // Space from the right
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {theme.palette.mode === "dark" ? (
            <LightModeIcon sx={{ color: 'white' }} /> // Light icon color in dark mode
          ) : (
            <DarkModeIcon sx={{ color: 'black' }} /> // Dark icon color in light mode
          )}
        </button>
      </BottomNavigation>
    </Box>
  );
}
