'use client';

import { pagefind, loadPagefind } from './pagefind';
import type { PagefindSearchResult, PagefindSearchFragment } from './types';
import styles from './index.module.css';
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
      <div className={styles.searchWrapper}>
        <Search width="24px" height="24px" className={styles.searchIcon} />
        <input
          className={styles.search}
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
    <li className={styles.resultItem}>
      <p className={styles.resultItem__title}>
        <Link href={data.url}>{data.meta.title}</Link>
      </p>
      <p
        className={styles.resultItem__excerpt}
        dangerouslySetInnerHTML={{
          __html: data.excerpt,
        }}
      />
    </li>
  ) : null;
};
