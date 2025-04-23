'use client';

import { useState, memo, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { createComment } from '../app/actions/comments';
import { useRouter } from 'next/navigation';
import { 
  TextField, 
  Button, 
  Box, 
  CircularProgress,
  Alert
} from '@mui/material';

interface CommentFormProps {
  postId: string;
  onCommentAdded?: (comment: {
    id: string;
    content: string;
    createdAt: string;
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
  }) => void;
}

// Memoize the CommentForm component to prevent unnecessary re-renders
const CommentForm = memo(function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Use useCallback to memoize the event handlers
  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;

    setIsLoading(true);
    setError('');

    // Create optimistic comment
    const optimisticComment = {
      id: `temp-${Date.now()}`,
      content,
      createdAt: new Date().toISOString(),
      user: {
        id: session.user.id || 'temp-id',
        name: session.user.name,
        image: session.user.image
      }
    };

    // Call the callback to add the optimistic comment
    if (onCommentAdded) {
      onCommentAdded(optimisticComment);
    }

    // Clear the form immediately for better UX
    setContent('');

    try {
      // Make the actual API call
      await createComment(postId, content);
      
      // Refresh the page to ensure everything is in sync
      router.refresh();
    } catch (err) {
      setError('Failed to add comment. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [content, onCommentAdded, postId, router, session?.user?.email, session?.user?.id, session?.user?.name, session?.user?.image]);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      <TextField
        label="Add a comment"
        multiline
        rows={2}
        value={content}
        onChange={handleContentChange}
        fullWidth
        placeholder="Write a comment..."
        variant="outlined"
        required
      />

      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading || !content.trim()}
        sx={{ alignSelf: 'flex-end' }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Comment'}
      </Button>
    </Box>
  );
});

export default CommentForm; 