"use client"; // This ensures we can use hooks like useSession

import { useSession } from "next-auth/react"; // Import only useSession
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar'; // Import Avatar for profile picture

export default function NavBar() {
  const { data: session } = useSession(); // Get user session
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {/* Home */}
        <BottomNavigationAction label="Domov" icon={<HomeIcon />} component={Link} href="/" />

        {/* Posts */}
        <BottomNavigationAction label="Prispevky" icon={<PostAddIcon />} component={Link} href="/prispevok" />

        {/* Conditional rendering based on user session */}
        {!session ? (
          // Using an array to avoid fragment issue
          [
            <BottomNavigationAction
              key="sign-in"
              label="Prihlásenie" // Label for Sign In
              icon={<LoginIcon />} // Login icon
              component={Link} // Link to sign-in page
              href="/auth/prihlasenie"
            />,
            <BottomNavigationAction
              key="register"
              label="Registrácia" // Label for Register
              icon={<AppRegistrationIcon />} // Registration icon
              component={Link} // Link to registration page
              href="/auth/registracia"
            />,
          ]
        ) : (
          // Using an array to avoid fragment issue
          [
            <BottomNavigationAction
              key="profile"
              label="Profil" // Label for profile
              icon={<Avatar alt={session.user?.name || "User"} src={session.user?.image || "/default-avatar.png"} />}
              component={Link}
              href="/profil" // Link to profile page
            />,
            <BottomNavigationAction
              key="sign-out"
              label="Odhlásiť sa" // Label for Sign Out
              icon={<LoginIcon />} // Use Login icon for sign out
              component={Link} // Use Link for sign out
              href="/auth/odhlasenie" // Link to sign out page
            />,
          ]
        )}
      </BottomNavigation>
    </Box>
  );
}
