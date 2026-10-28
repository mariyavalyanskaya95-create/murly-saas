'use client';
// Дошка учня (як Miro) на Excalidraw. Спільна для вчителя й учня:
// зміни відправляються на сервер і підтягуються кожні ~1,2 с, усе зберігається.
import { useCallback, useEffect, useRef, useState } from 'react';
import { CaptureUpdateAction, Excalidraw, MainMenu, convertToExcalidrawElements } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';
import type { Plan, Block } from '@/lib/lesson';
import type { Section } from '@/lib/exercise';
import { useT } from '@/components/LangProvider';
import { uploadFile } from '@/lib/upload';

/* eslint-disable @typescript-eslint/no-explicit-any */
type El = { id: string; version: number; isDeleted?: boolean; y: number; height: number; x: number; [k: string]: any };
type Word = { en: string; uk: string };
const LANG: Record<string, string> = { uk: 'uk-UA', ru: 'ru-RU', en: 'en' };

export type LibItem = { id: string; title: string; level: string };

export type PageItem = { title: string; href: string; group: string };
export type FileItem = { name: string; url: string };

export default function Board({ studentId, plans = [], library = [], words = [], pages = [], files = [], title, teacher = false }: { studentId: string; plans?: Plan[]; library?: LibItem[]; words?: Word[]; pages?: PageItem[]; files?: FileItem[]; title?: string; teacher?: boolean }) {
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
    api.scrollToContent(add.slice(0, 1), { animate: true }); // показати початок вставленого, без зменшення

    push();
  };
  const addPlan = async (p: Plan) => {
    setBusy(true);
    let y = bottom(); const x = 0;
    const sk: any[] = [];
    // довгі рядки переносимо, щоб текст не тягнувся в одну лінію
    const wrap = (s: string, n: number) => s.split('\n').flatMap((line) => { const out: string[] = []; let cur = ''; line.split(' ').forEach((w) => { if ((cur + ' ' + w).trim().length > n) { if (cur) out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); }); out.push(cur); return out; }).join('\n');
    const text = (s0: string, size = 20) => { if (!s0.trim()) return; const s = wrap(s0, Math.round(1500 / size)); sk.push({ type: 'text', x, y, text: s, fontSize: size }); y += Math.ceil(s.split('\n').length * size * 1.35) + 18; };
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
  // ---- Документи й матеріали на дошку ----
  const fileInput = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [upErr, setUpErr] = useState('');
  const [drawer, setDrawer] = useState(false);
  const [q, setQ] = useState('');
  const [full, setFull] = useState(false);

  // точка на дошці: де відпустили файл, або під наявним вмістом
  const scenePoint = (clientX?: number, clientY?: number) => {
    if (!api || clientX == null || clientY == null) return { x: 0, y: bottom() };
    const st = api.getAppState();
    const z = st.zoom?.value ?? 1;
    return { x: (clientX - st.offsetLeft) / z - st.scrollX, y: (clientY - st.offsetTop) / z - st.scrollY };
  };
  // вікно з документом або сторінкою на дошці
  const embed = (link: string, at: { x: number; y: number }, w = 960, h = 680) => {
    const [rect] = convertToExcalidrawElements([{ type: 'rectangle', x: at.x, y: at.y, width: w, height: h }], { regenerateIds: true }) as any[];
    const el = { ...rect, type: 'embeddable', link, roundness: null, backgroundColor: 'transparent', strokeColor: '#1A1A1A' };
    api.updateScene({ elements: [...api.getSceneElementsIncludingDeleted(), el], captureUpdate: CaptureUpdateAction.IMMEDIATELY });
    api.scrollToContent([el], { animate: true });
    push();
  };
  // посилання на файл → що показати у вікні
  const viewLink = (url: string, name = '') => {
    const n = (name || url).toLowerCase();
    if (/\.html?(\?|$)/.test(n)) return `${location.origin}/api/doc?f=${encodeURIComponent(url)}`;
    if (/\.(docx?|pptx?|xlsx?)(\?|$)/.test(n)) return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
    return url;
  };
  const addImageFromUrl = async (url: string, at: { x: number; y: number }) => {
    const blob = await fetch(url).then((r) => r.blob());
    const dataURL: string = await new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(String(fr.result)); fr.readAsDataURL(blob); });
    await addImage(dataURL, blob.type || 'image/png', at);
  };
  const addImage = async (dataURL: string, mime: string, at: { x: number; y: number }) => {
    const dim: { w: number; h: number } = await new Promise((res) => { const im = new Image(); im.onload = () => res({ w: im.width, h: im.height }); im.onerror = () => res({ w: 600, h: 400 }); im.src = dataURL; });
    const w = Math.min(800, dim.w); const h = Math.round((dim.h / dim.w) * w);
    const fileId = `img${Math.random().toString(36).slice(2, 12)}`;
    api.addFiles([{ id: fileId, dataURL, mimeType: mime, created: Date.now() }]);
    await insert([{ type: 'image', x: at.x, y: at.y, width: w, height: h, fileId }]);
  };
  const addDoc = async (file: File, at = scenePoint()) => {
    if (!api) return;
    setUpErr(''); setBusy(true);
    try {
      if (file.type.startsWith('image/')) {
        const dataURL: string = await new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(String(fr.result)); fr.readAsDataURL(file); });
        await addImage(dataURL, file.type, at);
      } else {
        const type = /\.html?$/i.test(file.name) ? 'text/html' : file.type;
        const up = await uploadFile(type === file.type ? file : new File([file], file.name, { type }));
        if ('error' in up) { setUpErr(up.error); return; }
        embed(viewLink(up.url, file.name), at);
      }
    } finally { setBusy(false); }
  };
  // матеріал із панелі «Матеріали»
  type Mat = { kind: 'page' | 'file' | 'lesson' | 'mine' | 'words'; title: string; href?: string; id?: string; group: string };
  const addMat = async (m: Mat, at = scenePoint()) => {
    if (!api) return;
    if (m.kind === 'words') return addWords();
    if (m.kind === 'mine') { const p = plans.find((x) => x.id === m.id); if (p) addPlan(p); return; }
    if (m.kind === 'lesson' && m.id) {
      setBusy(true);
      const p = await fetch(`/api/library?id=${encodeURIComponent(m.id)}&lang=${t.lang}`).then((r) => (r.ok ? r.json() : null)).catch(() => null);
      setBusy(false);
      if (p?.blocks) addPlan(p as Plan);
      return;
    }
    if (!m.href) return;
    if (m.kind === 'file' && /\.(png|jpe?g|webp|gif)(\?|$)/i.test(m.href)) { setBusy(true); try { await addImageFromUrl(m.href, at); } finally { setBusy(false); } return; }
    embed(m.kind === 'page' ? `${location.origin}${m.href}` : viewLink(m.href, m.title), at, m.kind === 'page' ? 1100 : 960, m.kind === 'page' ? 760 : 680);
  };
  const allowEmbed = (url: string) => url.startsWith(location.origin) || /\.supabase\.co\/storage\/v1\/object\/public\//.test(url) || /^https:\/\/view\.officeapps\.live\.com\//.test(url) || /^https:\/\/(www\.)?(youtube\.com|youtu\.be|docs\.google\.com|drive\.google\.com)\//.test(url);

  // перетягування: файли з папок комп’ютера і картки з панелі «Матеріали»
  const onDrop = (e: React.DragEvent) => {
    const mat = e.dataTransfer.getData('application/x-murly');
    const files = Array.from(e.dataTransfer.files ?? []);
    const docs = files.filter((f) => !f.type.startsWith('image/'));
    if (!mat && !docs.length) return; // картинки Excalidraw приймає сам
    e.preventDefault(); e.stopPropagation();
    const at = scenePoint(e.clientX, e.clientY);
    if (mat) { try { addMat(JSON.parse(mat), at); } catch { /* */ } return; }
    files.reduce((p, f, i) => p.then(() => addDoc(f, { x: at.x + i * 40, y: at.y + i * 40 })), Promise.resolve());
  };

  // повний екран
  useEffect(() => {
    const on = () => setFull(document.fullscreenElement === wrapRef.current);
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);
  const toggleFull = () => {
    const el = wrapRef.current as any;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else if (el.requestFullscreen) el.requestFullscreen().catch(() => setFull((f) => !f));
    else setFull((f) => !f); // iPhone: без Fullscreen API, просто на все вікно
  };

  const addWords = () => {
    if (!words.length) return;
    const y = bottom();
    insert([{ type: 'text', x: 0, y, text: t({ uk: 'Слова', ru: 'Слова', en: 'Words' }), fontSize: 28 },
      { type: 'text', x: 0, y: y + 48, text: words.slice(0, 40).map((w) => `• ${w.en} — ${w.uk}`).join('\n'), fontSize: 20 }]);
  };

  // усі матеріали для панелі
  const G = {
    files: t({ uk: 'Файли з уроків', ru: 'Файлы с уроков', en: 'Lesson files' }),
    mine: t({ uk: 'Мої уроки', ru: 'Мои уроки', en: 'My lessons' }),
    lib: t({ uk: 'Готові уроки', ru: 'Готовые уроки', en: 'Ready-made lessons' }),
  };
  const mats: Mat[] = [
    ...(words.length ? [{ kind: 'words' as const, title: t({ uk: 'Слова учня', ru: 'Слова ученика', en: 'Student words' }) + ` (${words.length})`, group: t({ uk: 'Словник', ru: 'Словарь', en: 'Vocabulary' }) }] : []),
    ...files.map((f) => ({ kind: 'file' as const, title: f.name, href: f.url, group: G.files })),
    ...(teacher ? plans.map((p) => ({ kind: 'mine' as const, title: p.title, id: p.id, group: G.mine })) : []),
    ...(teacher ? library.map((p) => ({ kind: 'lesson' as const, title: `${p.title} · ${p.level}`, id: p.id, group: G.lib })) : []),
    ...pages.map((p) => ({ kind: 'page' as const, title: p.title, href: p.href, group: p.group })),
  ];
  const ql = q.trim().toLowerCase();
  const shown = ql ? mats.filter((m) => m.title.toLowerCase().includes(ql) || m.group.toLowerCase().includes(ql)) : mats;
  const groups = Array.from(new Set(shown.map((m) => m.group)));

  return (
    <div className={`bd ${full ? 'is-full' : ''}`} ref={wrapRef}>
      <div className="bd-bar">
        {title && <b className="bd-title">{title}</b>}
        <span className={`bd-st is-${status}`}>{status === 'ok' ? t({ uk: 'Збережено', ru: 'Сохранено', en: 'Saved' }) : status === 'offline' ? t({ uk: 'Немає зв’язку, зміни збережуться пізніше', ru: 'Нет связи, изменения сохранятся позже', en: 'Offline, changes will sync later' }) : t({ uk: 'Завантажую…', ru: 'Загружаю…', en: 'Loading…' })}</span>
        <button type="button" className={`mu-btn t-btn-sm ${drawer ? 'mu-btn--lime' : ''}`} onClick={() => setDrawer(!drawer)} aria-expanded={drawer}>{t({ uk: 'Матеріали', ru: 'Материалы', en: 'Materials' })}</button>
        <button type="button" className="mu-btn t-btn-sm" disabled={busy} onClick={() => fileInput.current?.click()}>{busy ? '…' : t({ uk: '+ Файл', ru: '+ Файл', en: '+ File' })}</button>
        <input ref={fileInput} type="file" hidden multiple accept=".html,.htm,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,image/*" onChange={(e) => { const fs = Array.from(e.target.files ?? []); e.target.value = ''; fs.reduce((p, f, i) => p.then(() => addDoc(f, { x: i * 40, y: bottom() })), Promise.resolve()); }} />
        <button type="button" className="mu-btn t-btn-sm bd-full" onClick={toggleFull}>{full ? t({ uk: 'Згорнути', ru: 'Свернуть', en: 'Exit full screen' }) : t({ uk: 'На весь екран', ru: 'На весь экран', en: 'Full screen' })}</button>
        {upErr && <span className="t-neg" style={{ fontSize: 13 }}>{upErr}</span>}
        <span className="bd-tip">{t({ uk: 'Перетягни файли з папки прямо на дошку. Двічі клікни по документу, щоб працювати всередині.', ru: 'Перетащи файлы из папки прямо на доску. Дважды кликни по документу, чтобы работать внутри.', en: 'Drag files from a folder onto the board. Double-click a document to work inside it.' })}</span>
      </div>
      <div className="bd-body">
        <div className="bd-canvas" onDropCapture={onDrop} onDragOverCapture={(e) => { if (e.dataTransfer.types.includes('application/x-murly') || e.dataTransfer.types.includes('Files')) e.preventDefault(); }}>
          <Excalidraw excalidrawAPI={(a: any) => setApi(a)} onChange={onChange} validateEmbeddable={allowEmbed} langCode={LANG[t.lang] ?? 'en'}
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
        {drawer && (
          <aside className="bd-drawer" aria-label={t({ uk: 'Матеріали', ru: 'Материалы', en: 'Materials' })}>
            <div className="bd-drawer__head">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t({ uk: 'Пошук: тема, урок, файл', ru: 'Поиск: тема, урок, файл', en: 'Search: topic, lesson, file' })} />
              <button type="button" className="t-icon-btn" onClick={() => setDrawer(false)} aria-label={t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' })}>✕</button>
            </div>
            <p className="t-muted bd-drawer__hint">{t({ uk: 'Натисни або перетягни на дошку.', ru: 'Нажми или перетащи на доску.', en: 'Click or drag onto the board.' })}</p>
            <div className="bd-drawer__list">
              {groups.map((g) => (
                <div key={g}>
                  <h4>{g}</h4>
                  {shown.filter((m) => m.group === g).slice(0, ql ? 60 : 30).map((m, i) => (
                    <button key={`${m.kind}${m.id ?? m.href ?? i}`} type="button" className="bd-mat" draggable
                      onDragStart={(e) => { e.dataTransfer.setData('application/x-murly', JSON.stringify(m)); e.dataTransfer.effectAllowed = 'copy'; }}
                      onClick={() => addMat(m)}>{m.title}</button>
                  ))}
                </div>
              ))}
              {!shown.length && <p className="t-muted">{t({ uk: 'Нічого не знайшлося.', ru: 'Ничего не нашлось.', en: 'Nothing found.' })}</p>}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
