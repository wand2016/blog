import { hash } from '@/libs/hash';

type Props = {
  className?: string;
  children: string;
};

export default function ArticleTitle({ children, className = '' }: Props) {
  return (
    <h1
      className={`text-3xl font-bold text-center ${className}`}
      style={{ viewTransitionName: `title-${hash(children)}` }}
    >
      {children}
    </h1>
  );
}
