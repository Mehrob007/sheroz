import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// API для заполнения базы данных демо-данными
export async function POST() {
  try {
    // Создаем категории
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { slug: 'html-css' },
        update: {},
        create: {
          name: 'HTML & CSS',
          slug: 'html-css',
          description: 'Основы веб-разработки',
          order: 1,
        },
      }),
      prisma.category.upsert({
        where: { slug: 'javascript' },
        update: {},
        create: {
          name: 'JavaScript',
          slug: 'javascript',
          description: 'Язык программирования для веб',
          order: 2,
        },
      }),
      prisma.category.upsert({
        where: { slug: 'react' },
        update: {},
        create: {
          name: 'React',
          slug: 'react',
          description: 'Библиотека для создания UI',
          order: 3,
        },
      }),
      prisma.category.upsert({
        where: { slug: 'nextjs' },
        update: {},
        create: {
          name: 'Next.js',
          slug: 'nextjs',
          description: 'React фреймворк для продакшена',
          order: 4,
        },
      }),
    ]);

    // Создаем курсы
    const courses = await Promise.all([
      prisma.course.upsert({
        where: { slug: 'html-css-basics' },
        update: {},
        create: {
          title: 'HTML & CSS с нуля',
          slug: 'html-css-basics',
          description: 'Изучите основы HTML и CSS, создавайте красивые веб-страницы с нуля. Подходит для начинающих.',
          level: 'beginner',
          duration: 20,
          price: 0,
          isPublished: true,
          order: 1,
          categoryId: categories[0].id,
        },
      }),
      prisma.course.upsert({
        where: { slug: 'javascript-basics' },
        update: {},
        create: {
          title: 'JavaScript для начинающих',
          slug: 'javascript-basics',
          description: 'Освойте основы JavaScript: переменные, функции, массивы, объекты и DOM манипуляции.',
          level: 'beginner',
          duration: 30,
          price: 2990,
          isPublished: true,
          order: 2,
          categoryId: categories[1].id,
        },
      }),
      prisma.course.upsert({
        where: { slug: 'react-fundamentals' },
        update: {},
        create: {
          title: 'React: Основы',
          slug: 'react-fundamentals',
          description: 'Изучите React с нуля: компоненты, props, state, hooks и создание SPA приложений.',
          level: 'intermediate',
          duration: 40,
          price: 4990,
          isPublished: true,
          order: 3,
          categoryId: categories[2].id,
        },
      }),
      prisma.course.upsert({
        where: { slug: 'nextjs-complete' },
        update: {},
        create: {
          title: 'Next.js: Полный курс',
          slug: 'nextjs-complete',
          description: 'Полный курс по Next.js: SSR, SSG, API Routes, аутентификация и деплой.',
          level: 'advanced',
          duration: 50,
          price: 6990,
          isPublished: true,
          order: 4,
          categoryId: categories[3].id,
        },
      }),
    ]);

    // Создаем уроки для первого курса
    const htmlCourse = courses[0];
    await Promise.all([
      prisma.lesson.upsert({
        where: { slug: 'html-intro' },
        update: {},
        create: {
          title: 'Введение в HTML',
          slug: 'html-intro',
          description: 'Что такое HTML и как он работает',
          content: `# Введение в HTML

HTML (HyperText Markup Language) — это язык разметки для создания веб-страниц.

## Что вы узнаете в этом уроке:
- Что такое HTML
- Структура HTML документа
- Основные теги

## Структура HTML документа

\`\`\`html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Моя страница</title>
</head>
<body>
    <h1>Привет, мир!</h1>
    <p>Это мой первый HTML документ.</p>
</body>
</html>
\`\`\`

## Основные теги

- \`<h1>\` - \`<h6>\` — заголовки
- \`<p>\` — параграф
- \`<a>\` — ссылка
- \`<img>\` — изображение
- \`<div>\` — контейнер

## Практическое задание

Создайте HTML страницу с заголовком, двумя параграфами текста и ссылкой.`,
          duration: 15,
          order: 1,
          isFree: true,
          courseId: htmlCourse.id,
        },
      }),
      prisma.lesson.upsert({
        where: { slug: 'html-tags' },
        update: {},
        create: {
          title: 'Основные HTML теги',
          slug: 'html-tags',
          description: 'Изучаем основные HTML теги для создания структуры страницы',
          content: `# Основные HTML теги

В этом уроке мы подробно рассмотрим основные HTML теги.

## Заголовки

HTML предлагает шесть уровней заголовков: \`<h1>\` — \`<h6>\`.

\`\`\`html
<h1>Заголовок 1 уровня</h1>
<h2>Заголовок 2 уровня</h2>
<h3>Заголовок 3 уровня</h3>
\`\`\`

## Списки

### Нумерованный список
\`\`\`html
<ol>
    <li>Первый пункт</li>
    <li>Второй пункт</li>
</ol>
\`\`\`

### Маркированный список
\`\`\`html
<ul>
    <li>Первый пункт</li>
    <li>Второй пункт</li>
</ul>
\`\`\``,
          duration: 20,
          order: 2,
          isFree: true,
          courseId: htmlCourse.id,
        },
      }),
      prisma.lesson.upsert({
        where: { slug: 'css-intro' },
        update: {},
        create: {
          title: 'Введение в CSS',
          slug: 'css-intro',
          description: 'Знакомство с CSS и способами подключения стилей',
          content: `# Введение в CSS

CSS (Cascading Style Sheets) — язык описания внешнего вида документа.

## Способы подключения CSS

### 1. Inline стили
\`\`\`html
<p style="color: red;">Красный текст</p>
\`\`\`

### 2. Внутренние стили
\`\`\`html
<head>
    <style>
        p { color: red; }
    </style>
</head>
\`\`\`

### 3. Внешний файл (рекомендуется)
\`\`\`html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
\`\`\``,
          duration: 25,
          order: 3,
          isFree: false,
          courseId: htmlCourse.id,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Демо-данные успешно созданы',
      categories: categories.length,
      courses: courses.length,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ error: 'Ошибка при заполнении базы данных' }, { status: 500 });
  }
}
