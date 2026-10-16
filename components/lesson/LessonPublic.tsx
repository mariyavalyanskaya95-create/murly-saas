'use client';
// Сторінка готового уроку: картка (рівень, теги, що буде на уроці) і весь урок на одній сторінці.
// Перемикач «Версія учня / Версія вчителя»: у вчителя нотатки до етапів і всі відповіді.
import Link from 'next/link';
import { useState } from 'react';
import Icon from '@/components/Icon';
import LessonView from './LessonView';
import { useT } from '@/components/LangProvider';
import { ageLabel, type Plan } from '@/lib/lesson';

export default function LessonPublic({ plan, isTeacher, signedIn }: { plan: Plan; isTeacher: boolean; signedIn: boolean }) {
  const t = useT();
  const [ver, setVer] = useState<'student' | 'teacher'>('student');
  const [slides, setSlides] = useState(false);
  const aims = (plan.aims ?? '').split('\n').map((x) => x.trim()).filter(Boolean);
  const teacherView = ver === 'teacher' && isTeacher;

  if (slides) return <LessonView plan={plan} slides teacher={teacherView} answerKey={teacherView} onExit={() => setSlides(false)} />;

  return (
    <div className="lp">
      <header className={`lp-card gr--${plan.color}`}>
        <div className="lp-card__main">
          <div className="lp-tags">
            <span className="gr-level">{plan.level}</span>
            <span className="le-tag">{ageLabel(plan.age, t.lang)}</span>
            {(plan.focus ?? []).map((f) => <span key={f} className="le-tag">{f === 'НМТ' && t.lang === 'en' ? 'NMT' : f}</span>)}
            {plan.topic && <span className="le-tag">#{plan.topic}</span>}
            <span className="le-tag"><Icon id="d-clock" />{plan.duration ?? 60} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</span>
          </div>
          <h1>{plan.title}</h1>
          {aims.length > 0 && (
            <>
              <h2 className="lp-sub">{t({ uk: 'Що буде на уроці', ru: 'Что будет на уроке', en: 'In this lesson' })}</h2>
              <ul className="lp-aims">{aims.map((a, i) => <li key={i}>{a}</li>)}</ul>
            </>
          )}
        </div>
        <div className="lp-card__side">
          <div className="lp-switch" role="tablist" aria-label={t({ uk: 'Версія уроку', ru: 'Версия урока', en: 'Lesson version' })}>
            <button role="tab" aria-selected={ver === 'student'} className={ver === 'student' ? 'is-on' : ''} onClick={() => setVer('student')}><Icon id="d-kid" />{t({ uk: 'Версія учня', ru: 'Версия ученика', en: 'Student’s version' })}</button>
            <button role="tab" aria-selected={ver === 'teacher'} className={ver === 'teacher' ? 'is-on' : ''} onClick={() => setVer('teacher')}><Icon id="d-team" />{t({ uk: 'Версія вчителя', ru: 'Версия учителя', en: 'Teacher’s version' })}</button>
          </div>
          <div className="lp-actions">
            <button className="mu-btn mu-btn--ink" onClick={() => setSlides(true)}><Icon id="e-board" />{t({ uk: 'Презентація на урок', ru: 'Презентация на урок', en: 'Online presentation' })}</button>
            <button className="mu-btn" onClick={() => window.print()}><Icon id="e-book" />{t({ uk: 'Друк A4', ru: 'Печать A4', en: 'Print A4' })}</button>
            {isTeacher
              ? <Link href={`/teacher/lessons/${plan.id}`} className="mu-btn mu-btn--lime">{t({ uk: 'Задати учню', ru: 'Задать ученику', en: 'Assign to a student' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>
              : <Link href="/sign-up?role=teacher" className="mu-btn mu-btn--lime">{t({ uk: 'Вести цей урок', ru: 'Вести этот урок', en: 'Teach this lesson' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>}
          </div>
        </div>
      </header>

      {ver === 'teacher' && !isTeacher ? (
        <div className="lp-lock">
          <Icon id="d-lock" className="mu-ic lp-lock__ic" />
          <div>
            <h2>{t({ uk: 'Версія вчителя з відповідями', ru: 'Версия учителя с ответами', en: 'Teacher’s version with answers' })}</h2>
            <p>{t({
              uk: 'Нотатки до кожного етапу, таймінг і всі правильні відповіді. Доступна в кабінеті вчителя, щоб учні не бачили відповідей.',
              ru: 'Заметки к каждому этапу, тайминг и все правильные ответы. Доступна в кабинете учителя, чтобы ученики не видели ответов.',
              en: 'Notes for every stage, timing and all the correct answers. Available in the teacher dashboard, so students can’t see the answers.',
            })}</p>
            <Link href={signedIn ? '/dashboard' : '/sign-up?role=teacher'} className="mu-btn mu-btn--lime">{signedIn ? t({ uk: 'До кабінету', ru: 'В кабинет', en: 'Go to dashboard' }) : t({ uk: 'Створити кабінет вчителя', ru: 'Создать кабинет учителя', en: 'Create a teacher dashboard' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>
          </div>
        </div>
      ) : (
        <div className={`lp-body ${teacherView ? 'is-teacher' : ''}`}>
          {teacherView && <div className="lp-banner"><Icon id="d-team" />{t({ uk: 'Версія вчителя: нотатки до етапів і правильні відповіді вже вписані.', ru: 'Версия учителя: заметки к этапам и правильные ответы уже вписаны.', en: 'Teacher’s version: stage notes and the correct answers are filled in.' })}</div>}
          <LessonView key={ver} plan={plan} teacher={teacherView} answerKey={teacherView} />
        </div>
      )}
    </div>
  );
}
