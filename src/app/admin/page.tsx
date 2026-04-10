import Header from '@/components/shared/Header';
import Link from 'next/link';
import prisma from '@/lib/db';
import styles from './page.module.scss';

export default async function AdminPage() {
  const courses = await prisma.course.findMany({
    include: {
      category: true,
      lessons: { select: { id: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const lessons = await prisma.lesson.findMany({
    include: {
      course: { select: { title: true, slug: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Админ-панель</h1>
          <p className={styles.subtitle}>Управление курсами и уроками</p>
        </div>

        {/* Статистика */}
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>{courses.length}</span>
              <span className={styles.statLabel}>Курсов</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>{lessons.length}</span>
              <span className={styles.statLabel}>Уроков</span>
            </div>
          </div>
        </div>

        {/* Курсы */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Курсы</h2>
            <Link href="/admin/courses/new" className={styles.addBtn}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Добавить курс
            </Link>
          </div>

          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div className={styles.tableCell}>Название</div>
              <div className={styles.tableCell}>Уровень</div>
              <div className={styles.tableCell}>Уроков</div>
              <div className={styles.tableCell}>Цена</div>
              <div className={styles.tableCell}>Статус</div>
              <div className={styles.tableCell}>Действия</div>
            </div>
            
            {courses.map((course) => (
              <div key={course.id} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  <span className={styles.courseTitle}>{course.title}</span>
                </div>
                <div className={styles.tableCell}>
                  <span className={`${styles.badge} ${styles[course.level]}`}>
                    {course.level === 'beginner' ? 'Начинающий' : 
                     course.level === 'intermediate' ? 'Средний' : 'Продвинутый'}
                  </span>
                </div>
                <div className={styles.tableCell}>{course.lessons.length}</div>
                <div className={styles.tableCell}>
                  {course.price === 0 ? 'Бесплатно' : `${course.price} ₽`}
                </div>
                <div className={styles.tableCell}>
                  <span className={`${styles.status} ${course.isPublished ? styles.published : styles.draft}`}>
                    {course.isPublished ? 'Опубликован' : 'Черновик'}
                  </span>
                </div>
                <div className={styles.tableCell}>
                  <div className={styles.actions}>
                    <Link href={`/courses/${course.slug}`} className={styles.actionBtn}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </Link>
                    <Link href={`/admin/courses/${course.id}/edit`} className={styles.actionBtn}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </Link>
                    <form action={`/api/courses/${course.id}`} method="POST">
                      <button type="submit" className={`${styles.actionBtn} ${styles.delete}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Уроки */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Последние уроки</h2>
            <Link href="/admin/lessons/new" className={styles.addBtn}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Добавить урок
            </Link>
          </div>

          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div className={styles.tableCell}>Название</div>
              <div className={styles.tableCell}>Курс</div>
              <div className={styles.tableCell}>Длительность</div>
              <div className={styles.tableCell}>Действия</div>
            </div>
            
            {lessons.map((lesson) => (
              <div key={lesson.id} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  <span className={styles.lessonTitle}>{lesson.title}</span>
                </div>
                <div className={styles.tableCell}>{lesson.course.title}</div>
                <div className={styles.tableCell}>{lesson.duration} мин</div>
                <div className={styles.tableCell}>
                  <div className={styles.actions}>
                    <Link href={`/courses/${lesson.course.slug}/${lesson.slug}`} className={styles.actionBtn}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </Link>
                    <Link href={`/admin/lessons/${lesson.id}/edit`} className={styles.actionBtn}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Инициализация данных */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Инициализация</h2>
          <p className={styles.sectionDescription}>
            Заполнить базу данных демо-данными для тестирования
          </p>
          <form action="/api/seed" method="POST">
            <button type="submit" className={styles.seedBtn}>
              Заполнить демо-данными
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
