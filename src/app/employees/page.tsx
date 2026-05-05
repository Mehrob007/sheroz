'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import EmployeeTable from './EmployeeTable';
import { getEmployees, Employee, seedData } from '@/lib/api';
import styles from './page.module.scss';
import Link from 'next/link';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Failed to load employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    await seedData();
    await loadEmployees();
  };

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
          <div className={styles.actions}>
            <button onClick={handleSeed} className={styles.seedBtn}>
              Сбросить и заполнить
            </button>
            <Link href="/employees/new" className={styles.addBtn}>
              Добавить сотрудника
            </Link>
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>Загрузка...</div>
        ) : employees.length === 0 ? (
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
            <button onClick={handleSeed} className={styles.primaryBtn}>
              Заполнить базу данных
            </button>
          </div>
        ) : (
          <EmployeeTable employees={employees} />
        )}
      </div>
    </main>
  );
}
