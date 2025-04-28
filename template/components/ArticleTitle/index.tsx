import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function ArticleTitle({ children, className = '' }: Props) {
  return <h1 className={`text-2xl font-bold ${className}`}>{children}</h1>;
}
