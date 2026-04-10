import Link from 'next/link';
import styles from './CourseCard.module.scss';

interface Course {
  id: string;
  title: string;
  slug: string;
  description?: string;
  image?: string;
  level: string;
  duration: number;
  price: number;
  lessons?: { id: string }[];
}

interface CourseCardProps {
  course: Course;
}

const levelLabels: Record<string, string> = {
  beginner: 'Начинающий',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {course.image && (
          <img src={course.image} alt={course.title} className={styles.image} />
        )}
        <span className={`${styles.levelBadge} ${styles[course.level]}`}>
          {levelLabels[course.level] || course.level}
        </span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{course.title}</h3>
        {course.description && (
          <p className={styles.description}>{course.description}</p>
        )}

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {course.duration} ч.
          </span>
        </div>

        <div className={styles.footer}>
          <div className={styles.priceWrapper}>
            <span className={styles.priceLabel}>Цена</span>
            <span className={`${styles.price} ${course.price === 0 ? styles.free : ''}`}>
              {course.price === 0 ? 'Бесплатно' : `${course.price} ₽`}
            </span>
          </div>
          {course.lessons && (
            <span className={styles.lessonsCount}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              {course.lessons.length} уроков
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
