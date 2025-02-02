'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';
import { MenuIcon, XIcon } from 'lucide-react';
import { ReactElement, useState } from 'react';

type Props = { menuContent: ReactElement };

export default function Header({ menuContent }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <Image
            src="/blog_logo.svg"
            alt="wandfuldays"
            className={styles.logo}
            width={520}
            height={120}
            // priority
            loading="lazy"
            decoding="async"
          />
        </Link>
        {menuOpen ? (
          <button
            className={styles.menuButton}
            type="button"
            aria-label="メニューを閉じるボタン"
            onClick={() => setMenuOpen(false)}
          >
            <XIcon />
          </button>
        ) : (
          <button
            className={styles.menuButton}
            type="button"
            aria-label="メニューを開くボタン"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
        )}
      </header>
      {/* todo: animation, modal */}
      {menuOpen && <div className={styles.menu}>{menuContent}</div>}
    </>
  );
}
