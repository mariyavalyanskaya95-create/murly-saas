import GrammarTopicPage, { topicMetadata } from '@/components/GrammarTopicPage';
import { GRAMMAR } from '@/lib/grammar';

export const dynamicParams = false;

export function generateStaticParams() {
  return GRAMMAR.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return topicMetadata(params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  return <GrammarTopicPage slug={params.slug} />;
}
