import { HeadingTuple } from '@/libs/extractHeadings';
import clsx from 'clsx';

type Props = {
  headings: ReadonlyArray<HeadingTuple>;
  className?: string;
};

export default function Toc({ headings, className = '' }: Props) {
  return (
    <section className={`bg-gray-100 rounded-lg p-4 text-md ${className}`}>
      <header className="mb-2 font-bold">目次</header>
      <ol>
        {headings.map((heading) => (
          <li
            className={clsx([
              heading.headingNumber === 3 && 'indent-4',
              heading.headingNumber === 4 && 'indent-8',
            ])}
            key={heading.id}
          >
            <a
              className="underline focus:outline focus:outline-2 focus:outline-black"
              href={`#${heading.id}`}
              dangerouslySetInnerHTML={{
                __html: heading.innerHTML,
              }}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
