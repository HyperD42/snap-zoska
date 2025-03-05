"use client";

//src/app/hladanie/page.tsx

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";

interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
}

export default function SearchPage() {
  const { status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/prihlasenie");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsSearching(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, pb: 10 }}>
      <Typography variant="h4" gutterBottom>
        Hľadanie
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Hľadať používateľov..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />
      {isSearching ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {users.map((user) => (
            <ListItem
              key={user.id}
              component={MuiLink}
              href={`/profil/${user.id}`}
              sx={{
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={user.name || "User"}
                  src={user.image || "/default-avatar.png"}
                />
              </ListItemAvatar>
              <ListItemText
                primary={user.name || "Unnamed User"}
                secondary={user.email}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
