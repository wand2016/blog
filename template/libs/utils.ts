import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export const formatDate = (date: string) => {
  const utcDate = new Date(date);
  const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo');
  return format(jstDate, 'd MMMM, yyyy');
};

export const formatImageSrc = <T extends string | undefined | null>(src: T): T | string => {
  if (!src || !src.startsWith('https://images.microcms-assets.io/assets/')) return src;

  const glue = src.includes('?') ? '&' : '?';
  return `${src}${glue}auto=compress`;
};

export const formatRichText = async (richText: string) => {
  const $ = cheerio.load(richText);
  const highlight = (text: string, lang?: string) => {
    if (!lang) return hljs.highlightAuto(text);
    try {
      return hljs.highlight(text, { language: lang?.replace(/^language-/, '') || '' });
    } catch (e) {
      return hljs.highlightAuto(text);
    }
  };
  $('pre code').each((_, elm) => {
    const lang = $(elm).attr('class');
    const res = highlight($(elm).text(), lang);
    $(elm).html(res.value);
  });

  $('img').each((_, elm) => {
    const src = $(elm).attr('src');
    if (src) {
      $(elm).attr('src', formatImageSrc(src));
    }
  });
  $('picture > source').each((_, elm) => {
    const srcset = $(elm).attr('srcset');
    if (srcset) {
      $(elm).attr('srcset', formatImageSrc(srcset));
    }
  });

  const iframeAnchorElements = $(
    'div.iframely-embed > div.iframely-responsive > a[data-iframely-url]',
  ).get();
  for (const elm of iframeAnchorElements) {
    const iframelyUrl = $(elm).attr('data-iframely-url') ?? '';
    const iframelyUrlQueryParams = iframelyUrl.slice(iframelyUrl.indexOf('?'));

    const data = await fetch(
      `https://cdn.iframe.ly/api/iframely${iframelyUrlQueryParams}&omit_script=1&iframe=1&title=1`,
    );
    const json = await data.json();
    const html = json['html'];

    $(elm).parent().parent().replaceWith(html);
  }

  $('script[src="//cdn.iframe.ly/embed.js"]').remove();

  return $.html();
};
