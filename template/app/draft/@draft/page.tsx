'use client';

import { Blog } from '@/libs/microcms';
import Article from '@/components/Article';
import { notFound, useSearchParams } from 'next/navigation';
import { createClient, MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk';
import { useEffect, useState } from 'react';

type Props = {};

export default function Page({}: Props) {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const draftKey = searchParams.get('draftKey');
  const serviceDomain = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN ?? '';
  const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY ?? '';
  if (!id || !draftKey || !serviceDomain || !apiKey) {
    notFound();
  }

  const [client] = useState(() =>
    createClient({
      serviceDomain,
      apiKey,
    }),
  );
  const [data, setData] = useState<(Blog & MicroCMSContentId & MicroCMSDate) | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      const data = await client
        .getListDetail<Blog>({
          endpoint: 'blog',
          contentId: id,
          queries: {
            draftKey,
          },
        })
        .catch(notFound);
      if (!ignore) {
        setData(data);
      }
    };
    void fetchData();

    return () => {
      ignore = true;
    };
  }, [client, draftKey, id]);

  return data ? <Article data={data} /> : 'loading...';
}
