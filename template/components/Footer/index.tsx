import Link from 'next/link';

type Props = {
  className?: string;
};

export default function Footer({ className = '' }: Props) {
  return (
    <footer className={`text-center ${className}`}>
      <ul className="flex gap-4 items-center justify-center">
        <li>
          <Link className="text-sm link-text" href={'/'}>
            ブログトップ
          </Link>
        </li>
        <li>
          <Link className="text-sm link-text" href={'/privacy-policy'}>
            プライバシーポリシー
          </Link>
        </li>
        {process.env.INQUIRY_GOOGLE_FORM_URL && (
          <li>
            <a
              href={process.env.INQUIRY_GOOGLE_FORM_URL}
              target="_blank"
              className="text-sm link-text"
            >
              お問い合わせ
            </a>
          </li>
        )}
      </ul>
      <p className="text-sm">&copy; 2025 wand</p>
    </footer>
  );
}
