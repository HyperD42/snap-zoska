"use client"

// src/views/podmienky.tsx
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

export default function PodmienkyView() {
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
        Podmienky používania
      </Typography>
      <Typography variant="body1" >
        Vítame vás na ZoškaSnap! Používaním našej platformy súhlasíte s nasledujúcimi
        podmienkami. Prečítajte si ich pozorne.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Zmeny podmienok
      </Typography>
      <Typography variant="body1" >
        Vyhradzujeme si právo na zmenu týchto podmienok bez predchádzajúceho upozornenia.
        Aktuálne podmienky budú vždy dostupné na tejto stránke.
      </Typography>
      <Button
        variant="outlined"
        color='secondary'
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ marginBottom: '1rem' }}
      >
        Späť
      </Button>
    </Container>
  );
}
