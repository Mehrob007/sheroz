import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href="#" className={styles.logo}>
              <span className={styles.logoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5V7H17V5H15ZM7 5V7H9V5H7ZM19 9H21V11H19V9ZM3 9H5V11H3V9ZM19 13H21V15H19V13ZM3 13H5V15H3V13ZM17 17H15V19H17V17ZM9 17H7V19H9V17Z" fill="currentColor"/>
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                </svg>
              </span>
              TicketHub
            </a>
            <p className={styles.description}>
              Ваш надежный партнер в мире развлечений. Покупайте билеты на лучшие мероприятия 
              вашего города быстро, безопасно и по выгодным ценам.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h4>Мероприятия</h4>
            <div className={styles.links}>
              <a href="#" className={styles.link}>Концерты</a>
              <a href="#" className={styles.link}>Театр</a>
              <a href="#" className={styles.link}>Спорт</a>
              <a href="#" className={styles.link}>Фестивали</a>
              <a href="#" className={styles.link}>Выставки</a>
            </div>
          </div>

          <div className={styles.column}>
            <h4>Информация</h4>
            <div className={styles.links}>
              <a href="#" className={styles.link}>О нас</a>
              <a href="#" className={styles.link}>Контакты</a>
              <a href="#" className={styles.link}>FAQ</a>
              <a href="#" className={styles.link}>Блог</a>
            </div>
          </div>

          <div className={styles.column}>
            <h4>Поддержка</h4>
            <div className={styles.links}>
              <a href="#" className={styles.link}>Помощь</a>
              <a href="#" className={styles.link}>Возврат билетов</a>
              <a href="#" className={styles.link}>Правила</a>
              <a href="#" className={styles.link}>Партнерам</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2025 TicketHub. Все права защищены.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Политика конфиденциальности</a>
            <a href="#" className={styles.bottomLink}>Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
