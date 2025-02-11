'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MenuIcon, XIcon } from 'lucide-react';
import { ReactElement, useState } from 'react';

type Props = { menuContent: ReactElement };

export default function Header({ menuContent }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="pt-[4px] px-[8px] pb-[8px] h-[60px] flex justify-between items-center">
        <Link href="/">
          <Image
            src="/blog_logo.svg"
            alt="wandfuldays"
            className="w-[208px] h-[48px] align-top"
            width={208}
            height={48}
          />
        </Link>
        {menuOpen ? (
          <button
            className="border-none background-transparent mr-4 sm:hidden"
            type="button"
            aria-label="メニューを閉じるボタン"
            onClick={() => setMenuOpen(false)}
          >
            <XIcon />
          </button>
        ) : (
          <button
            className="border-none background-transparent mr-4 sm:hidden"
            type="button"
            aria-label="メニューを開くボタン"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
        )}
      </header>
      {/* todo: animation, modal */}
      {menuOpen && <div className="sm:hidden">{menuContent}</div>}
    </>
  );
}
