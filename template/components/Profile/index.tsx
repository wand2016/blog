import Image from 'next/image';

import { formatImageSrc } from '@/libs/formatImageSrc';
import { Writer } from '@/libs/microcms';


type Props = {
  writer?: Writer;
  className?: string;
};

export default function Profile({ writer, className = '' }: Props) {
  if (!writer) {
    return null;
  }
  return (
    <div className={`mx-2 flex gap-[24px] ${className}`}>
      {writer.image && (
        <picture>
          <source
            type="image/webp"
            srcSet={[
              `${formatImageSrc(`${writer.image.url}?fm=webp&fit=crop&96&h=96`)} 1x`,
              `${formatImageSrc(`${writer.image.url}?fm=webp&fit=crop&w=96&h=96&dpr=2`)} 2x`,
            ].join(',')}
          />
          <Image
            src={formatImageSrc(writer.image.url)}
            alt=""
            className="size-[48px] rounded-full sm:size-[96px]"
            width={writer.image.width}
            height={writer.image.height}
            loading="lazy"
            decoding="async"
          />
        </picture>
      )}
      <div className="flex-1">
        <p className="font-bold pb-0.5">{writer.name}</p>
        <p className="text-sm">{writer.profile}</p>
      </div>
    </div>
  );
}
