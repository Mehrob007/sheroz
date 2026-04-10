import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/courses/[id] - Получить курс по ID или slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Попробуем найти по ID или по slug
    const course = await prisma.course.findFirst({
      where: {
        OR: [
          { id },
          { slug: id },
        ],
      },
      include: {
        category: true,
        lessons: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: 'Курс не найден' }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json({ error: 'Ошибка при получении курса' }, { status: 500 });
  }
}

// PUT /api/courses/[id] - Обновить курс
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const course = await prisma.course.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ error: 'Ошибка при обновлении курса' }, { status: 500 });
  }
}

// DELETE /api/courses/[id] - Удалить курс
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: 'Ошибка при удалении курса' }, { status: 500 });
  }
}
