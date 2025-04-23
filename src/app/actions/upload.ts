'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

// This is a simple implementation that converts the image to base64
// In a production environment, you would want to use a proper file storage service
export async function uploadImage(base64Image: string): Promise<string> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }
  
  // For now, we'll just return the base64 string
  // In a real application, you would upload this to a storage service
  // and return the URL of the uploaded image
  return base64Image;
} 