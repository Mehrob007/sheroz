'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import styles from '../new/page.module.scss';

export default function NewLessonPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    videoUrl: '',
    duration: 0,
    order: 0,
    isFree: false,
    courseId: '',
  });

  useEffect(() => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then(setCourses);
  }, []);

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
      const response = await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Error creating lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.container}>
        <h1 className={styles.title}>Новый урок</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Курс *</label>
            <select
              className={styles.select}
              value={formData.courseId}
              onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
              required
            >
              <option value="">Выберите курс</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

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
              rows={2}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Содержание (Markdown)</label>
            <textarea
              className={styles.textarea}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={10}
              style={{ fontFamily: 'monospace' }}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>URL видео</label>
            <input
              type="url"
              className={styles.input}
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              placeholder="https://youtube.com/embed/..."
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Длительность (мин)</label>
              <input
                type="number"
                className={styles.input}
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Порядок</label>
              <input
                type="number"
                className={styles.input}
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.isFree}
                onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
              />
              Бесплатный урок
            </label>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>
              Отмена
            </button>
            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'Создание...' : 'Создать урок'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
