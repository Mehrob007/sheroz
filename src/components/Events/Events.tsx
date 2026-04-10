'use client';

import { useState } from 'react';
import EventCard, { Event } from '@/components/EventCard/EventCard';
import styles from './Events.module.scss';

const sampleEvents: Event[] = [
  {
    id: 1,
    title: 'Концерт группы "Молчат Дома"',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&h=400&fit=crop',
    date: '15 января 2025',
    time: '20:00',
    location: 'Москва, Stadium Live',
    price: 3500,
    category: 'concert',
  },
  {
    id: 2,
    title: 'Спектакль "Мастер и Маргарита"',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=400&fit=crop',
    date: '18 января 2025',
    time: '19:00',
    location: 'Москва, Большой театр',
    price: 5000,
    category: 'theatre',
  },
  {
    id: 3,
    title: 'Футбольный матч: Спартак vs ЦСКА',
    image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600&h=400&fit=crop',
    date: '20 января 2025',
    time: '18:30',
    location: 'Москва, Лужники',
    price: 1500,
    category: 'sport',
  },
  {
    id: 4,
    title: 'Фестиваль "День города"',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop',
    date: '25 января 2025',
    time: '12:00',
    location: 'Санкт-Петербург, Дворцовая площадь',
    price: 0,
    category: 'festival',
  },
  {
    id: 5,
    title: 'Концерт Basta',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    date: '28 января 2025',
    time: '19:00',
    location: 'Москва, Crocus City Hall',
    price: 4500,
    category: 'concert',
  },
  {
    id: 6,
    title: 'Хоккей: СКА vs Динамо',
    image: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=600&h=400&fit=crop',
    date: '1 февраля 2025',
    time: '19:30',
    location: 'Санкт-Петербург, Ледовый дворец',
    price: 2000,
    category: 'sport',
  },
];

const categories = [
  { id: 'all', label: 'Все мероприятия' },
  { id: 'concert', label: 'Концерты' },
  { id: 'theatre', label: 'Театр' },
  { id: 'sport', label: 'Спорт' },
  { id: 'festival', label: 'Фестивали' },
];

export default function Events() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEvents = activeFilter === 'all' 
    ? sampleEvents 
    : sampleEvents.filter(event => event.category === activeFilter);

  return (
    <section className={styles.events} id="events">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>Ближайшие мероприятия</h2>
            <p className={styles.subtitle}>Не пропустите самые яркие события</p>
          </div>
          <button className={styles.viewAllBtn}>
            Все мероприятия
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${activeFilter === cat.id ? styles.active : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
