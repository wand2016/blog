import 'highlight.js/styles/github.css';
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import { formatImageSrc } from '@/libs/formatImageSrc';
import { parse } from 'qs';
import { IframelyResponse } from '@/libs/iframely/types';

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

    // perf: Largest Contentful Paint スコア改善のため、初期表示時に見えない位置にある記事本文中の画像は読み込みを遅らせる。
    $(elm).attr('loading', 'lazy').attr('decoding', 'async').attr('fetchPriority', 'low');
  });
  $('picture > source').each((_, elm) => {
    const srcset = $(elm).attr('srcset');
    if (srcset) {
      $(elm).attr('srcset', formatImageSrc(srcset));
    }
  });

  const iframelyAnchorElements = $(
    'div.iframely-embed > div.iframely-responsive > a[data-iframely-url]',
  ).get();
  for (const iframelyAnchorElement of iframelyAnchorElements) {
    const iframelyUrl = $(iframelyAnchorElement).attr('data-iframely-url') ?? '';
    const iframelyUrlQueryParams = iframelyUrl.slice(iframelyUrl.indexOf('?'));
    const data = await fetch(
      `https://cdn.iframe.ly/api/iframely${iframelyUrlQueryParams}&omit_script=1&iframe=1&title=1&theme=light`,
    );
    const json: IframelyResponse = await data.json();
    const html = json['html'];
    const $replacement = cheerio.load(html);
    $replacement('iframe').attr('loading', 'lazy');

    if (process.env.IFRAMELY_PROXY_URL) {
      const rawSrc = $replacement('iframe').attr('src') ?? '';
      $replacement('iframe').attr(
        'src',
        rawSrc.replace(/^(?:https?:)?\/\/cdn.iframe.ly/, process.env.IFRAMELY_PROXY_URL),
      );
    }

    const params = parse(iframelyUrlQueryParams, { ignoreQueryPrefix: true });
    const url = decodeURI(params.url as string);
    const title = $replacement('iframe').attr('title');
    $replacement.root().append('<a class="text-sm" target="_blank"></a>');
    $replacement('a')
      .attr('href', url)
      .text(title ?? '');

    $(iframelyAnchorElement).parent().parent().replaceWith($replacement.html());
  }

  $('script[src="//cdn.iframe.ly/embed.js"]').remove();

  // 広告掲載ポータルの中のダミー文字列を消し込む
  $('.ad-portal').text('');

  return $.html();
};
