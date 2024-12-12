"use client"

// src/views/gdpr.tsx
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

export default function GdprView() {
  const router = useRouter();

  // Handle the back navigation
  const handleBack = () => {
    // If the user came directly to this page, go to the registration page
    if (document.referrer.includes('registracia')) {
      router.push('/auth/registracia');
    } else {
      router.back();
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        GDPR
      </Typography>
      <Typography variant="body1" >
        Naša stránka rešpektuje ochranu vašich údajov. Zabezpečujeme, aby všetky osobné
        informácie boli spracované v súlade s aktuálnymi pravidlami ochrany údajov.
      </Typography>
      <Typography variant="body1" >
        Používaním našej platformy súhlasíte s tým, že vaše údaje môžeme použiť na
        zlepšenie našich služieb. Ak máte akékoľvek otázky, kontaktujte nás.
      </Typography>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ marginBottom: '1rem' }}
      >
        Späť
      </Button>
    </Container>
  );
}
