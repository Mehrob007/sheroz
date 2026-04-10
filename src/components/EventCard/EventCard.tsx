'use client';

import styles from './EventCard.module.scss';

export interface Event {
  id: number;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  price: number;
  category: 'concert' | 'theatre' | 'sport' | 'festival';
}

interface EventCardProps {
  event: Event;
}

const categoryLabels: Record<string, string> = {
  concert: 'Концерт',
  theatre: 'Театр',
  sport: 'Спорт',
  festival: 'Фестиваль',
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={event.image} alt={event.title} className={styles.image} />
        <span className={`${styles.categoryBadge} ${styles[event.category]}`}>
          {categoryLabels[event.category]}
        </span>
        <button className={styles.favoriteBtn}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.date}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {event.date} • {event.time}
        </div>

        <h3 className={styles.title}>{event.title}</h3>

        <div className={styles.location}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {event.location}
        </div>

        <div className={styles.footer}>
          <div className={styles.priceWrapper}>
            <span className={styles.priceLabel}>от</span>
            <span className={styles.price}>{event.price.toLocaleString()} ₽</span>
          </div>
          <button className={styles.buyBtn}>
            Купить
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
