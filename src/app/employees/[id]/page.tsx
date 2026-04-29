import Header from '@/components/Header';
import { getEmployee } from '@/lib/api';
import Link from 'next/link';
import styles from './page.module.scss';

interface EmployeePageProps {
  params: Promise<{ id: string }>;
}

export default async function EmployeePage({ params }: EmployeePageProps) {
  const { id } = await params;
  const employee = await getEmployee(id).catch(() => null);

  if (!employee) {
    return (
      <main className={styles.main}>
        <Header />
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h1>Сотрудник не найден</h1>
            <Link href="/employees">Вернуться к списку</Link>
          </div>
        </div>
      </main>
    );
  }

  const fullName = `${employee.last_name} ${employee.first_name} ${employee.middle_name}`;

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/employees">Сотрудники</Link>
          <span>/</span>
          <span>{fullName}</span>
        </nav>

        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.avatar}>
              {employee.first_name[0]}{employee.last_name[0]}
            </div>
            <h1 className={styles.name}>{fullName}</h1>
            <p className={styles.position}>{employee.position_name || 'Должность не указана'}</p>
            <p className={styles.department}>{employee.department_name || 'Кафедра не указана'}</p>
            
            <div className={styles.badges}>
              <span className={styles.badge}>{employee.employment_type || 'штатный'}</span>
              <span className={styles.badge}>{employee.rate} ставки</span>
            </div>

            <div className={styles.contacts}>
              {employee.phone && (
                <div className={styles.contactItem}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <a href={`tel:${employee.phone}`}>{employee.phone}</a>
                </div>
              )}
              {employee.email && (
                <div className={styles.contactItem}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <a href={`mailto:${employee.email}`}>{employee.email}</a>
                </div>
              )}
            </div>
          </aside>

          {/* Content */}
          <div className={styles.content}>
            {/* Личные данные */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Личные данные</h2>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <span className={styles.label}>Дата рождения</span>
                  <span className={styles.value}>{employee.birth_date || '—'}</span>
                </div>
                <div className={styles.field}>
                  <span className={styles.label}>Пол</span>
                  <span className={styles.value}>{employee.gender || '—'}</span>
                </div>
                <div className={styles.field}>
                  <span className={styles.label}>Адрес</span>
                  <span className={styles.value}>{employee.address || '—'}</span>
                </div>
              </div>
            </section>

            {/* Трудовые данные */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Трудовые данные</h2>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <span className={styles.label}>Образование</span>
                  <span className={styles.value}>{employee.education || '—'}</span>
                </div>
                <div className={styles.field}>
                  <span className={styles.label}>Учёная степень</span>
                  <span className={styles.value}>{employee.degree || '—'}</span>
                </div>
                <div className={styles.field}>
                  <span className={styles.label}>Звание</span>
                  <span className={styles.value}>{employee.rank || '—'}</span>
                </div>
                <div className={styles.field}>
                  <span className={styles.label}>Дата приёма</span>
                  <span className={styles.value}>{employee.hire_date || '—'}</span>
                </div>
              </div>
            </section>

            {/* Документы */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Документы</h2>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <span className={styles.label}>Паспорт</span>
                  <span className={styles.value}>
                    {employee.passport_series && employee.passport_number
                      ? `${employee.passport_series} ${employee.passport_number}`
                      : '—'}
                  </span>
                </div>
                <div className={styles.field}>
                  <span className={styles.label}>ИНН</span>
                  <span className={styles.value}>{employee.inn || '—'}</span>
                </div>
                <div className={styles.field}>
                  <span className={styles.label}>СНИЛС</span>
                  <span className={styles.value}>{employee.snils || '—'}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
