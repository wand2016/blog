import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/blog_logo.png"
          alt=""
          className={styles.logo}
          width={861}
          height={218}
          priority
        />
      </Link>
    </header>
  );
}
