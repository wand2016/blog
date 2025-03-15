export type IframelyResponse = {
  url: string;
  meta: {
    title: string;
    description: string;
    site: string;
    canonical: string;
  };
  links: {
    thumbnail: [
      {
        href: string;
        /**
         * e.g. "image/jpeg"
         */
        type: string;
        /**
         * e.g. ["thumbnail","og","ssl"]
         */
        rel: string[];
        media: {
          width: number;
          height: number;
        };
      },
    ];
    icon: [
      {
        href: string;
        /**
         * e.g. 'image/icon'
         */
        type: string;
        /**
         * e.g. ['icon', 'ssl']
         */
        rel: string[];
      },
    ];
  };
  /**
   * e.g. ['summary', 'card', 'small', 'inline', 'html5', 'ssl', 'hosted']
   */
  rel: string[];
  html: string;
  /**
   * Iframely query string param
   */
  options: object;
};
