import type { Metadata } from 'next';
import { alt } from '@/lib/seo';
import { notFound, permanentRedirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import LessonPublic from '@/components/lesson/LessonPublic';
import { BATCH_1 } from '@/lib/lessons/batch-1';
import { BATCH_2 } from '@/lib/lessons/batch-2';
import { BATCH_3 } from '@/lib/lessons/batch-3';
import { BATCH_4 } from '@/lib/lessons/batch-4';
import { BATCH_5 } from '@/lib/lessons/batch-5';
import { BATCH_6 } from '@/lib/lessons/batch-6';
import { BATCH_7 } from '@/lib/lessons/batch-7';
import { BATCH_8 } from '@/lib/lessons/batch-8';
import { BATCH_9 } from '@/lib/lessons/batch-9';
import { localizeLesson } from '@/lib/content/lessons';
import { getLang } from '@/lib/i18n-server';
import { isTeacher } from '@/lib/student-data';

export const dynamic = 'force-dynamic';
const LESSONS = [...BATCH_1, ...BATCH_2, ...BATCH_3, ...BATCH_4, ...BATCH_5, ...BATCH_6, ...BATCH_7, ...BATCH_8, ...BATCH_9];
const find = (slug: string) => { const p = LESSONS.find((x) => x.id === `lib-${slug}`); return p ? localizeLesson(p, getLang()) : undefined; };

// Сторінки, які вже мають покази в Google: заголовок, опис і короткий вступ під реальні запити
type T3 = { uk: string; ru: string; en: string };
const SEO: Record<string, { title: T3; desc: T3; intro: T3 }> = {
  'gr-have-you-ever': {
    title: { uk: 'Have you ever: питання й відповіді, Present Perfect A2 | Murly', ru: 'Have you ever: вопросы и ответы, Present Perfect A2 | Murly', en: 'Have you ever questions and answers: Present Perfect A2 | Murly' },
    desc: { uk: 'Як питати Have you ever...? і відповідати Yes, I have / No, I haven’t. Ever, never, been і gone, подкаст, вправи з автоперевіркою і питання для розмови. Безкоштовно.', ru: 'Как спрашивать Have you ever...? и отвечать Yes, I have / No, I haven’t. Ever, never, been и gone, подкаст, упражнения с автопроверкой и вопросы для разговора. Бесплатно.', en: 'How to ask Have you ever...? and answer Yes, I have / No, I haven’t. Ever, never, been vs gone, a podcast, self-checking exercises and speaking questions. Free.' },
    intro: { uk: 'Have you ever...? означає «Ти коли-небудь...?». Так англійською питають про життєвий досвід: Have you ever tried sushi? Відповідь коротка: Yes, I have або No, I haven’t, а ще I’ve never... Нижче урок з подкастом, вправами й питаннями для розмови.', ru: 'Have you ever...? значит «Ты когда-нибудь...?». Так по-английски спрашивают о жизненном опыте: Have you ever tried sushi? Ответ короткий: Yes, I have или No, I haven’t, а ещё I’ve never... Ниже урок с подкастом, упражнениями и вопросами для разговора.', en: 'Have you ever...? is how we ask about life experiences: Have you ever tried sushi? Short answers: Yes, I have or No, I haven’t, and I’ve never... Below is a lesson with a podcast, exercises and speaking questions.' },
  },
  'my-family': {
    title: { uk: 'My family англійською: урок для дітей A1, слова й розповідь | Murly', ru: 'My family на английском: урок для детей A1, слова и рассказ | Murly', en: 'My family in English: A1 lesson for kids, words and a short story | Murly' },
    desc: { uk: 'Члени сім’ї англійською з озвучкою, have got / has got, аудіо про сім’ю Макса, вправи з автоперевіркою і розповідь про свою сім’ю. Безкоштовно.', ru: 'Члены семьи на английском с озвучкой, have got / has got, аудио про семью Макса, упражнения с автопроверкой и рассказ о своей семье. Бесплатно.', en: 'Family words with audio, have got / has got, a listening about Max’s family, self-checking exercises and a short story about your family. Free.' },
    intro: { uk: 'Тема My family для дітей: mum, dad, sister, brother, grandma і grandpa з озвучкою, фрази I have got a cousin і She has got long hair, аудіо та вправи. Наприкінці дитина розповідає і пише кілька речень про свою сім’ю англійською.', ru: 'Тема My family для детей: mum, dad, sister, brother, grandma и grandpa с озвучкой, фразы I have got a cousin и She has got long hair, аудио и упражнения. В конце ребёнок рассказывает и пишет несколько предложений о своей семье на английском.', en: 'My family for kids: mum, dad, sister, brother, grandma and grandpa with audio, I have got a cousin and She has got long hair, a listening and exercises. At the end the child tells and writes a few sentences about their family.' },
  },
};

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = find(params.id);
  if (!p) return {};
  const aims = (p.aims ?? '').split('\n').filter(Boolean).slice(0, 2).join('. ');
  const lang = getLang();
  const L = (x: { uk: string; ru: string; en: string }) => (lang === 'ru' ? x.ru : lang === 'en' ? x.en : x.uk);
  // заголовок під пошук: назва уроку + рівень + «безкоштовно», опис: тема, цілі й що є на сторінці
  const title = `${p.title}: ${L({ uk: 'урок англійської', ru: 'урок английского', en: 'English lesson' })} ${p.level} | Murly`;
  const extra = L({ uk: 'Безкоштовно: вправи з автоперевіркою, слова з озвучкою, питання для розмови.', ru: 'Бесплатно: упражнения с автопроверкой, слова с озвучкой, вопросы для разговора.', en: 'Free: self-checking exercises, words with audio, speaking questions.' });
  const description = [p.topic, aims].filter(Boolean).join('. ').slice(0, 200) + '. ' + extra;
  const o = SEO[params.id];
  if (o) return { title: { absolute: L(o.title) }, description: L(o.desc), alternates: alt(`/lessons/${params.id}`) };
  return { title, description, alternates: alt(`/lessons/${params.id}`) };
}

export default async function LessonPage({ params }: { params: { id: string } }) {
  const plan = find(params.id);
  if (!plan) {
    // старі адреси «…-vocabulary» ведуть на сам урок
    const base = params.id.replace(/-vocabulary$/, '');
    if (base !== params.id && find(base)) permanentRedirect(`/lessons/${base}`);
    notFound();
  }
  const { userId } = await auth();
  let teacher = false;
  if (userId) {
    const [t, u] = await Promise.all([isTeacher(userId).catch(() => false), currentUser().catch(() => null)]);
    teacher = t || (u?.unsafeMetadata as { role?: string } | undefined)?.role === 'teacher';
  }
  return (
    <>
      <SiteNav />
      <main className="mu-container lp-wrap">{SEO[params.id] && <p className="lp-seo-intro">{(() => { const l = getLang(); const x = SEO[params.id].intro; return l === 'ru' ? x.ru : l === 'en' ? x.en : x.uk; })()}</p>}<LessonPublic plan={plan} isTeacher={teacher} signedIn={!!userId} /></main>
      <SiteFooter />
      <Stickers />
    </>
  );
}
