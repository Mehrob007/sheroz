import Header from '@/components/shared/Header';
import Link from 'next/link';
import prisma from '@/lib/db';
import styles from './page.module.scss';

interface LessonPageProps {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, lessonSlug } = await params;

  const lesson = await prisma.lesson.findFirst({
    where: { slug: lessonSlug },
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
    return (
      <main>
        <Header />
        <div className={styles.notFound}>
          <h1>Урок не найден</h1>
          <Link href="/courses">Вернуться к курсам</Link>
        </div>
      </main>
    );
  }

  const currentIndex = lesson.course.lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? lesson.course.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lesson.course.lessons.length - 1 ? lesson.course.lessons[currentIndex + 1] : null;

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.layout}>
        {/* Сайдбар с уроками */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <Link href={`/courses/${slug}`} className={styles.backLink}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              {lesson.course.title}
            </Link>
          </div>
          
          <div className={styles.lessonsList}>
            {lesson.course.lessons.map((l, index) => (
              <Link
                key={l.id}
                href={`/courses/${slug}/${l.slug}`}
                className={`${styles.lessonItem} ${l.id === lesson.id ? styles.active : ''}`}
              >
                <span className={styles.lessonNumber}>{index + 1}</span>
                <span className={styles.lessonTitle}>{l.title}</span>
              </Link>
            ))}
          </div>
        </aside>

        {/* Контент урока */}
        <div className={styles.content}>
          <div className={styles.breadcrumb}>
            <Link href="/courses">Курсы</Link>
            <span>/</span>
            <Link href={`/courses/${slug}`}>{lesson.course.title}</Link>
            <span>/</span>
            <span>{lesson.title}</span>
          </div>

          <article className={styles.article}>
            <h1 className={styles.title}>{lesson.title}</h1>
            
            {lesson.description && (
              <p className={styles.description}>{lesson.description}</p>
            )}

            {lesson.videoUrl && (
              <div className={styles.videoWrapper}>
                <iframe
                  src={lesson.videoUrl}
                  className={styles.video}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <div 
              className={styles.body}
              dangerouslySetInnerHTML={{ 
                __html: lesson.content
                  ?.replace(/^# .+$/gm, (match: string) => `<h1>${match.slice(2)}</h1>`)
                  .replace(/^## .+$/gm, (match: string) => `<h2>${match.slice(3)}</h2>`)
                  .replace(/^### .+$/gm, (match: string) => `<h3>${match.slice(4)}</h3>`)
                  .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
                  .replace(/`([^`]+)`/g, '<code>$1</code>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/^(.+)$/gm, '<p>$1</p>')
                  .replace(/<p><\/p>/g, '')
                  .replace(/<p>(<h[123]>)/g, '$1')
                  .replace(/(<\/h[123]>)<\/p>/g, '$1')
                  .replace(/<p>(<pre>)/g, '$1')
                  .replace(/(<\/pre>)<\/p>/g, '$1') || ''
              }}
            />

            {/* Навигация между уроками */}
            <div className={styles.navigation}>
              {prevLesson && (
                <Link 
                  href={`/courses/${slug}/${prevLesson.slug}`}
                  className={styles.navBtn}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  <div>
                    <span className={styles.navLabel}>Предыдущий урок</span>
                    <span className={styles.navTitle}>{prevLesson.title}</span>
                  </div>
                </Link>
              )}
              
              {nextLesson && (
                <Link 
                  href={`/courses/${slug}/${nextLesson.slug}`}
                  className={`${styles.navBtn} ${styles.next}`}
                >
                  <div>
                    <span className={styles.navLabel}>Следующий урок</span>
                    <span className={styles.navTitle}>{nextLesson.title}</span>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              )}
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
