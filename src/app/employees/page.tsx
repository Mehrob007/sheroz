import Header from '@/components/Header';
import EmployeeTable from './EmployeeTable';
import { getEmployees } from '@/lib/api';
import styles from './page.module.scss';

export default async function EmployeesPage() {
  const employees = await getEmployees().catch(() => []);

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Сотрудники</h1>
            <p className={styles.subtitle}>
              Механико-математический факультет
            </p>
          </div>
        </div>

        {employees.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h2>Сотрудники не найдены</h2>
            <p>Добавьте первого сотрудника или заполните базу начальными данными</p>
          </div>
        ) : (
          <EmployeeTable employees={employees} />
        )}
      </div>
    </main>
  );
}
