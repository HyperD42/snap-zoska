'use server';

import { prisma } from "../api/auth/[...nextauth]/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export async function toggleLike(postId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }

  // Get user ID
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Check if like exists
  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: user.id,
        postId: postId
      }
    }
  });

  if (existingLike) {
    // Unlike
    await prisma.like.delete({
      where: {
        userId_postId: {
          userId: user.id,
          postId: postId
        }
      }
    });
    return false; // Indicates post is now unliked
  } else {
    // Like
    await prisma.like.create({
      data: {
        userId: user.id,
        postId: postId
      }
    });
    return true; // Indicates post is now liked
  }
}

export async function getLikeCount(postId: string) {
  const count = await prisma.like.count({
    where: { postId }
  });
  return count;
}

export async function isLikedByUser(postId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  });

  if (!user) {
    return false;
  }

  const like = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: user.id,
        postId: postId
      }
    }
  });

  return !!like;
} 