'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </span>
          FrontendSchool
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>
            Главная
          </Link>
          <Link href="/courses" className={`${styles.navLink} ${pathname.startsWith('/courses') ? styles.active : ''}`}>
            Курсы
          </Link>
          <Link href="/admin" className={`${styles.navLink} ${pathname.startsWith('/admin') ? styles.active : ''}`}>
            Админка
          </Link>
        </nav>

        <div className={styles.actions}>
          <button className={styles.loginBtn}>Войти</button>
          <button className={styles.signupBtn}>Регистрация</button>
        </div>
      </div>
    </header>
  );
}
