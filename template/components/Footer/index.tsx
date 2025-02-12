import Link from 'next/link';

type Props = {
  className?: string;
};

export default function Footer({ className = '' }: Props) {
  return (
    <footer className={`text-center ${className}`}>
      <p>
        <Link className="underline text-sm" href={'/privacy-policy'}>
          プライバシーポリシー
        </Link>
      </p>
      <p className="text-sm">&copy; 2025 wand</p>
    </footer>
  );
}
