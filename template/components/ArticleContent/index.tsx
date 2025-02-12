import styles from './index.module.css';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export default function ArticleContent({ className = '', ...rest }: Props) {
  return <div className={`w-full max-w-[640px] ${styles.content} ${className}`} {...rest} />;
}
