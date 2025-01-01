type Props = {
  draft: React.ReactNode;
};

export default function DraftLayout({ draft }: Props) {
  return `${process.env.USE_DRAFT ?? ''}` === 'true' ? draft : null;
}
