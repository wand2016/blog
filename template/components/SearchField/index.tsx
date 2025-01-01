'use client';

import type { PagefindSearchResult, PagefindSearchFragment } from './types';
import styles from './index.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';

declare global {
  interface Window {
    pagefind: any;
  }
}
async function loadPagefind() {
  if (typeof window.pagefind === 'undefined') {
    // pagefindの読み出しを行う
    const pf = await import(
      // @ts-expect-error pagefind.js generated after build
      /* webpackIgnore: true */ '/pagefind/pagefind.js'
    );
    window.pagefind = pf;
  }
}

export default function SearchField() {
  const [results, setResults] = useState<PagefindSearchResult[]>([]);

  useEffect(() => {
    void loadPagefind();
  }, []);

  async function searchQuery(query: string) {
    if (window.pagefind) {
      const search = await window.pagefind.search(query);
      setResults(search.results);
    }
  }

  return (
    <>
      <input
        className={styles.search}
        type="text"
        placeholder="Searach..."
        defaultValue={''}
        onChange={(e) => searchQuery(e.target.value)}
      />
      <ul id="results">
        {results.map((result) => (
          <ResultItem key={result.id} result={result} />
        ))}
      </ul>
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
      <Link href={data.url}>{data.content}</Link>
    </li>
  ) : null;
};
