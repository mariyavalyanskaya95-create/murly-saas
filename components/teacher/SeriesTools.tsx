'use client';
// Перенести або видалити заняття: лише це чи це й усі наступні такі самі (той самий учень/група, день тижня і час)
import { useState } from 'react';
import { type Lesson, seriesOf, useTeacher } from '@/lib/teacher-store';
import { useT } from '../LangProvider';

const pad = (n: number) => String(n).padStart(2, '0');
const dateStr = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const timeStr = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

export default function SeriesTools({ ls, onDone }: { ls: Lesson[]; onDone?: () => void }) {
  const t = useT();
  const { data, updateLessons, removeLessons } = useTeacher();
  const l = ls[0];
  const s0 = new Date(l.start);
  const [mode, setMode] = useState<null | 'move' | 'del'>(null);
  const [all, setAll] = useState(false);
  const [date, setDate] = useState(dateStr(s0));
  const [time, setTime] = useState(timeStr(s0));
  const [dur, setDur] = useState(String(l.duration));
  // серія: для групи беремо всі рядки учасників, для учня його заняття
  const series = seriesOf(data, l).filter((x) => ls.length > 1 || x.studentId === l.studentId);
  const targets = all ? series : ls;
  const more = series.length - ls.length;

  const move = () => {
    const [y, m, d] = date.split('-').map(Number);
    const [hh, mm] = time.split(':').map(Number);
    const n = new Date(y, m - 1, d, hh, mm);
    const delta = n.getTime() - s0.getTime();
    const duration = Math.max(15, Number(dur) || l.duration);
    updateLessons(targets.map((x) => ({ id: x.id, patch: { start: new Date(new Date(x.start).getTime() + delta).toISOString(), duration } })));
    setMode(null); onDone?.();
  };
  const del = () => { removeLessons(targets.map((x) => x.id)); setMode(null); onDone?.(); };

  const scope = more > 0 && (
    <div className="st-scope" role="radiogroup">
      <label><input type="radio" checked={!all} onChange={() => setAll(false)} />{t({ uk: 'Лише це заняття', ru: 'Только это занятие', en: 'Only this lesson' })}</label>
      <label><input type="radio" checked={all} onChange={() => setAll(true)} />{t({ uk: `Це і всі наступні такі (${series.length / Math.max(1, ls.length)})`, ru: `Это и все следующие такие (${series.length / Math.max(1, ls.length)})`, en: `This and all following (${series.length / Math.max(1, ls.length)})` })}</label>
    </div>
  );

  if (!mode) return (
    <div className="st-row">
      <button type="button" className="mu-btn t-btn-sm" onClick={() => setMode('move')}>{t({ uk: 'Змінити час', ru: 'Изменить время', en: 'Change time' })}</button>
      <button type="button" className="mu-btn t-btn-sm st-del" onClick={() => setMode('del')}>{t({ uk: 'Видалити', ru: 'Удалить', en: 'Delete' })}</button>
    </div>
  );
  if (mode === 'move') return (
    <div className="st-box">
      <div className="st-fields">
        <label>{t({ uk: 'Дата', ru: 'Дата', en: 'Date' })}<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
        <label>{t({ uk: 'Час', ru: 'Время', en: 'Time' })}<input type="time" step={300} value={time} onChange={(e) => setTime(e.target.value)} /></label>
        <label>{t({ uk: 'Хвилин', ru: 'Минут', en: 'Minutes' })}<input type="number" min={15} step={5} value={dur} onChange={(e) => setDur(e.target.value)} /></label>
      </div>
      {scope}
      {all && <p className="t-muted">{t({ uk: 'Усі наступні заняття зсунуться так само: на той самий день тижня і час.', ru: 'Все следующие занятия сдвинутся так же: на тот же день недели и время.', en: 'All following lessons will move the same way.' })}</p>}
      <div className="st-row">
        <button type="button" className="mu-btn mu-btn--lime t-btn-sm" onClick={move}>{t({ uk: 'Зберегти', ru: 'Сохранить', en: 'Save' })}</button>
        <button type="button" className="t-link-btn" onClick={() => setMode(null)}>{t({ uk: 'Скасувати', ru: 'Отмена', en: 'Cancel' })}</button>
      </div>
    </div>
  );
  return (
    <div className="st-box">
      {scope}
      <div className="st-row">
        <button type="button" className="mu-btn t-btn-sm st-del" onClick={del}>{all ? t({ uk: `Видалити ${targets.length / Math.max(1, ls.length)} занять`, ru: `Удалить ${targets.length / Math.max(1, ls.length)} занятий`, en: `Delete ${targets.length / Math.max(1, ls.length)} lessons` }) : t({ uk: 'Видалити це заняття', ru: 'Удалить это занятие', en: 'Delete this lesson' })}</button>
        <button type="button" className="t-link-btn" onClick={() => setMode(null)}>{t({ uk: 'Скасувати', ru: 'Отмена', en: 'Cancel' })}</button>
      </div>
    </div>
  );
}
