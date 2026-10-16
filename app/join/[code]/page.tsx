import Link from 'next/link';
import type { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Icon from '@/components/Icon';
import SiteNav from '@/components/SiteNav';
import { claimInvite, inviteInfo } from '@/lib/student-data';
import { tr } from '@/lib/i18n-server';
import Kit from '@/components/Kit';

export function generateMetadata(): Metadata {
  const t = tr();
  return { title: t({ uk: 'Запрошення в Murly', ru: 'Приглашение в Murly', en: 'Invitation to Murly' }), robots: { index: false, follow: false } };
}
export const dynamic = 'force-dynamic';

function Box({ title, text, children }: { title: string; text: string; children?: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero">
        <div className="mu-container">
          <Kit id="st-girl-bow" className="kit-hero" />
          <span className="mu-section__eyebrow"><Icon id="d-send" />{tr()({ uk: 'Запрошення', ru: 'Приглашение', en: 'Invitation' })}</span>
          <h1>{title}</h1>
          <p>{text}</p>
          <div className="mu-hero__cta">{children}</div>
        </div>
      </section>
    </>
  );
}

export default async function JoinPage({ params }: { params: { code: string } }) {
  const t = tr();
  const code = params.code.toLowerCase();
  const info = await inviteInfo(code);
  if (!info) return <Box title={t({ uk: 'Посилання не працює', ru: 'Ссылка не работает', en: 'This link doesn’t work' })} text={t({ uk: 'Можливо, в ньому помилка або вчитель створив нове. Попроси надіслати посилання ще раз.', ru: 'Возможно, в ней ошибка или учитель создал новую. Попроси прислать ссылку ещё раз.', en: 'There may be a typo, or your teacher made a new one. Ask them to send the link again.' })} />;

  const { userId } = await auth();
  const back = `/join/${code}`;
  const teacher = info.teacherName ? `${info.teacherName} ${t({ uk: 'запрошує', ru: 'приглашает', en: 'invites' })}` : t({ uk: 'Тебе запрошують', ru: 'Тебя приглашают', en: 'You are invited' });

  if (!userId) {
    return (
      <Box title={info.teacherName ? `${teacher} ${t({ uk: 'тебе в Murly', ru: 'тебя в Murly', en: 'you to Murly' })}` : `${teacher} ${t({ uk: 'в Murly', ru: 'в Murly', en: 'to Murly' })}`} text={`${t({ uk: 'Тут буде твій розклад занять, словник від учителя та ігри з твоїми словами. Створи акаунт або увійди, щоб приєднатися як', ru: 'Здесь будет твоё расписание занятий, словарь от учителя и игры с твоими словами. Создай аккаунт или войди, чтобы присоединиться как', en: 'Here you will find your lesson schedule, words from your teacher and games with them. Create an account or log in to join as' })} ${info.studentName}.`}>
        <Link href={`/sign-up?redirect_url=${encodeURIComponent(back)}&role=student`} className="mu-btn mu-btn--lime mu-btn--lg">
          {t({ uk: 'Створити акаунт', ru: 'Создать аккаунт', en: 'Create an account' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
        </Link>
        <Link href={`/sign-in?redirect_url=${encodeURIComponent(back)}`} className="mu-btn mu-btn--lg">{t({ uk: 'У мене вже є акаунт', ru: 'У меня уже есть аккаунт', en: 'I already have an account' })}</Link>
      </Box>
    );
  }

  const res = await claimInvite(code, userId);
  if (res === 'ok') redirect('/student');
  if (res === 'own') return <Box title={t({ uk: 'Це твоє запрошення', ru: 'Это твоё приглашение', en: 'This is your own invitation' })} text={t({ uk: 'Це посилання створене з твого акаунта вчителя. Надішли його учню, щоб він приєднався.', ru: 'Эта ссылка создана из твоего аккаунта учителя. Отправь её ученику, чтобы он присоединился.', en: 'This link was created from your teacher account. Send it to your student so they can join.' })}><Link href="/teacher/students" className="mu-btn mu-btn--lg">{t({ uk: 'До учнів', ru: 'К ученикам', en: 'To students' })}</Link></Box>;
  if (res === 'taken') return <Box title={t({ uk: 'Запрошення вже використане', ru: 'Приглашение уже использовано', en: 'This invitation is already used' })} text={t({ uk: 'До цієї картки учня вже приєднався інший акаунт. Попроси вчителя створити нове посилання.', ru: 'К этой карточке ученика уже присоединился другой аккаунт. Попроси учителя создать новую ссылку.', en: 'Another account has already joined this student card. Ask your teacher to create a new link.' })} />;
  return <Box title={t({ uk: 'Щось пішло не так', ru: 'Что-то пошло не так', en: 'Something went wrong' })} text={t({ uk: 'Спробуй ще раз трохи пізніше.', ru: 'Попробуй ещё раз чуть позже.', en: 'Please try again a bit later.' })} />;
}
