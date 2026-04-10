import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Link from 'next/link';
import prisma from '@/lib/db';
import styles from './page.module.scss';

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;

  const course = await prisma.course.findFirst({
    where: { slug },
    include: {
      category: true,
      lessons: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!course) {
    return (
      <main>
        <Header />
        <div className={styles.notFound}>
          <h1>Курс не найден</h1>
          <Link href="/courses">Вернуться к курсам</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const levelLabels: Record<string, string> = {
    beginner: 'Начинающий',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
  };

  return (
    <main>
      <Header />
      
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/courses">Курсы</Link>
            <span>/</span>
            <span>{course.title}</span>
          </div>
          
          <div className={styles.content}>
            <div className={styles.main}>
              <span className={`${styles.level} ${styles[course.level]}`}>
                {levelLabels[course.level]}
              </span>
              <h1 className={styles.title}>{course.title}</h1>
              {course.description && (
                <p className={styles.description}>{course.description}</p>
              )}
              
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {course.duration} часов
                </div>
                <div className={styles.metaItem}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  {course.lessons.length} уроков
                </div>
                {course.category && (
                  <div className={styles.metaItem}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                    </svg>
                    {course.category.name}
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.sidebar}>
              <div className={styles.priceCard}>
                <div className={styles.price}>
                  {course.price === 0 ? (
                    <span className={styles.free}>Бесплатно</span>
                  ) : (
                    <span>{course.price} ₽</span>
                  )}
                </div>
                <Link 
                  href={course.lessons[0] ? `/courses/${course.slug}/${course.lessons[0].slug}` : '#'}
                  className={styles.ctaBtn}
                >
                  Начать обучение
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.lessons}>
        <div className={styles.container}>
          <h2 className={styles.lessonsTitle}>Содержание курса</h2>
          
          <div className={styles.lessonsList}>
            {course.lessons.map((lesson, index) => (
              <Link 
                key={lesson.id}
                href={`/courses/${course.slug}/${lesson.slug}`}
                className={styles.lessonItem}
              >
                <div className={styles.lessonNumber}>{index + 1}</div>
                <div className={styles.lessonContent}>
                  <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                  {lesson.description && (
                    <p className={styles.lessonDescription}>{lesson.description}</p>
                  )}
                </div>
                <div className={styles.lessonMeta}>
                  {lesson.isFree && <span className={styles.freeBadge}>Бесплатно</span>}
                  <span className={styles.duration}>{lesson.duration} мин</span>
                </div>
              </Link>
            ))}
            
            {course.lessons.length === 0 && (
              <div className={styles.emptyLessons}>
                Уроки будут добавлены в ближайшее время
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
