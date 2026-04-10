import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import CourseCard from '@/components/course/CourseCard';
import prisma from '@/lib/db';
import styles from './page.module.scss';

interface CoursesPageProps {
  searchParams: Promise<{
    level?: string;
    category?: string;
  }>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const { level, category } = params;

  const courses = await prisma.course.findMany({
    where: {
      isPublished: true,
      ...(level && { level }),
      ...(category && { category: { slug: category } }),
    },
    include: {
      category: true,
      lessons: { select: { id: true } },
    },
    orderBy: { order: 'asc' },
  });

  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <main>
      <Header />
      
      <section className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Каталог курсов</h1>
            <p className={styles.subtitle}>
              Выберите курс и начните обучение прямо сейчас
            </p>
          </div>

          {/* Фильтры */}
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Уровень:</span>
              <div className={styles.filterButtons}>
                <a href="/courses" className={`${styles.filterBtn} ${!level ? styles.active : ''}`}>
                  Все
                </a>
                <a href="/courses?level=beginner" className={`${styles.filterBtn} ${level === 'beginner' ? styles.active : ''}`}>
                  Начинающий
                </a>
                <a href="/courses?level=intermediate" className={`${styles.filterBtn} ${level === 'intermediate' ? styles.active : ''}`}>
                  Средний
                </a>
                <a href="/courses?level=advanced" className={`${styles.filterBtn} ${level === 'advanced' ? styles.active : ''}`}>
                  Продвинутый
                </a>
              </div>
            </div>
          </div>

          {/* Сетка курсов */}
          <div className={styles.grid}>
            {courses.length === 0 ? (
              <div className={styles.empty}>
                <p>Курсы не найдены</p>
              </div>
            ) : (
              courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
