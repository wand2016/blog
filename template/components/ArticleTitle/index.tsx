import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function ArticleTitle({ children, className = '' }: Props) {
  return <h1 className={`text-3xl font-bold text-center ${className}`}>{children}</h1>;
}
