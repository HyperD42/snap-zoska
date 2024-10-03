"use client";


import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home'; // Icon for Domov
import PersonIcon from '@mui/icons-material/Person'; // Icon for Profil
import PostAddIcon from '@mui/icons-material/PostAdd'; // Icon for Prispevky
import LoginIcon from '@mui/icons-material/Login'; // Icon for Prihlásenie
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'; // Icon for Registrácia
import Link from 'next/link';

export default function NavBar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
        <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}}>
        <BottomNavigationAction label="Domov" icon={<HomeIcon />} component={Link} href="/" />
        <BottomNavigationAction label="Profil" icon={<PersonIcon />} component={Link} href="/profil" />
        <BottomNavigationAction label="Prispevky" icon={<PostAddIcon />} component={Link} href="/prispevok" />
        <BottomNavigationAction label="Prihlásenie" icon={<LoginIcon />} component={Link} href="/auth/prihlasenie" />
        <BottomNavigationAction label="Registrácia" icon={<AppRegistrationIcon />} component={Link} href="/auth/registracia" />
      </BottomNavigation>
    </Box>
  );
}
