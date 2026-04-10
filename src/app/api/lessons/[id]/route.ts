import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/lessons/[id] - Получить урок по ID или slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const lesson = await prisma.lesson.findFirst({
      where: {
        OR: [
          { id },
          { slug: id },
        ],
      },
      include: {
        course: {
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              select: {
                id: true,
                title: true,
                slug: true,
                duration: true,
                isFree: true,
                order: true,
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: 'Урок не найден' }, { status: 404 });
    }

    return NextResponse.json(lesson);
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json({ error: 'Ошибка при получении урока' }, { status: 500 });
  }
}

// PUT /api/lessons/[id] - Обновить урок
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const lesson = await prisma.lesson.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error('Error updating lesson:', error);
    return NextResponse.json({ error: 'Ошибка при обновлении урока' }, { status: 500 });
  }
}

// DELETE /api/lessons/[id] - Удалить урок
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.lesson.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    return NextResponse.json({ error: 'Ошибка при удалении урока' }, { status: 500 });
  }
}
