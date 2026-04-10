import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/categories - Получить все категории
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { courses: true },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Ошибка при получении категорий' }, { status: 500 });
  }
}
