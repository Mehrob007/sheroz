import Link from 'next/link';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundElements}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.textContent}>
          <div className={styles.badge}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            Онлайн-школа фронтенд-разработки
          </div>

          <h1 className={styles.title}>
            Станьте{' '}
            <span className={styles.highlight}>фронтенд-разработчиком</span>{' '}
            с нуля за 6 месяцев
          </h1>

          <p className={styles.subtitle}>
            Практические курсы по HTML, CSS, JavaScript, React и Next.js. 
            Реальные проекты, менторство и трудоустройство.
          </p>

          <div className={styles.buttons}>
            <Link href="/courses" className={styles.primaryBtn}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              Начать обучение
            </Link>
            <Link href="/courses" className={styles.secondaryBtn}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Смотреть курсы
            </Link>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Курсов</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>10K+</div>
              <div className={styles.statLabel}>Студентов</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>95%</div>
              <div className={styles.statLabel}>Трудоустроены</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
