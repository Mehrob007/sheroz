'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { getEmployee, updateEmployee, getDepartments, getPositions, Department, Position } from '@/lib/api';
import styles from './page.module.scss';

interface EditEmployeePageProps {
  params: Promise<{ id: string }>;
}

export default function EditEmployeePage({ params }: EditEmployeePageProps) {
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [formData, setFormData] = useState({
    last_name: '',
    first_name: '',
    middle_name: '',
    birth_date: '',
    gender: 'Мужской',
    phone: '',
    email: '',
    address: '',
    position_id: '',
    department_id: '',
    employment_type: 'штатный',
    rate: 1,
    hire_date: '',
    education: 'высшее',
    degree: '',
    rank: '',
    passport_series: '',
    passport_number: '',
    inn: '',
    snils: '',
  });

  useEffect(() => {
    params.then(p => {
      setEmployeeId(p.id);
      loadData(p.id);
    });
  }, [params]);

  const loadData = async (id: string) => {
    try {
      const [employee, depts, pos] = await Promise.all([
        getEmployee(id),
        getDepartments().catch(() => []),
        getPositions().catch(() => []),
      ]);

      setDepartments(depts);
      setPositions(pos);
      setFormData({
        last_name: employee.last_name || '',
        first_name: employee.first_name || '',
        middle_name: employee.middle_name || '',
        birth_date: employee.birth_date || '',
        gender: employee.gender || 'Мужской',
        phone: employee.phone || '',
        email: employee.email || '',
        address: employee.address || '',
        position_id: employee.position_id || '',
        department_id: employee.department_id || '',
        employment_type: employee.employment_type || 'штатный',
        rate: employee.rate || 1,
        hire_date: employee.hire_date || '',
        education: employee.education || 'высшее',
        degree: employee.degree || '',
        rank: employee.rank || '',
        passport_series: employee.passport_series || '',
        passport_number: employee.passport_number || '',
        inn: employee.inn || '',
        snils: employee.snils || '',
      });
    } catch (error) {
      console.error('Error loading employee:', error);
      alert('Ошибка при загрузке данных сотрудника');
      router.push('/employees');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateEmployee(employeeId, formData);
      router.push(`/employees/${employeeId}`);
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Ошибка при обновлении сотрудника');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className={styles.main}>
        <Header />
        <div className={styles.container}>
          <div className={styles.loading}>Загрузка...</div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.container}>
        <h1 className={styles.title}>Редактирование сотрудника</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Личные данные */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Личные данные</h2>
            
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Фамилия *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Имя *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Отчество *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.middle_name}
                  onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Дата рождения</label>
                <input
                  type="date"
                  className={styles.input}
                  value={formData.birth_date}
                  onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Пол</label>
                <select
                  className={styles.select}
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="Мужской">Мужской</option>
                  <option value="Женский">Женский</option>
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Телефон</label>
                <input
                  type="tel"
                  className={styles.input}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (999) 999-99-99"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  className={styles.input}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Адрес</label>
              <input
                type="text"
                className={styles.input}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </section>

          {/* Трудовые данные */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Трудовые данные</h2>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Кафедра</label>
                <select
                  className={styles.select}
                  value={formData.department_id}
                  onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                >
                  <option value="">Выберите кафедру</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Должность</label>
                <select
                  className={styles.select}
                  value={formData.position_id}
                  onChange={(e) => setFormData({ ...formData, position_id: e.target.value })}
                >
                  <option value="">Выберите должность</option>
                  {positions.map((pos) => (
                    <option key={pos.id} value={pos.id}>
                      {pos.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Тип занятости</label>
                <select
                  className={styles.select}
                  value={formData.employment_type}
                  onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                >
                  <option value="штатный">Штатный</option>
                  <option value="совместитель">Совместитель</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Ставка</label>
                <select
                  className={styles.select}
                  value={formData.rate}
                  onChange={(e) => setFormData({ ...formData, rate: parseFloat(e.target.value) })}
                >
                  <option value={0.25}>0.25 ставки</option>
                  <option value={0.5}>0.5 ставки</option>
                  <option value={0.75}>0.75 ставки</option>
                  <option value={1}>1 ставка</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Дата приёма</label>
                <input
                  type="date"
                  className={styles.input}
                  value={formData.hire_date}
                  onChange={(e) => setFormData({ ...formData, hire_date: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Образование</label>
                <select
                  className={styles.select}
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                >
                  <option value="высшее">Высшее</option>
                  <option value="среднее">Среднее профессиональное</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Учёная степень</label>
                <select
                  className={styles.select}
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                >
                  <option value="">Нет</option>
                  <option value="кандидат наук">Кандидат наук</option>
                  <option value="доктор наук">Доктор наук</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Звание</label>
                <select
                  className={styles.select}
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                >
                  <option value="">Нет</option>
                  <option value="доцент">Доцент</option>
                  <option value="профессор">Профессор</option>
                </select>
              </div>
            </div>
          </section>

          {/* Документы */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Документы</h2>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Серия паспорта</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.passport_series}
                  onChange={(e) => setFormData({ ...formData, passport_series: e.target.value })}
                  placeholder="0000"
                  maxLength={4}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Номер паспорта</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.passport_number}
                  onChange={(e) => setFormData({ ...formData, passport_number: e.target.value })}
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>ИНН</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.inn}
                  onChange={(e) => setFormData({ ...formData, inn: e.target.value })}
                  placeholder="000000000000"
                  maxLength={12}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>СНИЛС</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.snils}
                  onChange={(e) => setFormData({ ...formData, snils: e.target.value })}
                  placeholder="000-000-000-00"
                />
              </div>
            </div>
          </section>

          <div className={styles.actions}>
            <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>
              Отмена
            </button>
            <button type="submit" disabled={saving} className={styles.submitBtn}>
              {saving ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
