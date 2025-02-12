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
      <header className="w-full bg-white shadow-md z-20 top-0 fixed">
        <div className="flex justify-between items-center h-12">
          <Link href="/">
            <Image
              src="/blog_logo.svg"
              alt="wandfuldays"
              className="w-[200px] h-auto align-top ml-2 mb-1"
              width={208}
              height={48}
            />
          </Link>
          {menuOpen ? (
            <button
              className="border-none background-transparent mr-4 focus:outline-none"
              type="button"
              aria-label="メニューを閉じるボタン"
              onClick={() => setMenuOpen(false)}
            >
              <XIcon />
            </button>
          ) : (
            <button
              className="border-none background-transparent mr-4 focus:outline-none"
              type="button"
              aria-label="メニューを開くボタン"
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </button>
          )}
        </div>
        {/* todo: animation, modal */}
        {menuOpen && <div className="mt-4">{menuContent}</div>}
      </header>
    </>
  );
}
