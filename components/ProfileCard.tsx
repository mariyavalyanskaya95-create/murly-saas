'use client';
// «Мій профіль»: нік і аватар (котик Murly або своє фото). Зберігаємо в Clerk (unsafeMetadata + фото профілю).
import { useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Avatar, { AVATAR_BG, AVATAR_KITS } from './Avatar';
import Kit from './Kit';
import { useT } from './LangProvider';

export default function ProfileCard() {
  const t = useT();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const meta = (user?.unsafeMetadata ?? {}) as { nick?: string; avatar?: string };
  const [open, setOpen] = useState(false);
  const [nick, setNick] = useState<string | null>(null);
  const [kit, setKit] = useState<string | null>(null);
  const [bg, setBg] = useState<string | null>(null);
  const [usePhoto, setUsePhoto] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const file = useRef<HTMLInputElement>(null);
  if (!isLoaded || !user) return null;

  const [k0, b0] = (meta.avatar || '').split('|');
  const curNick = nick ?? meta.nick ?? '';
  const curKit = kit ?? (k0 || 'st-cat-cool');
  const curBg = bg ?? (b0 || AVATAR_BG[0]);
  const photo = usePhoto ?? (!meta.avatar && user.hasImage);
  const preview = photo ? '' : `${curKit}|${curBg}`;

  const save = async () => {
    setSaving(true); setMsg('');
    try {
      await user.update({ unsafeMetadata: { ...user.unsafeMetadata, nick: curNick.trim().slice(0, 24), avatar: preview } });
      setMsg(t({ uk: 'Збережено', ru: 'Сохранено', en: 'Saved' }));
      router.refresh();
    } catch { setMsg(t({ uk: 'Не вдалося зберегти', ru: 'Не удалось сохранить', en: 'Could not save' })); }
    setSaving(false);
  };
  const upload = async (f: File) => {
    if (f.size > 5 * 1024 * 1024) { setMsg(t({ uk: 'Фото має бути до 5 МБ', ru: 'Фото должно быть до 5 МБ', en: 'The photo must be under 5 MB' })); return; }
    setSaving(true); setMsg('');
    try { await user.setProfileImage({ file: f }); await user.reload(); setUsePhoto(true); setMsg(t({ uk: 'Фото завантажено. Натисни «Зберегти».', ru: 'Фото загружено. Нажми «Сохранить».', en: 'Photo uploaded. Press Save.' })); }
    catch { setMsg(t({ uk: 'Не вдалося завантажити фото', ru: 'Не удалось загрузить фото', en: 'Could not upload the photo' })); }
    setSaving(false);
  };

  return (
    <section className="t-card u-prof">
      <div className="u-prof__head">
        <Avatar avatar={meta.avatar} image={user.imageUrl} name={meta.nick || user.firstName || ''} />
        <div>
          <b>{meta.nick || user.firstName || t({ uk: 'Без ніка', ru: 'Без ника', en: 'No nickname' })}</b>
          <small className="t-muted">{t({ uk: 'Мій профіль', ru: 'Мой профиль', en: 'My profile' })}</small>
        </div>
        <button type="button" className="mu-btn t-btn-sm" onClick={() => setOpen(!open)}>{open ? t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' }) : t({ uk: 'Змінити нік і аватар', ru: 'Изменить ник и аватар', en: 'Change nickname and avatar' })}</button>
      </div>
      {open && (
        <div className="u-prof__body">
          <label className="u-prof__nick">{t({ uk: 'Нік', ru: 'Ник', en: 'Nickname' })}
            <input value={curNick} maxLength={24} onChange={(e) => setNick(e.target.value)} placeholder={t({ uk: 'Напр. CatLover', ru: 'Напр. CatLover', en: 'e.g. CatLover' })} />
          </label>
          <small>{t({ uk: 'Обери котика', ru: 'Выбери котика', en: 'Pick a cat' })}</small>
          <div className="u-prof__kits">
            {AVATAR_KITS.map((k) => (
              <button key={k} type="button" className={`u-prof__kit ${!photo && curKit === k ? 'is-on' : ''}`} style={{ background: curBg }} onClick={() => { setKit(k); setUsePhoto(false); }} aria-label={k}><Kit id={k} /></button>
            ))}
          </div>
          <small>{t({ uk: 'Колір фону', ru: 'Цвет фона', en: 'Background colour' })}</small>
          <div className="u-prof__bgs">
            {AVATAR_BG.map((c) => <button key={c} type="button" className={`u-prof__bg ${curBg === c ? 'is-on' : ''}`} style={{ background: c }} onClick={() => { setBg(c); setUsePhoto(false); }} aria-label={c} />)}
          </div>
          <small>{t({ uk: 'Або своє фото', ru: 'Или своё фото', en: 'Or your own photo' })}</small>
          <div className="t-head__actions" style={{ flexWrap: 'wrap' }}>
            <input ref={file} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }} />
            <button type="button" className="mu-btn t-btn-sm" onClick={() => file.current?.click()} disabled={saving}>{t({ uk: 'Завантажити фото', ru: 'Загрузить фото', en: 'Upload a photo' })}</button>
            {user.hasImage && <button type="button" className={`mu-btn t-btn-sm ${photo ? 'mu-btn--lime' : ''}`} onClick={() => setUsePhoto(true)}>{t({ uk: 'Використати моє фото', ru: 'Использовать моё фото', en: 'Use my photo' })}</button>}
          </div>
          <div className="u-prof__save">
            <Avatar avatar={preview} image={user.imageUrl} name={curNick} className="t-avatar--lg" />
            <button type="button" className="mu-btn mu-btn--lime" onClick={save} disabled={saving}>{saving ? '…' : t({ uk: 'Зберегти', ru: 'Сохранить', en: 'Save' })}</button>
            {msg && <span className="t-muted">{msg}</span>}
          </div>
        </div>
      )}
    </section>
  );
}
