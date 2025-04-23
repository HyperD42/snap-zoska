import { NextResponse } from 'next/server';
import { prisma } from '../../api/auth/[...nextauth]/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  try {
    const profiles = await prisma.user.findMany({
      where: query ? {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ],
      } : undefined,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
      take: query ? 10 : 50, // Limit search results to 10, but show up to 50 for all users
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(profiles);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 });
  }
} 