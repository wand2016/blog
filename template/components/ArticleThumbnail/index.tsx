import { MicroCMSImage } from 'microcms-js-sdk';

import { formatImageSrc } from '@/libs/formatImageSrc';

type Props = {
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
  /**
   * 記事サムネイル画像の読み込み・描画を遅延させます。
   * 記事下部の「関連記事」など、オフスクリーンの画像読み込みを遅延させるために使用します。
   * @default false
   */
  lazy?: boolean;
};

export default function ArticleThumbnail({ thumbnail, sizes, className, lazy = false }: Props) {
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
        width={1200}
        height={630}
        loading={lazy ? 'lazy' : 'eager'}
        fetchPriority={lazy ? 'low' : 'high'}
        decoding="async"
      />
    </picture>
  );
}
