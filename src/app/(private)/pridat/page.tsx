//src/app/pridat/page.tsx
import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import PostForm from '../../../components/PostForm';
import { ThemeModeProvider } from '../../../components/ThemeProvider';

export const metadata = { title: 'Pridať príspevok | ZoškaSnap' };

export default function AddPostPage() {
  return (
    <ThemeModeProvider>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Pridať nový príspevok
          </Typography>
          <PostForm />
        </Paper>
      </Container>
    </ThemeModeProvider>
  );
}
