"use client"; // This ensures we can use hooks like useSession

import { useSession, signOut } from "next-auth/react"; // Import signOut
import * as React from 'react';
import { useThemeMode } from "./ThemeProvider"; // Import for the theme context
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Link from 'next/link';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AddIcon from '@mui/icons-material/Add';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';

// Define a type for navigation items
interface NavItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  key: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

// Function to create BottomNavigationAction components
const createNavAction = (item: NavItem) => (
  <BottomNavigationAction
    key={item.key}
    label={item.label}
    icon={item.icon}
    component={item.href ? Link : 'div'}
    href={item.href}
    onClick={item.onClick}
  />
);

export default function NavBar() {
  const { theme, setMode } = useThemeMode();
  const { data: session } = useSession();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut();
    handleMenuClose();
  };

  // Non-authenticated nav items
  const nonAuthNavItems: NavItem[] = [
    { label: "Domov", icon: <HomeIcon />, href: "/", key: "home" },
    { label: "O Mne", icon: <InfoIcon />, href: "/o-mne", key: "about" },
    { label: "Registrácia", icon: <AppRegistrationIcon />, href: "/auth/registracia", key: "register" },
    { label: "Prihlásenie", icon: <LoginIcon />, href: "/auth/prihlasenie", key: "sign-in" },
  ];

  // Authenticated nav items
  const authNavItems: NavItem[] = [
    { label: "Domov", icon: <HomeIcon />, href: "/prispevok", key: "home" },
    { label: "Hladanie", icon: <SearchIcon />, href: "/hladanie", key: "search" },
    { label: "Notifikacie", icon: <NotificationsActiveIcon />, href: "/notifikacie", key: "notifications" },
    { label: "Pridat", icon: <AddIcon />, href: "/pridat", key: "add" },
    {
      label: "Profil",
      icon: (
        <Avatar
          alt={session?.user?.name || "User"}
          src={session?.user?.image || "/default-avatar.png"}
          sx={{ cursor: 'pointer' }}
        />
      ),
      key: "profile",
      onClick: handleProfileMenuOpen
    },
  ];

  return (
    <>
      <Box sx={{ 
        width: "5%", 
        position: "fixed", 
        bottom: 0, 
        left: 0, 
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <BottomNavigation
          showLabels={false}
          sx={{ 
            width: '100%',
            height: '57px',
            borderTop: "1px solid",
            borderColor: theme.palette.mode === "dark" ? "#333" : "#ddd"
          }}
        />
      </Box>
      <Box sx={{ 
        width: '90%', 
        position: 'fixed', 
        bottom: 0, 
        left: '5%', 
        borderTop: "1px solid", 
        borderRight: "1px solid",
        borderColor: theme.palette.mode === "dark" ? "#333" : "#ddd", 
        boxShadow: theme.palette.mode === "dark" ? "4px 0 10px rgba(0, 0, 0, 0.3)" : "4px 0 10px rgba(0, 0, 0, 0.1)" 
      }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {(session ? authNavItems : nonAuthNavItems).map(createNavAction)}
        </BottomNavigation>
      </Box>
      <Box sx={{ 
        width: "5%", 
        position: "fixed", 
        bottom: 0, 
        right: 0, 
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <BottomNavigation
          showLabels={false}
          sx={{ 
            width: '100%',
            height: '57px',
            borderTop: "1px solid",
            borderColor: theme.palette.mode === "dark" ? "#333" : "#ddd"
          }}
        >
          <BottomNavigationAction
            icon={theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            onClick={() => setMode((prevMode) => !prevMode)}
            sx={{ minWidth: 'auto' }}
          />
        </BottomNavigation>
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: -1,
            minWidth: 180,
            boxShadow: theme.palette.mode === "dark" ? "0px 4px 10px rgba(0, 0, 0, 0.3)" : "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }
        }}
      >
        <MenuItem component={Link} href="/profil" onClick={handleMenuClose}>
          <ListItemIcon>
            <Avatar
              alt={session?.user?.name || "User"}
              src={session?.user?.image || "/default-avatar.png"}
              sx={{ width: 24, height: 24 }}
            />
          </ListItemIcon>
          Profil
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Odhlásiť sa
        </MenuItem>
      </Menu>
    </>
  );
}
