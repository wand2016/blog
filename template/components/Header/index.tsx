import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/blog_logo.svg"
          alt="wandfuldays"
          className={styles.logo}
          width={520}
          height={120}
          priority
        />
      </Link>
    </header>
  );
}
