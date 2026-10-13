import QuizPage, { quizMetadata } from '@/components/QuizPage';

export const metadata = quizMetadata('teen-life');

export default function Page() {
  return <QuizPage slug="teen-life" />;
}
