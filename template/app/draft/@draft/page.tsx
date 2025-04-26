'use client';

import { MicroCMSContentId, MicroCMSDate, createClient } from 'microcms-js-sdk';
import { notFound, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import Article from '@/components/Article';
import { extractHeadings } from '@/libs/extractHeadings';
import { formatRichText } from '@/libs/formatRichText';
import { Blog } from '@/libs/microcms';

export default function Page() {
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
  const [content, setContent] = useState<string>('');

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

  useEffect(() => {
    let ignore = false;

    const handle = async () => {
      if (!ignore && data) {
        setContent(await formatRichText(data.content));
      }
    };

    void handle();

    return () => {
      ignore = true;
    };
  }, [data]);

  const headings = useMemo(() => {
    if (!content || !data || !data.use_toc) return undefined;

    return extractHeadings(content);
  }, [content, data]);

  return content && data ? (
    <Article formattedContent={content} data={data} headings={headings} />
  ) : (
    'loading...'
  );
}
