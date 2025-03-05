"use client"
// src/app/profil/page.tsx

import { useSession } from "next-auth/react";
import { 
  Box, 
  Typography, 
  Avatar, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Divider
} from '@mui/material';
import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  posts: Post[];
}

interface Post {
  id: string;
  caption: string;
  imageUrl: string | null;
  createdAt: string;
}

export default function MyProfile() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserProfile();
    }
  }, [session]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Načítanie...</Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Užívateľ nebol nájdený</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, pb: 6, maxWidth: 1200, mx: 'auto' }}>
      {/* Profile Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Avatar
          src={session?.user?.image || "/default-avatar.png"}
          alt={session?.user?.name || "User"}
          sx={{ 
            width: 120, 
            height: 120, 
            mx: 'auto', 
            mb: 2,
            border: '4px solid',
            borderColor: 'primary.main'
          }}
        />
        <Typography variant="h4">
          {session?.user?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {session?.user?.email}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Posts Section */}
      <Typography variant="h5" sx={{ mb: 3 }}>
        Moje Príspevky
      </Typography>

      <Grid container spacing={3}>
        {user.posts?.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 2
              }}
            >
              {post.imageUrl && (
                <CardMedia
                  component="img"
                  height="200"
                  image={post.imageUrl}
                  alt={post.caption || "Post image"}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                  {post.caption}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {(!user.posts || user.posts.length === 0) && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Zatiaľ žiadne príspevky
          </Typography>
        </Box>
      )}
    </Box>
  );
}
