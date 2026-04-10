import styles from './Logo.module.scss';

export default function Logo() {
  return (
    <div className={styles.logo}>
      {/* Иконка книги */}
      <svg className={styles.icon} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="32" height="28" rx="2" fill="#2196F3"/>
        <path d="M20 6V34" stroke="white" strokeWidth="2"/>
        <path d="M4 10C4 10 9 6 14 6C20 6 20 10 20 10" fill="#1976D2"/>
        <path d="M36 10C36 10 31 6 26 6C20 6 20 10 20 10" fill="#1976D2"/>
        <rect x="6" y="12" width="12" height="2" rx="1" fill="white" opacity="0.7"/>
        <rect x="6" y="16" width="10" height="2" rx="1" fill="white" opacity="0.5"/>
        <rect x="22" y="12" width="12" height="2" rx="1" fill="white" opacity="0.7"/>
        <rect x="22" y="16" width="10" height="2" rx="1" fill="white" opacity="0.5"/>
      </svg>
      <span className={styles.text}>eDONISH</span>
    </div>
  );
}
