'use client';

import { pagefind, loadPagefind } from './pagefind';
import type { PagefindSearchResult, PagefindSearchFragment } from './types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function SearchField() {
  const [results, setResults] = useState<PagefindSearchResult[]>([]);

  useEffect(() => {
    void loadPagefind();
  }, []);

  async function searchQuery(query: string) {
    if (pagefind) {
      const search = await pagefind.debouncedSearch(query);
      if (!!search) {
        setResults(search.results);
      }
    }
  }

  return (
    <>
      <div className="w-full mx-[24px] h-[40px] sm:w-[600px] sm:mx-auto">
        <Search
          width="24px"
          height="24px"
          className="absolute translate-x-[16px] translate-y-[8px]"
        />
        <input
          className={
            'py-0 pr-[24px] pl-[48px] w-full h-full border-dark border-solid border rounded-full'
          }
          type="search"
          placeholder="Search..."
          defaultValue=""
          onChange={(e) => searchQuery(e.target.value)}
        />
      </div>
      <ol>
        {results.map((result) => (
          <ResultItem key={result.id} result={result} />
        ))}
      </ol>
    </>
  );
}

const ResultItem = ({ result }: { result: PagefindSearchResult }) => {
  const [data, setData] = useState<PagefindSearchFragment>();

  useEffect(() => {
    if (!!data) return;

    async function fetchData() {
      const data = await result.data();
      setData(data);
    }
    void fetchData();
  }, [data, result]);

  return data ? (
    <li>
      <p>
        <Link className="underline font-bold" href={data.url}>
          {data.meta.title}
        </Link>
      </p>
      <p
        className="indent-4"
        dangerouslySetInnerHTML={{
          __html: data.excerpt,
        }}
      />
    </li>
  ) : null;
};
