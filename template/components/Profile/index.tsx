import styles from './index.module.css';
import { Writer } from '@/libs/microcms';

import { formatImageSrc } from '@/libs/formatImageSrc';
import Image from 'next/image';

type Props = {
  writer?: Writer;
};

export default function Profile({ writer }: Props) {
  if (!writer) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
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
            className={styles.icon}
            width={writer.image.width}
            height={writer.image.height}
            loading="lazy"
            decoding="async"
          />
        </picture>
      )}
      <div className={styles.content}>
        <p className={styles.name}>{writer.name}</p>
        <p className={styles.profile}>{writer.profile}</p>
      </div>
    </div>
  );
}
