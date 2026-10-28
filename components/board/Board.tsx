'use client';
// Дошка учня (як Miro) на Excalidraw. Спільна для вчителя й учня:
// зміни відправляються на сервер і підтягуються кожні ~1,2 с, усе зберігається.
import { useCallback, useEffect, useRef, useState } from 'react';
import { CaptureUpdateAction, Excalidraw, MainMenu, convertToExcalidrawElements } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';
import type { Plan, Block } from '@/lib/lesson';
import type { Section } from '@/lib/exercise';
import { useT } from '@/components/LangProvider';

/* eslint-disable @typescript-eslint/no-explicit-any */
type El = { id: string; version: number; isDeleted?: boolean; y: number; height: number; x: number; [k: string]: any };
type Word = { en: string; uk: string };
const LANG: Record<string, string> = { uk: 'uk-UA', ru: 'ru-RU', en: 'en' };

export type LibItem = { id: string; title: string; level: string };

export default function Board({ studentId, plans = [], library = [], words = [], title, teacher = false }: { studentId: string; plans?: Plan[]; library?: LibItem[]; words?: Word[]; title?: string; teacher?: boolean }) {
  const t = useT();
  const [api, setApi] = useState<any>(null);
  const [status, setStatus] = useState<'loading' | 'ok' | 'offline'>('loading');
  const [busy, setBusy] = useState(false);
  const sent = useRef(new Map<string, number>()); // що вже є на сервері: id → version
  const sentFiles = useRef(new Set<string>());
  const ver = useRef(-1);
  const pushing = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // підтягнути зміни з сервера і злити з локальними (новіша версія перемагає)
  const pull = useCallback(async () => {
    if (!api) return;
    try {
      const r = await fetch(`/api/board?student=${studentId}&since=${ver.current}`, { cache: 'no-store' });
      if (!r.ok) { setStatus('offline'); return; }
      const j = await r.json();
      setStatus('ok');
      if (!Array.isArray(j.elements)) return;
      const have = api.getFiles() as Record<string, unknown>;
      const missing = (j.fileIds as string[] ?? []).filter((id) => !have[id]);
      for (let i = 0; i < missing.length; i += 10) {
        const f = await fetch(`/api/board?student=${studentId}&files=${missing.slice(i, i + 10).join(',')}`).then((x) => x.json()).catch(() => ({}));
        const list = Object.values(f.files ?? {});
        if (list.length) api.addFiles(list);
        list.forEach((x: any) => sentFiles.current.add(x.id));
      }
      const local = api.getSceneElementsIncludingDeleted() as El[];
      const byId = new Map(local.map((e) => [e.id, e]));
      let changed = false;
      for (const e of j.elements as El[]) {
        const l = byId.get(e.id);
        if (!l || l.version < e.version) { byId.set(e.id, e); changed = true; }
        sent.current.set(e.id, Math.max(sent.current.get(e.id) ?? -1, e.version));
      }
      ver.current = j.version;
      if (changed) {
        const order = [...local.map((e) => e.id), ...(j.elements as El[]).map((e) => e.id).filter((id) => !local.some((l) => l.id === id))];
        api.updateScene({ elements: order.map((id) => byId.get(id)), captureUpdate: CaptureUpdateAction.NEVER });
      }
    } catch { setStatus('offline'); }
  }, [api, studentId]);

  // відправити локальні зміни
  const push = useCallback(async () => {
    if (!api || pushing.current) return;
    const els = api.getSceneElementsIncludingDeleted() as El[];
    const changed = els.filter((e) => (sent.current.get(e.id) ?? -1) < e.version);
    const files = api.getFiles() as Record<string, any>;
    const newFiles: Record<string, unknown> = {};
    Object.values(files).forEach((f: any) => { if (!sentFiles.current.has(f.id)) newFiles[f.id] = f; });
    if (!changed.length && !Object.keys(newFiles).length) return;
    pushing.current = true;
    try {
      const r = await fetch('/api/board', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ student: studentId, elements: changed, files: newFiles }) });
      if (r.ok) {
        const j = await r.json();
        changed.forEach((e) => sent.current.set(e.id, e.version));
        Object.keys(newFiles).forEach((id) => sentFiles.current.add(id));
        if (j.version === ver.current + 1) ver.current = j.version; // ніхто інший не встиг змінити
        setStatus('ok');
      } else setStatus('offline');
    } catch { setStatus('offline'); }
    pushing.current = false;
  }, [api, studentId]);

  useEffect(() => {
    if (!api) return;
    pull();
    const id = setInterval(() => { pull(); push(); }, 1200);
    const flush = () => { push(); };
    window.addEventListener('beforeunload', flush);
    return () => { clearInterval(id); window.removeEventListener('beforeunload', flush); push(); };
  }, [api, pull, push]);

  const onChange = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { push(); }, 350);
  }, [push]);

  // Вивести урок або слова на дошку: під наявним вмістом
  const bottom = () => {
    const els = (api?.getSceneElements() ?? []) as El[];
    return els.length ? Math.max(...els.map((e) => e.y + (e.height || 0))) + 80 : 0;
  };
  const insert = async (skeleton: any[]) => {
    if (!api || !skeleton.length) return;
    const add = convertToExcalidrawElements(skeleton, { regenerateIds: true });
    api.updateScene({ elements: [...api.getSceneElementsIncludingDeleted(), ...add], captureUpdate: CaptureUpdateAction.IMMEDIATELY });
    api.scrollToContent(add, { fitToContent: true, animate: true });
    push();
  };
  const addPlan = async (p: Plan) => {
    setBusy(true);
    let y = bottom(); const x = 0;
    const sk: any[] = [];
    const text = (s: string, size = 20) => { if (!s.trim()) return; sk.push({ type: 'text', x, y, text: s, fontSize: size }); y += Math.ceil(s.split('\n').length * size * 1.35) + 18; };
    text(p.title, 36);
    for (const b of p.blocks as Block[]) {
      if (b.type === 'heading') text(b.text, 28);
      else if (b.type === 'text' || b.type === 'tip') text(b.text);
      else if (b.type === 'vocab') text(b.words.map((w) => `• ${w.en} — ${w.uk}`).join('\n'));
      else if (b.type === 'speaking') text(b.questions.map((q, i) => `${i + 1}. ${q}`).join('\n'));
      else if (b.type === 'audio') text(`${b.title ? `${b.title}\n` : ''}${b.script}`, 18);
      else if (b.type === 'pdf') text(`${b.name ?? 'PDF'}: ${b.url}`, 16);
      else if (b.type === 'video') text(`${b.caption ?? 'Video'}: ${b.url}`, 16);
      else if (b.type === 'exercise') {
        (b.sections as Section[]).forEach((s) => {
          text(s.instruction, 22);
          text(s.tasks.map((k, i) => `${i + 1}. ${k.parts ? k.parts.map((pt) => (pt.t === 'text' ? pt.v : pt.t === 'gap' ? '________' : `(${pt.options.join(' / ')})`)).join('') : k.prompt ?? ''}`).join('\n'));
        });
      } else if (b.type === 'image') {
        try {
          const blob = await fetch(b.url).then((r) => r.blob());
          const dataURL: string = await new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(String(fr.result)); fr.readAsDataURL(blob); });
          const dim: { w: number; h: number } = await new Promise((res) => { const im = new Image(); im.onload = () => res({ w: im.width, h: im.height }); im.onerror = () => res({ w: 600, h: 400 }); im.src = dataURL; });
          const w = Math.min(600, dim.w); const h = Math.round((dim.h / dim.w) * w);
          const fileId = `img${Math.random().toString(36).slice(2, 12)}`;
          api.addFiles([{ id: fileId, dataURL, mimeType: blob.type || 'image/png', created: Date.now() }]);
          sk.push({ type: 'image', x, y, width: w, height: h, fileId });
          y += h + 24;
          if (b.caption) text(b.caption, 16);
        } catch { text(b.url, 16); }
      }
    }
    await insert(sk);
    setBusy(false);
  };
  const addWords = () => {
    if (!words.length) return;
    const y = bottom();
    insert([{ type: 'text', x: 0, y, text: t({ uk: 'Слова', ru: 'Слова', en: 'Words' }), fontSize: 28 },
      { type: 'text', x: 0, y: y + 48, text: words.slice(0, 40).map((w) => `• ${w.en} — ${w.uk}`).join('\n'), fontSize: 20 }]);
  };

  return (
    <div className="bd">
      <div className="bd-bar">
        {title && <b className="bd-title">{title}</b>}
        <span className={`bd-st is-${status}`}>{status === 'ok' ? t({ uk: 'Збережено', ru: 'Сохранено', en: 'Saved' }) : status === 'offline' ? t({ uk: 'Немає зв’язку, зміни збережуться пізніше', ru: 'Нет связи, изменения сохранятся позже', en: 'Offline, changes will sync later' }) : t({ uk: 'Завантажую…', ru: 'Загружаю…', en: 'Loading…' })}</span>
        {teacher && (plans.length > 0 || library.length > 0) && (
          <select className="bd-sel" value="" disabled={busy} onChange={async (e) => {
            const id = e.target.value;
            const own = plans.find((x) => x.id === id);
            if (own) return addPlan(own);
            if (!id) return;
            setBusy(true);
            const p = await fetch(`/api/library?id=${encodeURIComponent(id)}&lang=${t.lang}`).then((r) => (r.ok ? r.json() : null)).catch(() => null);
            setBusy(false);
            if (p?.blocks) addPlan(p as Plan);
          }} aria-label={t({ uk: 'Вивести урок на дошку', ru: 'Вывести урок на доску', en: 'Put a lesson on the board' })}>
            <option value="">{busy ? t({ uk: 'Виводжу…', ru: 'Вывожу…', en: 'Adding…' }) : t({ uk: '+ Вивести урок', ru: '+ Вывести урок', en: '+ Add a lesson' })}</option>
            {plans.length > 0 && <optgroup label={t({ uk: 'Мої уроки', ru: 'Мои уроки', en: 'My lessons' })}>{plans.map((p) => <option key={p.id} value={p.id}>{p.title}{p.level ? ` · ${p.level}` : ''}</option>)}</optgroup>}
            {library.length > 0 && <optgroup label={t({ uk: 'Готові уроки', ru: 'Готовые уроки', en: 'Ready-made lessons' })}>{library.map((p) => <option key={p.id} value={p.id}>{p.title} · {p.level}</option>)}</optgroup>}
          </select>
        )}
        {words.length > 0 && <button type="button" className="mu-btn t-btn-sm" onClick={addWords}>{t({ uk: '+ Слова учня', ru: '+ Слова ученика', en: '+ Student words' })}</button>}
        <span className="bd-tip">{t({ uk: 'Картинки й скріншоти: перетягни або встав Ctrl+V', ru: 'Картинки и скриншоты: перетащи или вставь Ctrl+V', en: 'Images and screenshots: drag in or paste with Ctrl+V' })}</span>
      </div>
      <div className="bd-canvas">
        <Excalidraw excalidrawAPI={(a: any) => setApi(a)} onChange={onChange} langCode={LANG[t.lang] ?? 'en'}
          initialData={{ appState: { viewBackgroundColor: '#FFFDF8', currentItemFontFamily: 2 } }}
          UIOptions={{ canvasActions: { loadScene: false, saveToActiveFile: false, export: { saveFileToDisk: true } } }}>
          <MainMenu>
            <MainMenu.DefaultItems.Export />
            <MainMenu.DefaultItems.SaveAsImage />
            {teacher && <MainMenu.DefaultItems.ClearCanvas />}
            <MainMenu.DefaultItems.ChangeCanvasBackground />
            <MainMenu.DefaultItems.Help />
          </MainMenu>
        </Excalidraw>
      </div>
    </div>
  );
}
