'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import styles from './page.module.scss';

export default function NewCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    level: 'beginner',
    duration: 0,
    price: 0,
    categoryId: '',
    isPublished: false,
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Error creating course:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.container}>
        <h1 className={styles.title}>Новый курс</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Название *</label>
            <input
              type="text"
              className={styles.input}
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value;
                setFormData({ 
                  ...formData, 
                  title,
                  slug: generateSlug(title)
                });
              }}
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
            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'Создание...' : 'Создать курс'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
