import Header from '@/components/Header';
import Link from 'next/link';
import styles from './page.module.scss';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Система учёта сотрудников
            <br />
            <span className={styles.highlight}>Механико-математического факультета</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Комплексное решение для управления кадровым составом факультета.
            Ведение личных дел, учёт должностей и ставок.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/employees" className={styles.primaryBtn}>
              Сотрудники
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link href="/employees/new" className={styles.secondaryBtn}>
              Добавить сотрудника
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Возможности системы</h2>
          
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Учёт сотрудников</h3>
              <p>Полная информация о каждом сотруднике: личные данные, должность, образование, документы</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <h3>Кафедры</h3>
              <p>Управление структурой факультета: кафедры, отделы, заведующие</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <h3>Должности</h3>
              <p>Категории должностей: ППС, УВП, АУП с указанием ставок</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <h3>Документы</h3>
              <p>Хранение паспортных данных, ИНН, СНИЛС и другой информации</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <h3>Поиск</h3>
              <p>Быстрый поиск сотрудников по ФИО, кафедре, должности</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Отчёты</h3>
              <p>Формирование отчётов по штатному расписанию и кадровому составу</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className={styles.tech}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Технологии</h2>
          
          <div className={styles.techGrid}>
            <div className={styles.techItem}>
              <div className={styles.techLogo}>Go</div>
              <span>Backend API</span>
            </div>
            <div className={styles.techItem}>
              <div className={styles.techLogo}>React</div>
              <span>Frontend</span>
            </div>
            <div className={styles.techItem}>
              <div className={styles.techLogo}>MongoDB</div>
              <span>Database</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>© 2025 Механико-математический факультет. Система учёта сотрудников.</p>
        </div>
      </footer>
    </main>
  );
}
