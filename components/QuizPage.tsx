import { notFound } from 'next/navigation';
import Quiz from './Quiz';
import Stickers from './Stickers';
import { QUIZZES, getQuiz } from '@/lib/quizzes';

export function quizMetadata(slug: string) {
  const quiz = getQuiz(slug);
  return quiz ? { title: `${quiz.title}: Quiz ${quiz.number} · Murly`, description: quiz.description } : {};
}

export default function QuizPage({ slug }: { slug: string }) {
  const quiz = getQuiz(slug);
  if (!quiz) notFound();
  const n = QUIZZES[QUIZZES.findIndex((q) => q.slug === slug) + 1];
  return (
    <main data-stickers="6" style={{ minHeight: '100vh' }}>
      <Quiz quiz={quiz} next={n ? { slug: n.slug, title: n.title, number: n.number } : undefined} />
      <Stickers />
    </main>
  );
}
