'use client';
// Перший вхід без ролі (наприклад, через Google зі сторінки входу): питаємо, хто ти, і ведемо в потрібний кабінет
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Icon from '@/components/Icon';
import Kit from '@/components/Kit';
import { useT } from '@/components/LangProvider';
import { ROLE_CARDS } from '@/lib/roles';

export default function Welcome() {
  const t = useT();
  const router = useRouter();
  const { user } = useUser();
  const [busy, setBusy] = useState<string | null>(null);
  const pick = async (role: 'teacher' | 'student', track?: string, id?: string) => {
    setBusy(id ?? role);
    try { await user?.update({ unsafeMetadata: { ...(user.unsafeMetadata ?? {}), role, ...(track ? { track } : {}) } }); } catch { /* */ }
    router.replace(role === 'teacher' ? '/teacher' : '/student');
  };
  return (
    <main className="mu-container wl">
      <Kit id="st-cat-blep" className="wl__cat" />
      <h1>{t({ uk: 'Хто ти?', ru: 'Кто ты?', en: 'Who are you?' })}</h1>
      <p className="wl__lead">{t({ uk: 'Обери, і ми відкриємо потрібний кабінет. Змінити можна будь-коли.', ru: 'Выбери, и мы откроем нужный кабинет. Изменить можно в любой момент.', en: 'Choose and we’ll open the right dashboard. You can change it any time.' })}</p>
      <div className="auth-roles auth-roles--4">
        {ROLE_CARDS.map((c) => (
          <button key={c.id} type="button" className={`mu-role mu-role--${c.color}`} disabled={!!busy} onClick={() => pick(c.role, c.track, c.id)}>
            <span className="mu-role__ic"><Icon id={c.icon} /></span>
            <h3>{t(c.title)}</h3>
            <span>{t(c.text)}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
