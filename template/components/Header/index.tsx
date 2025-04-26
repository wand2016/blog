'use client';

import clsx from 'clsx';
import { MenuIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useEffect, useRef, useState } from 'react';

type Props = { menuContent: ReactElement };

const MENU_SCROLL_THRESHOLD = 48;

export default function Header({ menuContent }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuHidden, setMenuHidden] = useState(false);

  const prevY = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (prevY.current === null) {
        prevY.current = currentY;
        return;
      }
      if (currentY > MENU_SCROLL_THRESHOLD && currentY > prevY.current) {
        setMenuHidden(true);
      } else {
        setMenuHidden(false);
      }
      prevY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={clsx([
          'w-full',
          'bg-white',
          'shadow-md',
          'z-50',
          'fixed',
          'top-0',
          menuHidden ? '-translate-y-12' : 'translate-y-0',
          'transform-transition',
          'duration-300',
        ])}
        // NOTE: View Transition よりも前面に出すためには view-transition-name を設定する必要がある
        // @ts-expect-error nosuchkey
        style={{ viewTransitionName: 'fixed-header' }}
      >
        <div className="flex justify-between items-center h-12">
          <Link href="/" className="active:ring-2">
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
              className="border-none background-transparent mr-4"
              type="button"
              aria-label="メニューを閉じるボタン"
              onClick={() => setMenuOpen(false)}
            >
              <XIcon />
            </button>
          ) : (
            <button
              className="border-none background-transparent mr-4"
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
