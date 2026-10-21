'use client';
// «Моя сторінка»: нік, аватар (котик Murly або своє фото), улюблена пісня, «про себе» і обкладинка з фоном і стікерами.
// Зберігаємо в Clerk (unsafeMetadata + фото профілю).
import { useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Avatar, { AVATAR_BG, AVATAR_KITS } from './Avatar';
import Kit from './Kit';
import ProfileBanner, { MAX_ITEMS, PAGE_BGS, PAGE_EMOJI, PAGE_ICONS, PAGE_KITS, Sticker, type PageDeco } from './ProfileBanner';
import { useT } from './LangProvider';

type Meta = { nick?: string; avatar?: string; song?: string; songUrl?: string; bio?: string; page?: PageDeco };

export default function ProfileCard() {
  const t = useT();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const meta = (user?.unsafeMetadata ?? {}) as Meta;
  const [open, setOpen] = useState(false);
  const [nick, setNick] = useState<string | null>(null);
  const [song, setSong] = useState<string | null>(null);
  const [songUrl, setSongUrl] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [page, setPage] = useState<PageDeco | null>(null);
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
  const curPage: PageDeco = page ?? meta.page ?? { bg: 'lime', items: [] };
  const count = (curPage.items ?? []).length;
  const addSticker = (k: string) => {
    const items = curPage.items ?? [];
    if (items.length >= MAX_ITEMS) return;
    setPage({ ...curPage, items: [...items, { k, x: 30 + Math.round(Math.random() * 60), y: 15 + Math.round(Math.random() * 45), s: 1 }] });
  };

  const save = async () => {
    setSaving(true); setMsg('');
    try {
      await user.update({ unsafeMetadata: {
        ...user.unsafeMetadata,
        nick: curNick.trim().slice(0, 24),
        avatar: preview,
        song: (song ?? meta.song ?? '').trim().slice(0, 100),
        songUrl: (songUrl ?? meta.songUrl ?? '').trim().slice(0, 300),
        bio: (bio ?? meta.bio ?? '').trim().slice(0, 400),
        page: { bg: curPage.bg || 'lime', items: (curPage.items ?? []).slice(0, MAX_ITEMS) },
      } });
      setMsg(t({ uk: 'Збережено', ru: 'Сохранено', en: 'Saved' }));
      setOpen(false);
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
  const shownNick = (open ? curNick : meta.nick) || user.firstName || t({ uk: 'Без ніка', ru: 'Без ника', en: 'No nickname' });

  return (
    <section className="t-card u-prof">
      <ProfileBanner deco={open ? curPage : (meta.page ?? { bg: 'lime', items: [] })} edit={open} onChange={setPage}>
        <Avatar avatar={open ? preview : meta.avatar} image={user.imageUrl} name={shownNick} className="t-avatar--lg" />
        <b className="u-banner__nick">{shownNick}</b>
      </ProfileBanner>

      <div className="u-prof__head">
        <div>
          {meta.song && <small>{t({ uk: 'Улюблена пісня', ru: 'Любимая песня', en: 'Favourite song' })}: <b>{meta.song}</b>{meta.songUrl && /^https?:\/\//.test(meta.songUrl) && <> · <a href={meta.songUrl} target="_blank" rel="noreferrer">{t({ uk: 'слухати', ru: 'слушать', en: 'listen' })}</a></>}</small>}
          {meta.bio && <small className="u-prof__bio">{meta.bio}</small>}
          {!meta.song && !meta.bio && <small className="t-muted">{t({ uk: 'Розкажи про себе, додай улюблену пісню й оформи сторінку.', ru: 'Расскажи о себе, добавь любимую песню и оформи страницу.', en: 'Tell us about yourself, add your favourite song and decorate your page.' })}</small>}
        </div>
        <button type="button" className="mu-btn t-btn-sm" onClick={() => setOpen(!open)}>{open ? t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' }) : t({ uk: 'Оформити сторінку', ru: 'Оформить страницу', en: 'Decorate my page' })}</button>
      </div>

      {open && (
        <div className="u-prof__body">
          <label className="u-prof__nick">{t({ uk: 'Нік', ru: 'Ник', en: 'Nickname' })}
            <input value={curNick} maxLength={24} onChange={(e) => setNick(e.target.value)} placeholder={t({ uk: 'Напр. CatLover', ru: 'Напр. CatLover', en: 'e.g. CatLover' })} />
          </label>
          <label className="u-prof__nick">{t({ uk: 'Улюблена пісня', ru: 'Любимая песня', en: 'Favourite song' })}
            <input value={song ?? meta.song ?? ''} maxLength={100} onChange={(e) => setSong(e.target.value)} placeholder={t({ uk: 'Виконавець і назва', ru: 'Исполнитель и название', en: 'Artist and title' })} />
          </label>
          <label className="u-prof__nick">{t({ uk: 'Посилання на пісню (необов’язково)', ru: 'Ссылка на песню (необязательно)', en: 'Link to the song (optional)' })}
            <input value={songUrl ?? meta.songUrl ?? ''} maxLength={300} onChange={(e) => setSongUrl(e.target.value)} placeholder="https://youtube.com/..." />
          </label>
          <label className="u-prof__nick u-prof__about">{t({ uk: 'Про себе', ru: 'О себе', en: 'About me' })}
            <textarea rows={3} value={bio ?? meta.bio ?? ''} maxLength={400} onChange={(e) => setBio(e.target.value)} placeholder={t({ uk: 'Хобі, що любиш, навіщо вчиш англійську', ru: 'Хобби, что любишь, зачем учишь английский', en: 'Hobbies, things you love, why you learn English' })} />
          </label>

          <small>{t({ uk: 'Фон сторінки', ru: 'Фон страницы', en: 'Page background' })}</small>
          <div className="u-prof__bgs">
            {PAGE_BGS.map((b) => <button key={b} type="button" className={`u-prof__pbg u-bg--${b} ${curPage.bg === b ? 'is-on' : ''}`} onClick={() => setPage({ ...curPage, bg: b })} aria-label={b} />)}
          </div>
          <small>{t({ uk: `Стікери: натисни, щоб додати, і перетягни на фоні (${count}/${MAX_ITEMS})`, ru: `Стикеры: нажми, чтобы добавить, и перетащи на фоне (${count}/${MAX_ITEMS})`, en: `Stickers: tap to add, then drag them on the background (${count}/${MAX_ITEMS})` })}</small>
          <div className="u-prof__pal">
            {PAGE_KITS.map((k) => <button key={k} type="button" onClick={() => addSticker(k)} aria-label={k}><Sticker k={k} /></button>)}
            {PAGE_ICONS.map((k) => <button key={k} type="button" onClick={() => addSticker(`icon:${k}`)} aria-label={k}><Sticker k={`icon:${k}`} /></button>)}
            {PAGE_EMOJI.map((k) => <button key={k} type="button" onClick={() => addSticker(`emoji:${k}`)} aria-label={k}><Sticker k={`emoji:${k}`} /></button>)}
          </div>
          {count > 0 && <div><button type="button" className="t-link-btn" onClick={() => setPage({ ...curPage, items: [] })}>{t({ uk: 'Прибрати всі стікери', ru: 'Убрать все стикеры', en: 'Remove all stickers' })}</button></div>}

          <small>{t({ uk: 'Обери котика для аватара', ru: 'Выбери котика для аватара', en: 'Pick a cat for your avatar' })}</small>
          <div className="u-prof__kits">
            {AVATAR_KITS.map((k) => (
              <button key={k} type="button" className={`u-prof__kit ${!photo && curKit === k ? 'is-on' : ''}`} style={{ background: curBg }} onClick={() => { setKit(k); setUsePhoto(false); }} aria-label={k}><Kit id={k} /></button>
            ))}
          </div>
          <small>{t({ uk: 'Колір фону аватара', ru: 'Цвет фона аватара', en: 'Avatar background' })}</small>
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
            <button type="button" className="mu-btn mu-btn--lime" onClick={save} disabled={saving}>{saving ? '…' : t({ uk: 'Зберегти', ru: 'Сохранить', en: 'Save' })}</button>
            {msg && <span className="t-muted">{msg}</span>}
          </div>
        </div>
      )}
      {!open && msg && <span className="t-muted">{msg}</span>}
    </section>
  );
}
