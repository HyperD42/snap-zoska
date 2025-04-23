'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getLikeCount, isLikedByUser, toggleLike } from '../app/actions/likes';

interface LikesContextType {
  isLiked: (postId: string) => boolean;
  likeCount: (postId: string) => number;
  toggleLikeStatus: (postId: string) => Promise<void>;
  isLoading: (postId: string) => boolean;
  initializeLikeStatus: (postId: string) => Promise<void>;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

export function LikesProvider({ children }: { children: ReactNode }) {
  // Store like status and count for all posts
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [initialized, setInitialized] = useState<Record<string, boolean>>({});

  // Function to check if a post is liked
  const isLiked = (postId: string) => likes[postId] || false;

  // Function to get like count for a post
  const likeCount = (postId: string) => counts[postId] || 0;

  // Function to check if a post is loading
  const isLoading = (postId: string) => loading[postId] || false;

  // Function to toggle like status
  const toggleLikeStatus = async (postId: string) => {
    // Set loading state
    setLoading(prev => ({ ...prev, [postId]: true }));

    try {
      // Optimistically update UI
      const newIsLiked = !isLiked(postId);
      const newCount = likeCount(postId) + (newIsLiked ? 1 : -1);
      
      setLikes(prev => ({ ...prev, [postId]: newIsLiked }));
      setCounts(prev => ({ ...prev, [postId]: newCount }));

      // Make server request
      const result = await toggleLike(postId);
      
      // If server update fails, revert to previous state
      if (result !== newIsLiked) {
        setLikes(prev => ({ ...prev, [postId]: !newIsLiked }));
        setCounts(prev => ({ ...prev, [postId]: likeCount(postId) - (newIsLiked ? 1 : -1) }));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert optimistic update on error
      setLikes(prev => ({ ...prev, [postId]: !isLiked(postId) }));
      setCounts(prev => ({ ...prev, [postId]: likeCount(postId) - (isLiked(postId) ? 1 : -1) }));
    } finally {
      // Clear loading state
      setLoading(prev => ({ ...prev, [postId]: false }));
    }
  };

  // Function to initialize like status for a post
  const initializeLikeStatus = async (postId: string) => {
    if (initialized[postId]) return;
    
    try {
      const [liked, count] = await Promise.all([
        isLikedByUser(postId),
        getLikeCount(postId)
      ]);
      
      setLikes(prev => ({ ...prev, [postId]: liked }));
      setCounts(prev => ({ ...prev, [postId]: count }));
      setInitialized(prev => ({ ...prev, [postId]: true }));
    } catch (error) {
      console.error('Error initializing like status:', error);
      setInitialized(prev => ({ ...prev, [postId]: true }));
    }
  };

  return (
    <LikesContext.Provider value={{ isLiked, likeCount, toggleLikeStatus, isLoading, initializeLikeStatus }}>
      {children}
    </LikesContext.Provider>
  );
}

export function useLikes() {
  const context = useContext(LikesContext);
  if (context === undefined) {
    throw new Error('useLikes must be used within a LikesProvider');
  }
  return context;
} 