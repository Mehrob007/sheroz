'use client';

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
            Более 10 000 мероприятий
          </div>

          <h1 className={styles.title}>
            Покупайте билеты на лучшие{' '}
            <span className={styles.highlight}>мероприятия</span>{' '}
            вашего города
          </h1>

          <p className={styles.subtitle}>
            Концерты, театральные постановки, спортивные события и многое другое. 
            Находите интересные мероприятия и бронируйте билеты онлайн за пару кликов.
          </p>

          <div className={styles.buttons}>
            <button className={styles.primaryBtn}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21L16.65 16.65"/>
              </svg>
              Найти мероприятия
            </button>
            <button className={styles.secondaryBtn}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Как это работает
            </button>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>10K+</div>
              <div className={styles.statLabel}>Мероприятий</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>500K+</div>
              <div className={styles.statLabel}>Довольных клиентов</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Городов</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
