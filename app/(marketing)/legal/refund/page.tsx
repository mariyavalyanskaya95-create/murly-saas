import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { tr } from '@/lib/i18n-server';
import { LEGAL } from '@/lib/legal-config';
import { LEGAL_DOCS } from '@/lib/legal';

export function generateMetadata(): Metadata {
  const t = tr();
  const doc = LEGAL_DOCS.refund;
  return {
    title: `${t(doc.title)} | Murly`,
    description: t(doc.description),
    robots: { index: LEGAL.ready, follow: true },
  };
}

export default function RefundPage() {
  return <LegalPage id="refund" />;
}
