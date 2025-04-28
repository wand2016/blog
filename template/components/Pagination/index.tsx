import Link from 'next/link';

import { LIMIT } from '@/constants';

type Props = {
  totalCount: number;
  current?: number;
  basePath?: string;
  q?: string;
};

export default function Pagination({ totalCount, current = 1, basePath = '', q }: Props) {
  const pages = Array.from({ length: Math.ceil(totalCount / LIMIT) }).map((_, i) => i + 1);
  return (
    <ul className="flex justify-center items-center gap-2">
      {pages.map((p) => (
        <li key={p}>
          {current !== p ? (
            <Link
              className="flex justify-center items-center size-10 rounded-sm link-text hover:bg-gray-200 active:ring-2"
              href={`${basePath}/p/${p}` + (q ? `?q=${q}` : '')}
            >
              {p}
            </Link>
          ) : (
            <span className="flex justify-center items-center size-10 rounded-sm bg-gray-200">
              {p}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
