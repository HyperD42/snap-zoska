'use client';

import { IconButton, Stack } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function PostActions() {
  return (
    <Stack direction="row" spacing={1} sx={{ mt: 1, justifyContent: 'space-between' }}>
      <Stack direction="row" spacing={1}>
        <IconButton size="small" onClick={(e) => e.preventDefault()}>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton size="small" onClick={(e) => e.preventDefault()}>
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
  );
} 