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
    <ul className="flex justify-center items-center p-[24px] mt-[24px] gap-[8px]">
      {pages.map((p) => (
        <li key={p}>
          {current !== p ? (
            <Link
              className="flex justify-center items-center size-[36px] rounded underline"
              href={`${basePath}/p/${p}` + (q ? `?q=${q}` : '')}
            >
              {p}
            </Link>
          ) : (
            <span className="flex justify-center items-center size-[36px] rounded bg-gray-200">
              {p}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
