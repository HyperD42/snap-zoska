//src/app/profil/[id]/page.tsx

import { prisma } from '../../../../app/api/auth/[...nextauth]/prisma';
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
import { notFound } from 'next/navigation';

async function getUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      posts: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!user) {
    notFound();
  }

  return user;
}

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const user = await getUserProfile(params.id);

  return (
    <Box sx={{ p: 3, pb: 6, maxWidth: 1200, mx: 'auto' }}>
      {/* Profile Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Avatar
          src={user.image || "/default-avatar.png"}
          alt={user.name || "User"}
          sx={{ 
            width: 120, 
            height: 120, 
            mx: 'auto', 
            mb: 2,
            border: '4px solid',
            borderColor: 'primary.main'
          }}
        />
        <Typography variant="h4" sx={{ mb: 1 }}>
          {user.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {user.email}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Posts Section */}
      <Typography variant="h5" sx={{ mb: 3 }}>
        Príspevky
      </Typography>

      <Grid container spacing={3}>
        {user.posts.map((post) => (
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

      {user.posts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Zatiaľ žiadne príspevky
          </Typography>
        </Box>
      )}
    </Box>
  );
}
