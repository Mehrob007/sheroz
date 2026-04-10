'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import styles from '../new/page.module.scss';

export default function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    level: 'beginner',
    duration: 0,
    price: 0,
    isPublished: false,
  });
  const [courseId, setCourseId] = useState('');

  useEffect(() => {
    params.then(({ id }) => {
      setCourseId(id);
      fetch(`/api/courses/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            title: data.title,
            slug: data.slug,
            description: data.description || '',
            level: data.level,
            duration: data.duration,
            price: data.price,
            isPublished: data.isPublished,
          });
          setLoading(false);
        });
    });
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Error updating course:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className={styles.main}>
        <Header />
        <div className={styles.container}>
          <p>Загрузка...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.container}>
        <h1 className={styles.title}>Редактировать курс</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Название *</label>
            <input
              type="text"
              className={styles.input}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Slug *</label>
            <input
              type="text"
              className={styles.input}
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Описание</label>
            <textarea
              className={styles.textarea}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Уровень</label>
              <select
                className={styles.select}
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              >
                <option value="beginner">Начинающий</option>
                <option value="intermediate">Средний</option>
                <option value="advanced">Продвинутый</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Длительность (часы)</label>
              <input
                type="number"
                className={styles.input}
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Цена (₽)</label>
              <input
                type="number"
                className={styles.input}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              />
              Опубликован
            </label>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>
              Отмена
            </button>
            <button type="submit" disabled={saving} className={styles.submitBtn}>
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
