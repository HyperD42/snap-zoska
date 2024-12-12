"use client" // This ensures we can use hooks like useSession

import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link'; // Import Link for navigation

export default function Prihlasenie() {
  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "1rem" }}>
        Prihlásenie
      </Typography>
      {/* Link to Registration Page */}
      <Typography variant="body1" style={{ marginTop: "1rem" }}>
        Nemáte účet?{" "}
        <Link href="/auth/registracia" style={{ textDecoration: "none", color: "#1976d2" }}>
          Registrujte sa
        </Link>
      </Typography>

      {/* Google Login Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => signIn("google")}
        fullWidth
        style={{ marginTop: "1rem" }}
        startIcon={<GoogleIcon />} // Adds icon before the text
      >
        Prihlásiť sa pomocou Google
      </Button>

      {/* Nonfunctional GitHub Login Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {}}
        fullWidth
        style={{ marginTop: "1rem" }}
        startIcon={<GitHubIcon />} // Adds icon before the text
      >
        Prihlásiť sa pomocou GitHub
      </Button>
    </>
  );
}
