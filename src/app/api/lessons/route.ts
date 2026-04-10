import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/lessons - Получить все уроки
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    const lessons = await prisma.lesson.findMany({
      where: courseId ? { courseId } : undefined,
      include: {
        course: {
          select: { title: true, slug: true },
        },
      },
      orderBy: [{ courseId: 'asc' }, { order: 'asc' }],
    });

    return NextResponse.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json({ error: 'Ошибка при получении уроков' }, { status: 500 });
  }
}

// POST /api/lessons - Создать урок
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, description, content, videoUrl, duration, order, isFree, courseId } = body;

    const lesson = await prisma.lesson.create({
      data: {
        title,
        slug,
        description,
        content,
        videoUrl,
        duration: duration || 0,
        order: order || 0,
        isFree: isFree || false,
        courseId,
      },
    });

    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    console.error('Error creating lesson:', error);
    return NextResponse.json({ error: 'Ошибка при создании урока' }, { status: 500 });
  }
}
