// sections/HomeView.tsx

import { Button, Container, Link } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function HomeView() {
  return (
    <Container>
      <Typography variant="h4">Vitajte na ZoškaSnap!</Typography>
      <Typography>Registrujte sa, aby ste mohli pridať príspevky a zobraziť profil</Typography>
      <Link href="/auth/registracia" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            display: 'block',
            padding: '10px 100px',
            marginTop: '1rem',
            borderRadius: 2,
            textTransform: 'none',
            textAlign: 'center',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Registrujťe sa
        </Button>
      </Link>
    </Container>
  );
}
