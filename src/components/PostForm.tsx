'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { createPost } from '../app/actions/posts';
import { useRouter } from 'next/navigation';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  CircularProgress,
  Alert
} from '@mui/material';

export default function PostForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;

    setIsLoading(true);
    setError('');

    try {
      await createPost(session.user.email, imageUrl, caption);
      router.refresh();
      setImageUrl('');
      setCaption('');
    } catch (err) {
      setError('Failed to create post. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Image URL"
        type="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
        fullWidth
        placeholder="https://example.com/image.jpg"
        variant="outlined"
      />

      <TextField
        label="Caption"
        multiline
        rows={3}
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        fullWidth
        placeholder="Write a caption..."
        variant="outlined"
      />

      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        fullWidth
        sx={{ mt: 2, py: 1.5 }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Create Post'}
      </Button>
    </Box>
  );
} 