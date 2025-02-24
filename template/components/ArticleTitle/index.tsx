import { CSSProperties, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
}>;

export default function ArticleTitle({ children, className = '', style }: Props) {
  return (
    <h1 className={`text-2xl font-bold ${className}`} style={style}>
      {children}
    </h1>
  );
}
