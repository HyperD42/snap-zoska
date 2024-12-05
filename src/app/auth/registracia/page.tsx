"use client" // This ensures we can use hooks like useSession

import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link'; // Import Link for navigation

export default function Registracia() {
  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "1rem" }}>
        Registrácia
      </Typography>
      {/* Link to Sign-In Page */}
      <Typography variant="body1" style={{ marginTop: "1rem" }}>
        Už máte účet?{" "}
        <Link href="/auth/prihlasenie" style={{ textDecoration: "none", color: "#1976d2" }}>
          Prihláste sa
        </Link>
      </Typography>

      {/* Google Register Button */}
      <Button
        variant="outlined"
        color="primary"
        onClick={() => signIn("google")}
        fullWidth
        style={{ marginTop: "1rem" }}
        startIcon={<GoogleIcon />} // Adds icon before the text
      >
        Registrovať sa pomocou Google
      </Button>

      {/* Nonfunctional GitHub Register Button */}
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {}}
        fullWidth
        style={{ marginTop: "1rem" }}
        startIcon={<GitHubIcon />} // Adds icon before the text
      >
        Registrovať sa pomocou GitHub
      </Button>
    </>
  );
}
