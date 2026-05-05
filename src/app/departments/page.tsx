'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { getDepartments, Department } from '@/lib/api';
import styles from './page.module.scss';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error('Failed to load departments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Кафедры</h1>
            <p className={styles.subtitle}>
              Механико-математический факультет
            </p>
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>Загрузка...</div>
        ) : departments.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <h2>Кафедры не найдены</h2>
            <p>Заполните базу данных начальными данными на странице сотрудников</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {departments.map((dept) => (
              <div key={dept.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.shortName}>{dept.short_name}</div>
                  <h3 className={styles.name}>{dept.name}</h3>
                </div>
                {dept.description && (
                  <p className={styles.description}>{dept.description}</p>
                )}
                <div className={styles.cardFooter}>
                  <span className={styles.badge}>Кафедра</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
