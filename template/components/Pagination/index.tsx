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
    <ul className={`flex justify-center items-center gap-2`}>
      {pages.map((p) => (
        <li key={p}>
          {current !== p ? (
            <Link
              className="flex justify-center items-center size-10 rounded underline hover:bg-gray-200 focus:outline focus:outline-2 focus:outline-black"
              href={`${basePath}/p/${p}` + (q ? `?q=${q}` : '')}
            >
              {p}
            </Link>
          ) : (
            <span className="flex justify-center items-center size-10 rounded bg-gray-200">
              {p}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
