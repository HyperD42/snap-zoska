'use client';

import { useState, useEffect, memo, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { getCommentsByPostId, deleteComment, fetchComments } from '../app/actions/comments';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Typography, 
  Avatar, 
  IconButton, 
  Divider,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  isOptimistic?: boolean;
}

interface CommentListProps {
  postId: string;
  onCommentAdded?: (comment: Comment) => void;
}

export interface CommentListRef {
  addOptimisticComment: (comment: Comment) => void;
}

// Memoize the CommentList component to prevent unnecessary re-renders
const CommentList = memo(function CommentList({ postId, onCommentAdded }: CommentListProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Use useCallback to memoize the fetchComments function
  const loadComments = useCallback(async () => {
    try {
      const fetchedComments = await fetchComments(postId);
      setComments(fetchedComments);
      setError('');
    } catch (err) {
      setError('Failed to load comments. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  // Load comments when the component mounts or postId changes
  useEffect(() => {
    loadComments();
  }, [loadComments]);

  // Handle optimistic updates when a new comment is added
  useEffect(() => {
    if (onCommentAdded) {
      const handleNewComment = (comment: Comment) => {
        setComments(prevComments => {
          // Check if the comment already exists
          const exists = prevComments.some(c => c.id === comment.id);
          if (exists) return prevComments;
          
          // Add the new comment to the beginning of the list
          return [comment, ...prevComments];
        });
      };

      // Subscribe to new comments
      onCommentAdded(handleNewComment);

      // Cleanup subscription
      return () => {
        // If there's a cleanup function provided by onCommentAdded, call it
        if (typeof onCommentAdded === 'function') {
          onCommentAdded(() => {});
        }
      };
    }
  }, [onCommentAdded]);

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (err) {
      setError('Failed to delete comment');
      console.error(err);
    }
  };

  // Function to add a new comment optimistically
  const addOptimisticComment = (newComment: Comment) => {
    // Mark the comment as optimistic
    const optimisticComment = {
      ...newComment,
      isOptimistic: true
    };
    
    // Add the optimistic comment to the beginning of the list
    setComments(prevComments => [optimisticComment, ...prevComments]);
    
    // Set a timeout to remove the optimistic comment if it's not replaced
    // This is a fallback in case the server request fails
    setTimeout(() => {
      setComments(prevComments => 
        prevComments.filter(comment => comment.id !== optimisticComment.id)
      );
    }, 10000); // 10 seconds timeout
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (comments.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
        No comments yet. Be the first to comment!
      </Typography>
    );
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {comments.map((comment) => (
        <ListItem key={comment.id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={comment.user.name || 'User'} src={comment.user.image || ''} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography component="span" variant="subtitle2" color="text.primary">
                {comment.user.name || 'Anonymous'}
              </Typography>
            }
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                  sx={{ display: 'block', mb: 0.5 }}
                >
                  {comment.content}
                </Typography>
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                >
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </Typography>
              </>
            }
          />
          {session?.user?.email && (
            <IconButton 
              size="small" 
              onClick={() => handleDeleteComment(comment.id)}
              sx={{ color: 'text.secondary' }}
              disabled={comment.isOptimistic}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </ListItem>
      ))}
    </List>
  );
});

CommentList.displayName = 'CommentList';

export default CommentList; 