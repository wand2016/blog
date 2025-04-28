import { MicroCMSImage } from 'microcms-js-sdk';
import { unstable_ViewTransition as ViewTransition } from 'react';

import { formatImageSrc } from '@/libs/formatImageSrc';

type Props = {
  viewTransitionId?: string;
  thumbnail: MicroCMSImage;
  className?: string;
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

export default function ArticleThumbnail({ viewTransitionId, thumbnail, sizes, className }: Props) {
  const content = (
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
        width={1200}
        height={630}
        fetchPriority="high"
        decoding="async"
      />
    </picture>
  );

  return viewTransitionId ? (
    <ViewTransition name={`thumbnail${viewTransitionId}`}>{content}</ViewTransition>
  ) : (
    content
  );
}
