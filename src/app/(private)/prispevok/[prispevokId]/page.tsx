import { prisma } from '@/app/api/auth/[...nextauth]/prisma';
import { Typography, Box, CardMedia, Button, Container } from '@mui/material';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PostProps {
  params: {
    prispevokId: string;
  };
}

const getPostById = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: { user: true }, // Include user data with the post
  });

  if (!post) {
    return null;
  }

  return post;
};

export default async function PostDetail({ params }: PostProps) {
  const post = await getPostById(params.prispevokId);

  if (!post) {
    notFound(); // If the post doesn't exist, show a 404 page
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString(); // Format createdAt

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Box sx={{ padding: 4, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h3" sx={{ marginBottom: 2, fontWeight: 'bold', textAlign: 'center' }}>
          {post.caption || 'No Caption'} {/* Display the caption or fallback to 'No Caption' */}
        </Typography>

        {post.imageUrl && (
          <CardMedia
            component="img"
            height="400"
            image={post.imageUrl}
            alt="Post image"
            sx={{
              objectFit: 'cover',
              borderRadius: 2,
              marginBottom: 3,
            }}
          />
        )}

        <Typography variant="h5" sx={{ marginBottom: 1, fontWeight: 'bold' }}>
          {post.caption || 'No Caption'} {/* Display the caption or fallback to 'No Caption' */}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 2 }}>
          <strong>Posted by:</strong> {post.user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 3 }}>
          <strong>Posted on:</strong> {formattedDate}
        </Typography>

        {/* Using Link for client-side navigation */}
        <Link href="/" passHref style={{ textDecoration: 'none' }}> {/* Remove underline from the link */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              display: 'block',
              width: '100%',
              padding: '10px 0',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: 2,
              textTransform: 'none',
              textAlign: 'center',
              '&:hover': {
                backgroundColor: 'primary.dark', // Hover effect
              },
            }}
          >
            Back to Post List
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
