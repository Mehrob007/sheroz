'use client';

import { useState } from 'react';
import styles from './Header.module.scss';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#" className={styles.logo}>
          <span className={styles.logoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5V7H17V5H15ZM7 5V7H9V5H7ZM19 9H21V11H19V9ZM3 9H5V11H3V9ZM19 13H21V15H19V13ZM3 13H5V15H3V13ZM17 17H15V19H17V17ZM9 17H7V19H9V17Z" fill="currentColor"/>
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
            </svg>
          </span>
          TicketHub
        </a>

        <nav className={styles.nav}>
          <a href="#events" className={styles.navLink}>Мероприятия</a>
          <a href="#" className={styles.navLink}>Концерты</a>
          <a href="#" className={styles.navLink}>Театр</a>
          <a href="#" className={styles.navLink}>Спорт</a>
        </nav>

        <div className={styles.actions}>
          <button className={styles.loginBtn}>Войти</button>
          <button className={styles.signupBtn}>Регистрация</button>
          
          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12H21M3 6H21M3 18H21"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
