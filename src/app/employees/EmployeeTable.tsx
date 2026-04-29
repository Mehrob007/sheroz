'use client';

import Link from 'next/link';
import { Employee } from '@/lib/api';
import styles from './EmployeeTable.module.scss';

interface EmployeeTableProps {
  employees: Employee[];
}

export default function EmployeeTable({ employees }: EmployeeTableProps) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Должность</th>
            <th>Кафедра</th>
            <th>Ставка</th>
            <th>Тип занятости</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <Link href={`/employees/${employee.id}`} className={styles.nameLink}>
                  {employee.last_name} {employee.first_name} {employee.middle_name}
                </Link>
              </td>
              <td>{employee.position_name || '—'}</td>
              <td>{employee.department_name || '—'}</td>
              <td>{employee.rate} ставки</td>
              <td>
                <span className={`${styles.badge} ${styles[employee.employment_type?.replace(/\s/g, '') || 'default']}`}>
                  {employee.employment_type || '—'}
                </span>
              </td>
              <td>{employee.phone || '—'}</td>
              <td>{employee.email || '—'}</td>
              <td>
                <div className={styles.actions}>
                  <Link href={`/employees/${employee.id}`} className={styles.actionBtn}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </Link>
                  <Link href={`/employees/${employee.id}/edit`} className={styles.actionBtn}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
