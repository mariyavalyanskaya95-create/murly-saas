import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { tr } from '@/lib/i18n-server';
import { LEGAL_DOCS } from '@/lib/legal';
import { alt } from '@/lib/seo';

export function generateMetadata(): Metadata {
  const t = tr();
  const doc = LEGAL_DOCS.rules;
  return { title: `${t(doc.title)} | Murly`, description: t(doc.description), alternates: alt('/legal/rules') };
}

export default function RulesPage() {
  return <LegalPage id="rules" />;
}
