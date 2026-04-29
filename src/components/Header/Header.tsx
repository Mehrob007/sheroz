import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>М</div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Мехмат</span>
            <span className={styles.logoSubtitle}>Учёт сотрудников</span>
          </div>
        </Link>

        <nav className={styles.nav}>
          <Link 
            href="/employees" 
            className={`${styles.navLink} ${pathname.startsWith('/employees') ? styles.active : ''}`}
          >
            Сотрудники
          </Link>
          <Link 
            href="/departments" 
            className={`${styles.navLink} ${pathname === '/departments' ? styles.active : ''}`}
          >
            Кафедры
          </Link>
        </nav>

        <div className={styles.actions}>
          <Link href="/employees/new" className={styles.addButton}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Добавить сотрудника
          </Link>
        </div>
      </div>
    </header>
  );
}
