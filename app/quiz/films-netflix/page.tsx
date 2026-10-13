import QuizPage, { quizMetadata } from '@/components/QuizPage';

export const metadata = quizMetadata('films-netflix');

export default function Page() {
  return <QuizPage slug="films-netflix" />;
}
