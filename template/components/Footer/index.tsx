import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-center mb-4">
      <p>
        <Link className="underline text-sm" href={'/privacy-policy'}>
          プライバシーポリシー
        </Link>
      </p>
      <p className="text-sm">&copy; 2025 wand</p>
    </footer>
  );
}
