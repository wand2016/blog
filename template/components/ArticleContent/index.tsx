import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export default function ArticleContent({ className = '', ...rest }: Props) {
  return <div className={`w-full content ${className}`} {...rest} />;
}
