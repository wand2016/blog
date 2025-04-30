import * as cheerio from 'cheerio';

export type HeadingTuple = {
  tagName: string;
  headingNumber: number;
  id: string;
  innerHTML: string;
};

export const extractHeadings = (html: string): HeadingTuple[] => {
  const $ = cheerio.load(html);

  return $('h2,h3,h4')
    .map((_, heading): HeadingTuple => {
      const element: HTMLElement = $(heading).get(0);
      return {
        tagName: element.tagName,
        headingNumber: parseInt(element.tagName[1], 10),
        id: $(heading).attr('id') ?? '',
        innerHTML: $(heading).html() ?? '',
      };
    })
    .get();
};
