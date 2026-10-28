'use client';
// Урок у Murly: відео зліва, дошка справа. На телефоні відео зверху.
import { useEffect, useState } from 'react';
import BoardLazy from '@/components/board/BoardLazy';
import type { LibItem, PageItem, FileItem } from '@/components/board/Board';
import type { Plan } from '@/lib/lesson';
import { useT } from '@/components/LangProvider';

type Props = { studentId: string; me: string; teacher?: boolean; plans?: Plan[]; library?: LibItem[]; pages?: PageItem[]; files?: FileItem[]; words?: { en: string; uk: string }[]; title?: string };

export default function LessonRoom(p: Props) {
  const t = useT();
  const [room, setRoom] = useState<{ url?: string; external?: string; error?: string } | null>(null);
  const [wide, setWide] = useState(38);
  const [hide, setHide] = useState(false);
  useEffect(() => { fetch(`/api/room?student=${p.studentId}`).then((r) => r.json()).then(setRoom).catch(() => setRoom({ error: 'x' })); }, [p.studentId]);
  const src = room?.url ? `${room.url}?userName=${encodeURIComponent(p.me)}` : '';
  return (
    <div className={`lr ${hide ? 'is-novideo' : ''}`} style={{ ['--lr-w' as string]: `${wide}%` }}>
      <div className="lr-video">
        <div className="lr-video__bar">
          <b>{t({ uk: 'Відео', ru: 'Видео', en: 'Video' })}</b>
          <input type="range" min={24} max={60} value={wide} onChange={(e) => setWide(Number(e.target.value))} aria-label={t({ uk: 'Ширина відео', ru: 'Ширина видео', en: 'Video width' })} />
          <button type="button" className="t-link-btn" onClick={() => setHide(!hide)}>{hide ? t({ uk: 'Показати відео', ru: 'Показать видео', en: 'Show video' }) : t({ uk: 'Сховати', ru: 'Скрыть', en: 'Hide' })}</button>
        </div>
        {!hide && (src
          ? <iframe className="lr-frame" src={src} allow="camera; microphone; fullscreen; display-capture; autoplay; speaker-selection" title="Video" />
          : <div className="lr-ext">
              {!room ? <p className="t-muted">…</p>
                : room.external ? <>
                    <p>{t({ uk: 'Відеодзвінок відкриється в окремій вкладці, а дошка залишиться тут.', ru: 'Видеозвонок откроется в отдельной вкладке, а доска останется здесь.', en: 'The call opens in a new tab and the board stays here.' })}</p>
                    <a href={room.external} target="_blank" rel="noreferrer" className="mu-btn mu-btn--lime">{t({ uk: 'Відкрити дзвінок', ru: 'Открыть звонок', en: 'Open the call' })}</a>
                  </>
                : <p className="t-muted">{t({ uk: 'Посилання на дзвінок ще не додане. Учитель може вставити його в налаштуваннях.', ru: 'Ссылка на звонок ещё не добавлена. Учитель может вставить её в настройках.', en: 'No call link yet. The teacher can add one in settings.' })}</p>}
            </div>)}
      </div>
      <div className="lr-board">
        <BoardLazy studentId={p.studentId} me={p.me} teacher={p.teacher} plans={p.plans} library={p.library} pages={p.pages} files={p.files} words={p.words} title={p.title} />
      </div>
    </div>
  );
}
