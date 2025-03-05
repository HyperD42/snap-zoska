import { prisma } from '@/app/api/auth/[...nextauth]/prisma';
import { Typography, Card, CardContent, CardMedia, Box, Link as MuiLink, Avatar, Stack } from '@mui/material';
import Link from 'next/link';
import PostActions from '@/components/PostActions';

export const metadata = { title: 'List Prispevkov | ZoškaSnap' };

const getPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
  });
  return posts;
};

export default async function PostList() {
  const posts = await getPosts(); // Fetch the posts inside the component

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
        Príspevky
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)', // Always 1 column
          gap: 4,
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {posts.map((post) => (
          <MuiLink
            key={post.id}
            component={Link} // Use Next.js Link for routing
            href={`/prispevok/${post.id}`} // Link to dynamic post page
            underline="none" // Remove underline from the link
          >
            <Card
              sx={{
                width: '100%',
                maxWidth: 600,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto',
                cursor: 'pointer', // Indicate that the entire card is clickable
              }}
            >
              <CardContent sx={{ padding: 1.5, paddingBottom: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar
                    alt={post.user.name || "User"}
                    src={post.user.image || "/default-avatar.png"}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
                    {post.user.name}
                  </Typography>
                </Stack>
              </CardContent>
              {post.imageUrl && (
                <CardMedia
                  component="img"
                  height="250"
                  image={post.imageUrl}
                  alt="Post image"
                  sx={{
                    objectFit: 'cover',
                  }}
                />
              )}
              <CardContent sx={{ padding: 2 }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  {post.caption}
                </Typography>
                <PostActions />
              </CardContent>
            </Card>
          </MuiLink>
        ))}
      </Box>
    </Box>
  );
}
