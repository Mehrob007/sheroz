import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/courses - Получить все курсы
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const categoryId = searchParams.get('categoryId');

    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
        ...(level && { level }),
        ...(categoryId && { categoryId }),
      },
      include: {
        category: true,
        lessons: {
          select: { id: true },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Ошибка при получении курсов' }, { status: 500 });
  }
}

// POST /api/courses - Создать курс
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, description, image, level, duration, price, categoryId } = body;

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        description,
        image,
        level: level || 'beginner',
        duration: duration || 0,
        price: price || 0,
        categoryId,
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Ошибка при создании курса' }, { status: 500 });
  }
}
