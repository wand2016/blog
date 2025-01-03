'use client';

import {
  FacebookIcon,
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  LineIcon,
  LineShareButton,
  XIcon,
  TwitterShareButton,
} from 'react-share';
import styles from './index.module.css';

type Props = {
  title: string;
  url: string;
  hashtags: string[];
};

export default function Share({ url, title, hashtags }: Props) {
  return (
    <ul className={styles.shareButtonList}>
      <li className={styles.shareButtonWrapper}>
        <TwitterShareButton url={url} title={title} hashtags={hashtags} aria-label="X share button">
          <XIcon size={'64px'} />
        </TwitterShareButton>
      </li>
      <li className={styles.shareButtonWrapper}>
        <FacebookShareButton
          url={url}
          hashtag={hashtags[0] ?? undefined}
          aria-label="Facebook share button"
        >
          <FacebookIcon size={'64px'} />
        </FacebookShareButton>
      </li>
      <li className={styles.shareButtonWrapper}>
        <LineShareButton url={url} title={title} aria-label="LINE share button">
          <LineIcon size={'64px'} />
        </LineShareButton>
      </li>
      <li className={styles.shareButtonWrapper}>
        <HatenaShareButton url={url} title={title} aria-label="Hatena share button">
          <HatenaIcon size={'64px'} />
        </HatenaShareButton>
      </li>
    </ul>
  );
}
