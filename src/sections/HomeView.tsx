import { Button, Container, Typography, Box, Card, CardContent, CardMedia } from "@mui/material";
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import Link from 'next/link';

const getPosts = async () => {
  const posts = await prisma.post.findMany({
    take: 3, // Ensures only 3 posts are retrieved
    include: {
      user: true,
    },
  });
  return posts;
};

export default async function HomeView() {
  const posts = await getPosts();

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" mt={5}>
        <Typography variant="h4">Vitajte na ZoškaSnap!</Typography>

        <Typography variant="h5" mt={4}>Náhodné príspevky</Typography>
        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap" mt={2}>
          {posts.map((post) => (
            <Card
              key={post.id}
              sx={{
                width: 300,
                height: 400,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {post.imageUrl && (
                <CardMedia
                  component="img"
                  height="250"
                  image={post.imageUrl}
                  alt="Post image"
                  sx={{ objectFit: "cover" }}
                />
              )}
              <CardContent sx={{ flexGrow: 1, paddingBottom: 2 }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                  {post.caption}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.user.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Typography sx={{marginTop: "1rem"}}>Registrujte sa, aby ste mohli pridať príspevky a zobraziť profil</Typography>
        <Link href="/auth/registracia" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: "10px 100px",
              marginTop: "1rem",
              borderRadius: 2,
              textTransform: "none",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            Registrujte sa
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
