"use client"; // This ensures we can use hooks like useSession

import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link"; // Import Link for navigation
import { useState } from "react"; // Import useState for managing state
import Alert from "@mui/material/Alert"; // Material UI Alert component

export default function Registracia() {
  const [agreed, setAgreed] = useState(false); // State to track agreement
  const [showAlert, setShowAlert] = useState(false); // State to show/hide alert

  const handleRegisterGoogle = () => {
    if (!agreed) {
      setShowAlert(true); // Show alert if checkbox is not checked
    } else {
      setShowAlert(false); // Hide alert if checkbox is checked
      signIn("google"); // Proceed with Google sign-in
    }
  };

  const handleRegisterGitHub = () => {
    if (!agreed) {
      setShowAlert(true); // Show alert if checkbox is not checked
    } else {
      setShowAlert(false); // Hide alert if checkbox is checked
      // Add your GitHub sign-in logic here if needed
      console.log("GitHub registration successful");
    }
  };

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

      {/* Terms and Conditions Checkbox */}
      <div style={{ marginTop: "1rem" }}>
        <label>
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)} // Toggle agreement state
            style={{ marginRight: "0.5rem" }}
          />
          Súhlasím s{" "}
          <Link href="/gdpr" style={{ color: "#1976d2" }}>
            GDPR
          </Link>{" "}
          a{" "}
          <Link href="/podmienky" style={{ color: "#1976d2" }}>
            Podmienkami
          </Link>
        </label>
      </div>

      {/* Alert for not agreeing */}
      {showAlert && (
        <Alert severity="error" style={{ marginTop: "1rem", textAlign: "center" }}>
          Musíte súhlasiť s GDPR a Podmienkami, aby ste mohli pokračovať.
        </Alert>
      )}

      {/* Google Register Button */}
      <Button
        variant="outlined"
        onClick={handleRegisterGoogle} // Calls the conditional handler
        fullWidth
        style={{ marginTop: "1rem" }}
        startIcon={<GoogleIcon />}
      >
        Registrovať sa pomocou Google
      </Button>

      {/* Nonfunctional GitHub Register Button */}
      <Button
        variant="outlined"
        onClick={handleRegisterGitHub} // Calls the conditional handler
        fullWidth
        style={{ marginTop: "1rem" }}
        startIcon={<GitHubIcon />}
      >
        Registrovať sa pomocou GitHub
      </Button>
    </>
  );
}
