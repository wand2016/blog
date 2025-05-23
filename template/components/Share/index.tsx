'use client';

import {
  FacebookIcon,
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  LineIcon,
  LineShareButton,
  TwitterShareButton,
  XIcon,
} from 'react-share';

type Props = {
  title: string;
  url: string;
  hashtags: string[];
  className?: string;
};

export default function Share({ url, title, hashtags, className = '' }: Props) {
  return (
    <ul className={`flex gap-4 justify-center ${className}`}>
      <li className="w-64px h-64px">
        <TwitterShareButton
          className="align-bottom rounded-xl active:ring-2"
          url={url}
          title={title}
          hashtags={hashtags}
          aria-label="X share button"
        >
          <XIcon size="64px" className="rounded-xl" />
        </TwitterShareButton>
      </li>
      <li className="w-64px h-64px">
        <FacebookShareButton
          className="align-bottom rounded-xl active:ring-2"
          url={url}
          hashtag={hashtags[0] ?? undefined}
          aria-label="Facebook share button"
        >
          <FacebookIcon size="64px" className="rounded-xl" />
        </FacebookShareButton>
      </li>
      <li className="w-64px h-64px">
        <LineShareButton
          className="align-bottom rounded-xl active:ring-2"
          url={url}
          title={title}
          aria-label="LINE share button"
        >
          <LineIcon size="64px" className="rounded-xl" />
        </LineShareButton>
      </li>
      <li className="w-64px h-64px">
        <HatenaShareButton
          className="align-bottom rounded-xl active:ring-2"
          url={url}
          title={title}
          aria-label="Hatena share button"
        >
          <HatenaIcon size="64px" className="rounded-xl" />
        </HatenaShareButton>
      </li>
    </ul>
  );
}
