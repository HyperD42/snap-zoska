import { prisma } from '@/app/api/auth/[...nextauth]/prisma';
import { Typography, Card, CardContent, CardMedia, Box, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

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
                height: 400,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto',
                cursor: 'pointer', // Indicate that the entire card is clickable
              }}
            >
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
              <CardContent sx={{ flexGrow: 1, paddingBottom: 2 }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  {post.caption}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.user.name}
                </Typography>
              </CardContent>
            </Card>
          </MuiLink>
        ))}
      </Box>
    </Box>
  );
}
