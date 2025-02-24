import { MicroCMSImage } from 'microcms-js-sdk';
import { CSSProperties } from 'react';

import { formatImageSrc } from '@/libs/formatImageSrc';

type Props = {
  thumbnail: MicroCMSImage;
  className?: string;
  style?: CSSProperties;
  /**
   * SP-first
   */
  sizes: {
    default: {
      w: number;
      h: number;
    };
    /**
     * >=640px
     */
    sm: {
      w: number;
      h: number;
    };
  };
};

export default function ArticleThumbnail({ thumbnail, sizes, className, style }: Props) {
  return (
    <picture>
      <source
        type="image/webp"
        media="(max-width: 640px)"
        srcSet={[
          `${formatImageSrc(`${thumbnail.url}?fm=webp&fit=fill&fill=blur&w=${sizes.default.w}&h=${sizes.default.h}`)} 1x`,
          `${formatImageSrc(`${thumbnail.url}?fm=webp&fit=fill&fill=blur&w=${sizes.default.w}&h=${sizes.default.h}&dpr=2`)} 2x`,
        ].join(',')}
      />
      <source
        type="image/webp"
        srcSet={[
          `${formatImageSrc(`${thumbnail.url}?fm=webp&fit=fill&fill=blur&w=${sizes.sm.w}&h=${sizes.sm.h}`)} 1x`,
          `${formatImageSrc(`${thumbnail.url}?fm=webp&fit=fill&fill=blur&w=${sizes.sm.w}&h=${sizes.sm.h}&dpr=2`)} 2x`,
        ].join(',')}
      />
      <img
        src={formatImageSrc(thumbnail.url)}
        alt=""
        className={className}
        style={style}
        width={1200}
        height={630}
        fetchPriority="high"
        decoding="async"
      />
    </picture>
  );
}
