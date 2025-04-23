'use server';

import { prisma } from "../api/auth/[...nextauth]/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export async function createComment(postId: string, content: string) {
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

  // Create comment
  const comment = await prisma.comment.create({
    data: {
      content,
      userId: user.id,
      postId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  });

  return comment;
}

export async function getCommentsByPostId(postId: string) {
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return comments;
}

export async function deleteComment(commentId: string) {
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

  // Check if comment exists and belongs to user
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { userId: true }
  });

  if (!comment) {
    throw new Error('Comment not found');
  }

  if (comment.userId !== user.id) {
    throw new Error('Not authorized to delete this comment');
  }

  // Delete comment
  await prisma.comment.delete({
    where: { id: commentId }
  });
} 