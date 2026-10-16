import { notFound } from 'next/navigation';
import Quiz from './Quiz';
import Stickers from './Stickers';
import { QUIZZES, getQuiz as getQuizUk } from '@/lib/quizzes';
import { localizeQuiz } from '@/lib/content/quizzes';
import { getLang } from '@/lib/i18n-server';



export function quizMetadata(slug: string) {
  const quiz = getQuizUk(slug);
  return quiz ? { title: `${quiz.title}: Quiz ${quiz.number} · Murly`, description: quiz.description } : {};
}

export default function QuizPage({ slug }: { slug: string }) {
  const q0 = getQuizUk(slug);
  const quiz = q0 ? localizeQuiz(q0, getLang()) : q0;
  if (!quiz) notFound();
  const n = QUIZZES[QUIZZES.findIndex((q) => q.slug === slug) + 1];
  return (
    <main data-stickers="6" style={{ minHeight: '100vh' }}>
      <Quiz quiz={quiz} next={n ? { slug: n.slug, title: n.title, number: n.number } : undefined} />
      <Stickers />
    </main>
  );
}
