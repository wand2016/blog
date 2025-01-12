import styles from './index.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <Link href={'/privacy-policy'}>プライバシーポリシー</Link>
      </p>
      <p className={styles.cr}>&copy; 2025 wand</p>
    </footer>
  );
}
