'use client';

import { IconButton, Stack, Typography, Collapse } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useRef, memo, useCallback, useEffect } from 'react';
import { useLikes } from '../context/LikesContext';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface PostActionsProps {
  postId: string;
}

// Memoize the PostActions component to prevent unnecessary re-renders
const PostActions = memo(function PostActions({ postId }: PostActionsProps) {
  const { isLiked, likeCount, toggleLikeStatus, isLoading, initializeLikeStatus } = useLikes();
  const [showComments, setShowComments] = useState(false);
  const liked = isLiked(postId);
  const count = likeCount(postId);
  const pending = isLoading(postId);
  const commentListRef = useRef<{ addOptimisticComment: (comment: any) => void } | null>(null);

  // Initialize like status when component mounts
  useEffect(() => {
    initializeLikeStatus(postId);
  }, [postId, initializeLikeStatus]);

  // Use useCallback to memoize the event handlers
  const handleLikeClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (pending) return;
    
    toggleLikeStatus(postId);
  }, [postId, pending, toggleLikeStatus]);

  const handleCommentClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowComments(!showComments);
  }, [showComments]);

  const handleCommentAdded = useCallback((comment: any) => {
    if (commentListRef.current) {
      commentListRef.current.addOptimisticComment(comment);
    }
  }, []);

  // Only render the CommentForm and CommentList when comments are shown
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} sx={{ mt: 1, justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton 
            size="small" 
            onClick={handleLikeClick}
            disabled={pending}
            color={liked ? 'error' : 'default'}
            sx={{
              transition: 'transform 0.2s',
              '&:active': {
                transform: 'scale(0.9)',
              },
            }}
          >
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {count}
          </Typography>
          <IconButton 
            size="small" 
            onClick={handleCommentClick}
            color={showComments ? 'primary' : 'default'}
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton size="small" onClick={(e) => e.preventDefault()}>
            <ShareIcon />
          </IconButton>
        </Stack>
        <IconButton size="small" onClick={(e) => e.preventDefault()}>
          <BookmarkBorderIcon />
        </IconButton>
      </Stack>

      <Collapse in={showComments}>
        {showComments && (
          <Stack spacing={2} sx={{ mt: 2 }}>
            <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
            <CommentList 
              postId={postId} 
              ref={commentListRef}
            />
          </Stack>
        )}
      </Collapse>
    </Stack>
  );
});

export default PostActions; 