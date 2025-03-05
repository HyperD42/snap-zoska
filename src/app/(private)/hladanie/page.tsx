'use client';

//src/app/hladanie/page.tsx

import { useState, useEffect } from 'react';
import { 
  Typography, 
  TextField, 
  Box, 
  Avatar, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfiles = async (query?: string) => {
    setIsLoading(true);
    try {
      const url = query 
        ? `/api/search?q=${encodeURIComponent(query)}`
        : '/api/search';
      const response = await fetch(url);
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length === 0) {
      fetchProfiles();
    } else if (query.length >= 2) {
      fetchProfiles(query);
    }
  };

  return (
    <Box sx={{ p: 3, pb: 6, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        Vyhladavanie
      </Typography>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Vyhľadaj používateľa..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <List>
        {profiles.map((profile: any) => (
          <Link 
            key={profile.id}
            href={`/profil/${profile.id}`}
            style={{ textDecoration: 'none' }}
          >
            <ListItem 
              sx={{
                borderRadius: 1,
                mb: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                cursor: 'pointer',
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={profile.name}
                  src={profile.image || "/default-avatar.png"}
                  sx={{ width: 48, height: 48 }}
                />
              </ListItemAvatar>
              <ListItemText 
                primary={profile.name}
                secondary={profile.email}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
}
