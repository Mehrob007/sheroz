import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { Hero, Features } from '@/components/landing';
import CourseCard from '@/components/course/CourseCard';
import prisma from '@/lib/db';

export default async function Home() {
  // Получаем курсы для отображения на главной
  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    include: {
      lessons: { select: { id: true } },
    },
    take: 3,
    orderBy: { order: 'asc' },
  });

  return (
    <main>
      <Header />
      <Hero />
      <Features />
      
      {/* Популярные курсы */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Популярные курсы
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
              Начните обучение с наших лучших курсов
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
