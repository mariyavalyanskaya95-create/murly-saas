/* Murly lesson kit для ігрових уроків.
   - плашки Murly (верхня смужка, мітка на кожному завданні, підвал);
   - відповіді й нотатки бачить тільки вчитель (вхід у Murly), нотатки українською або російською;
   - пульт учителя в окремому вікні: учень бачить лише вкладку з уроком під час демонстрації екрана;
   - «Зупинилися тут» для конкретного учня (зберігається в його матеріалах);
   - «Задати домашкою» будь-яке завдання з уроку або всю домашку уроку.
   Налаштування уроку: window.MURLY_LESSON = { id, title, hw: { sectionId: [{ type, instruction, text }] }, homework: [sectionId, ...] } */
(function () {
  'use strict';
  const C = window.MURLY_LESSON || {};
  const ID = C.id || (location.pathname.split('/').pop() || 'lesson').replace(/\.html$/, '');
  const TITLE = C.title || ((document.querySelector('h1') || {}).textContent || 'Murly lesson').trim();
  const HW = C.hw || {};
  const HOME = C.homework || [];
  const host = location.hostname;
  const ON_SITE = /(^|\.)murly\.com\.ua$/.test(host) || /\.vercel\.app$/.test(host);
  const qs = new URLSearchParams(location.search);
  const PULT = qs.has('pult');
  const ch = 'BroadcastChannel' in window ? new BroadcastChannel('murly-lk-' + ID) : null;
  const ls = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* */ } } };
  const cookieLang = (document.cookie.match(/(?:^|; )murly_lang=(\w+)/) || [])[1];
  let LANG = cookieLang === 'ru' || cookieLang === 'uk' ? cookieLang : (ls.get('murly:tlang') || 'uk');
  const T = (uk, ru) => (LANG === 'ru' ? ru : uk);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : 'x' + Date.now() + Math.random().toString(16).slice(2));
  const LOGO = '<img class="mk-logo" src="/favicon.svg" alt="" onerror="this.style.display=\'none\'">';
  const IC = {
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/></svg>',
    hw: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    screen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20h8M12 16v4"/></svg>',
  };

  // ---------- розділи уроку ----------
  const SECS = [...document.querySelectorAll('.wrap > section[id]')].filter((s) => !s.classList.contains('sm-end'));
  const secTitle = (s) => { const h = s.querySelector('h2'); if (!h) return s.id; const c = h.cloneNode(true); c.querySelectorAll('.tag,.lk-mode,.lk-n,.mk-tools,.mk-mark').forEach((x) => x.remove()); return c.textContent.replace(/\s+/g, ' ').trim(); };
  const secNum = (s, i) => { const n = s.querySelector('.lk-n'); return n ? n.textContent.trim() : String(i + 1); };
  const INFO = SECS.map((s, i) => ({ id: s.id, n: secNum(s, i), title: secTitle(s), min: +(s.dataset.min || 0), el: s }));
  const info = (id) => INFO.find((x) => x.id === id);
  const lessonUrl = (id) => `${location.origin}/game-lessons/${ID}.html${id ? '#' + id : ''}`;

  // ---------- нотатки українською / російською ----------
  function applyLang() {
    document.querySelectorAll('.lk-tnote[data-ru], details.teacher [data-ru]').forEach((p) => { if (!p.dataset.uk) p.dataset.uk = p.innerHTML; p.innerHTML = LANG === 'ru' ? p.dataset.ru : p.dataset.uk; });
    // переклади слів у самому уроці (картки, таблиці, match): <span data-tr-ru="...">укр</span>
    document.querySelectorAll('[data-tr-ru]').forEach((p) => { if (p.dataset.trUk === undefined) p.dataset.trUk = p.innerHTML; p.innerHTML = LANG === 'ru' ? p.dataset.trRu : p.dataset.trUk; });
    document.querySelectorAll('[data-mk-lang]').forEach((b) => b.classList.toggle('on', b.dataset.mkLang === LANG));
  }
  function setLang(l, fromCh) { LANG = l; ls.set('murly:tlang', l); try { document.cookie = 'murly_lang=' + l + '; path=/; max-age=31536000; samesite=lax'; } catch (e) { /* */ } applyLang(); if (!fromCh && ch) ch.postMessage({ t: 'lang', l }); if (PULT) renderPult(); else renderBanner(); }
  const langSw = () => `<span class="mk-lang"><button type="button" data-mk-lang="uk">УКР</button><button type="button" data-mk-lang="ru">РУС</button></span>`;
  const bindLang = (root) => root.querySelectorAll('[data-mk-lang]').forEach((b) => (b.onclick = () => setLang(b.dataset.mkLang)));


  // Sentry: помилки в уроках-іграх (без персональних даних)
  try { if (!window.Sentry && !document.querySelector('script[data-sentry]')) { window.sentryOnLoad = function () { Sentry.init({ environment: location.hostname === 'murly.com.ua' ? 'production' : 'preview', tracesSampleRate: 0, sendDefaultPii: false, ignoreErrors: ['ResizeObserver loop', 'NotAllowedError', 'AbortError', 'Failed to fetch'] }); }; const sc = document.createElement('script'); sc.src = 'https://js-de.sentry-cdn.com/ab16a8689135769db5b55f83469560fd.min.js'; sc.crossOrigin = 'anonymous'; sc.async = true; sc.dataset.sentry = '1'; document.head.appendChild(sc); } } catch (e) { /* */ }
  // ---------- звук: можна вимкнути озвучку й ефекти ----------
  let MUTED = ls.get('murly:mute') === '1';
  let LIVE = false;
  const ttsLink = (t) => '/api/tts?q=2&v=narrator&t=' + encodeURIComponent(String(t).slice(0, 1500));
  // Учитель відкрив урок: заздалегідь готуємо озвучку всіх фраз, щоб учні чули живий голос одразу
  function warmVoices() {
    try {
      const key = 'murly:warm:' + location.pathname; if (ls.get(key) === '3') return;
      const set = new Set();
      document.querySelectorAll('[data-say]').forEach((e) => e.dataset.say && set.add(e.dataset.say));
      document.querySelectorAll('[data-script]').forEach((e) => e.textContent.trim() && set.add(e.textContent.trim()));
      const list = [...set].filter((t) => t.length < 1500).slice(0, 150);
      let i = 0; const next = () => { if (i >= list.length) { ls.set(key, '3'); return; } const t = list[i++]; fetch(ttsLink(t)).then((r) => { try { r.body && r.body.cancel(); } catch (e) { /* */ } }).catch(() => {}).finally(() => setTimeout(next, 250)); };
      setTimeout(next, 3000);
    } catch (e) { /* */ }
  }
  (function patchSound() {
    try {
      const ss = window.speechSynthesis;
      if (ss && !PULT) {
        // Живий голос Murly (MP3 з кешу /api/tts) замість голосу браузера; якщо його немає, говорить браузер
        const orig = ss.speak.bind(ss), origCancel = ss.cancel.bind(ss);
        let cur = null;
        fetch('/api/tts?check=1').then((r) => r.json()).then((j) => { LIVE = !!j.ok; }).catch(() => { LIVE = false; });
        ss.cancel = function () { if (cur) { cur.onended = null; cur.onerror = null; cur.pause(); cur = null; } return origCancel(); };
        ss.speak = function (u) {
          if (MUTED) return;
          const text = (u && u.text) || '';
          if (!LIVE || !text || text.length > 1500 || (u.lang && !/^en/i.test(u.lang))) return orig(u);
          if (cur) { cur.onended = null; cur.onerror = null; cur.pause(); }
          const a = new Audio(ttsLink(text)); a.playbackRate = u.rate && u.rate < 0.85 ? 0.8 : 1; cur = a;
          let fell = false;
          const fb = () => { if (fell) return; fell = true; if (cur === a) cur = null; orig(u); };
          a.onended = () => { if (cur === a) cur = null; try { u.onend && u.onend(new Event('end')); } catch (e) { /* */ } };
          a.onerror = fb;
          const p = a.play(); if (p && p.catch) p.catch(fb);
        };
      }
      ['OscillatorNode', 'AudioBufferSourceNode'].forEach((n) => { const P = window[n] && window[n].prototype; if (P && P.start) { const o = P.start; P.start = function () { if (MUTED) return; return o.apply(this, arguments); }; } });
      const mp = HTMLMediaElement.prototype.play; HTMLMediaElement.prototype.play = function () { if (MUTED && !(this instanceof HTMLVideoElement)) return Promise.resolve(); return mp.apply(this, arguments); };
    } catch (e) { /* */ }
  })();
  const SND_ON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>';
  const SND_OFF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>';
  function soundBtn() {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'mk-snd';
    const paint = () => { b.innerHTML = (MUTED ? SND_OFF : SND_ON) + ' ' + (MUTED ? T('Звук вимкнено', 'Звук выключен') : T('Звук увімкнено', 'Звук включён')); b.classList.toggle('off', MUTED); };
    b.onclick = () => { MUTED = !MUTED; ls.set('murly:mute', MUTED ? '1' : '0'); if (MUTED) { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { /* */ } document.querySelectorAll('audio').forEach((a) => a.pause()); } paint(); };
    paint(); return b;
  }

  // ---------- слово у словник: виділи слово або фразу на сторінці ----------
  let addBtn = null;
  function wordPicker() {
    addBtn = document.createElement('button'); addBtn.type = 'button'; addBtn.className = 'mk-addword'; addBtn.hidden = true;
    addBtn.textContent = T('+ У словник', '+ В словарь');
    document.body.appendChild(addBtn);
    let picked = '';
    document.addEventListener('selectionchange', () => {
      const sel = window.getSelection(); const txt = sel ? String(sel).trim().replace(/\s+/g, ' ') : '';
      if (!txt || txt.length > 60 || !/[a-z]/i.test(txt) || !sel.rangeCount) { setTimeout(() => { if (!String(window.getSelection() || '').trim()) addBtn.hidden = true; }, 150); return; }
      picked = txt; const r = sel.getRangeAt(0).getBoundingClientRect();
      addBtn.textContent = T('+ У словник', '+ В словарь'); addBtn.style.top = (window.scrollY + r.bottom + 6) + 'px'; addBtn.style.left = (window.scrollX + r.left) + 'px'; addBtn.hidden = false;
    });
    addBtn.addEventListener('mousedown', (e) => e.preventDefault());
    addBtn.onclick = async () => {
      const en = picked; if (!en) return;
      const uk = prompt(T(`Переклад для «${en}»:`, `Перевод для «${en}»:`), '');
      if (uk === null) return;
      if (!uk.trim()) { toastMk(T('Додайте переклад, щоб зберегти слово.', 'Добавьте перевод, чтобы сохранить слово.')); return; }
      let ok = false;
      try {
        if (document.body.classList.contains('mk-teacher')) {
          const st = student();
          if (!st || SID === 'local') { toastMk(T('Спочатку оберіть учня вгорі.', 'Сначала выберите ученика вверху.')); return; }
          ok = await api('addWord', { id: uid(), studentId: st.id, en, uk: uk.trim(), example: null, at: new Date().toISOString() });
          if (ok) toastMk(T(`«${en}» додано у словник: ${esc(st.name)}`, `«${en}» добавлено в словарь: ${esc(st.name)}`));
        } else {
          const r = await fetch('/api/student', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ op: 'addWord', en, uk: uk.trim() }) });
          ok = r.ok;
          if (r.status === 401) { toastMk(T('Увійдіть у кабінет учня, щоб зберігати слова.', 'Войдите в кабинет ученика, чтобы сохранять слова.')); return; }
          if (ok) toastMk(T(`«${en}» додано у твій словник`, `«${en}» добавлено в твой словарь`));
        }
      } catch (e) { ok = false; }
      if (!ok) toastMk(T('Не вийшло зберегти, спробуйте ще раз.', 'Не получилось сохранить, попробуйте ещё раз.'));
      addBtn.hidden = true; try { window.getSelection().removeAllRanges(); } catch (e) { /* */ }
    };
  }

  // ---------- плашки Murly ----------
  function brand() {
    const bar = document.createElement('div'); bar.className = 'mk-bar';
    bar.innerHTML = `<a href="${ON_SITE ? '/game-lessons' : 'https://murly.com.ua/game-lessons'}">${LOGO}Murly <small>Game lessons</small></a><small>murly.com.ua</small>`;
    bar.appendChild(soundBtn());
    document.body.prepend(bar);
    const foot = document.createElement('div'); foot.className = 'mk-foot';
    foot.innerHTML = `<a href="https://murly.com.ua">${LOGO}Murly · English lessons for kids, teens and adults · murly.com.ua</a>`;
    (document.querySelector('.wrap') || document.body).after(foot);
  }

  // ---------- дані вчителя ----------
  let D = null; // { students, notes }
  async function load() {
    if (!ON_SITE) return { students: [], notes: [], local: true };
    try {
      const r = await fetch('/api/teacher', { credentials: 'same-origin' });
      if (!r.ok) return null;
      const d = await r.json();
      const students = (d.students || []).filter((s) => !s.archived);
      if (!students.length) return null; // учень або новий акаунт без учнів
      return { students, notes: d.notes || [] };
    } catch (e) { return null; }
  }
  const api = (op, p) => fetch('/api/teacher', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ op, p }) }).then((r) => r.ok);
  let SID = ls.get('murly:lk-student') || '';
  const student = () => (D && D.students.find((s) => s.id === SID)) || null;
  const setStudent = (id, fromCh) => { SID = id; ls.set('murly:lk-student', id); if (!fromCh && ch) ch.postMessage({ t: 'student', id }); if (PULT) renderPult(); else { renderBanner(); markSection(); } };
  const studentSelect = (cls) => D && D.students.length ? `<select class="${cls || ''}" data-mk-student aria-label="${T('Учень', 'Ученик')}"><option value="">${T('Оберіть учня', 'Выберите ученика')}</option>${D.students.map((s) => `<option value="${s.id}"${s.id === SID ? ' selected' : ''}>${esc(s.name)}</option>`).join('')}</select>` : '';

  // ---------- закладка «Зупинилися тут» ----------
  const isMarkNote = (n) => n && Array.isArray(n.files) && n.files.some((f) => f && typeof f.url === 'string' && f.url.indexOf(`/game-lessons/${ID}.html`) >= 0);
  function getMark(sid) {
    if (!sid) return null;
    const n = D && D.notes ? D.notes.filter((x) => x.studentId === sid && isMarkNote(x)).sort((a, b) => (a.at < b.at ? 1 : -1))[0] : null;
    if (n) { const f = n.files.find((x) => x.url.indexOf(`/game-lessons/${ID}.html`) >= 0); const sec = (f.url.split('#')[1] || '').trim(); return { sec, at: n.at, noteId: n.id }; }
    try { return JSON.parse(ls.get(`murly:mark:${ID}:${sid}`) || 'null'); } catch (e) { return null; }
  }
  async function saveMark(sid, secId) {
    const s = info(secId); if (!s) return false;
    const at = new Date().toISOString();
    ls.set(`murly:mark:${ID}:${sid}`, JSON.stringify({ sec: secId, at }));
    if (!ON_SITE || !D || D.local) return true;
    const text = T(`${TITLE}: зупинилися на завданні ${s.n} «${s.title}». Наступного разу продовжимо звідси.`, `${TITLE}: остановились на задании ${s.n} «${s.title}». В следующий раз продолжим отсюда.`);
    const files = [{ url: lessonUrl(secId), name: `${TITLE} · ${s.n}. ${s.title}` }];
    const old = getMark(sid);
    let ok;
    if (old && old.noteId) {
      ok = await api('updateNote', { id: old.noteId, patch: { text, files, at } });
      if (ok) { const n = D.notes.find((x) => x.id === old.noteId); if (n) Object.assign(n, { text, files, at }); }
    } else {
      const id = uid();
      ok = await api('addNote', { id, studentId: sid, text, at, files });
      if (ok) D.notes.unshift({ id, studentId: sid, text, at, files });
    }
    if (ch) ch.postMessage({ t: 'mark', sid });
    return ok;
  }
  const fmtDate = (iso) => { try { return new Date(iso).toLocaleDateString(LANG === 'ru' ? 'ru-RU' : 'uk-UA', { day: 'numeric', month: 'long' }); } catch (e) { return ''; } };

  // ---------- модальні вікна ----------
  function modal(html, bind) {
    const m = document.createElement('div'); m.className = 'mk-modal';
    m.innerHTML = `<div class="mk-modal__box" role="dialog" aria-modal="true">${html}</div>`;
    m.onclick = (e) => { if (e.target === m) m.remove(); };
    document.body.appendChild(m);
    m.querySelectorAll('[data-close]').forEach((b) => (b.onclick = () => m.remove()));
    const onKey = (e) => { if (e.key === 'Escape') { m.remove(); document.removeEventListener('keydown', onKey); } };
    document.addEventListener('keydown', onKey);
    bind(m);
    return m;
  }
  function markModal(secId) {
    const s = info(secId);
    if (!D || (!D.students.length && !D.local)) return;
    if (D.local) { ls.set(`murly:mark:${ID}:local`, JSON.stringify({ sec: secId, at: new Date().toISOString() })); toastMk(T('Закладку збережено на цьому комп’ютері', 'Закладка сохранена на этом компьютере')); return; }
    modal(`<h3>${IC.flag}${T('Зупинилися тут', 'Остановились здесь')}</h3>
      <p>${T('Завдання', 'Задание')} ${esc(s.n)} «${esc(s.title)}»</p>
      <label>${T('З ким займалися', 'С кем занимались')}</label>${studentSelect()}
      <small>${T('Закладка з’явиться в матеріалах учня, а наступного разу урок покаже, звідки продовжити.', 'Закладка появится в материалах ученика, а в следующий раз урок покажет, откуда продолжить.')}</small>
      <div class="mk-msg" role="status"></div>
      <div class="mk-row"><button type="button" data-close>${T('Скасувати', 'Отмена')}</button><button type="button" class="go">${T('Зберегти', 'Сохранить')}</button></div>`, (m) => {
      const sel = m.querySelector('[data-mk-student]'); const msg = m.querySelector('.mk-msg');
      m.querySelector('.go').onclick = async () => {
        const sid = sel.value; if (!sid) { msg.className = 'mk-msg bad'; msg.textContent = T('Оберіть учня', 'Выберите ученика'); return; }
        if (sid !== SID) setStudent(sid);
        const ok = await saveMark(sid, secId);
        msg.className = 'mk-msg ' + (ok ? 'ok' : 'bad');
        msg.textContent = ok ? T('Збережено. Закладка вже в матеріалах учня.', 'Сохранено. Закладка уже в материалах ученика.') : T('Не вийшло зберегти, спробуйте ще раз.', 'Не получилось сохранить, попробуйте ещё раз.');
        if (ok) { if (!PULT) { renderBanner(); markSection(); } else renderPult(); setTimeout(() => m.remove(), 1100); }
      };
    });
  }
  const dueDefault = () => { const d = new Date(); d.setDate(d.getDate() + 2); d.setHours(20, 0, 0, 0); const p = (x) => String(x).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`; };
  const hwCount = (id) => (HW[id] || []).reduce((n, b) => n + String(b.text || '').split('\n').filter((x) => x.trim()).length, 0);
  function hwModal(preset) {
    if (!D || D.local) { toastMk(T('Задати домашку можна на murly.com.ua, коли ви увійшли як учитель.', 'Задать домашку можно на murly.com.ua, когда вы вошли как учитель.')); return; }
    const ids = Object.keys(HW).filter((k) => info(k) && HW[k].length);
    const pre = new Set(preset === 'all' ? HOME : [preset]);
    modal(`<h3>${IC.hw}${T('Задати домашкою', 'Задать домашкой')}</h3>
      <label>${T('Учень', 'Ученик')}</label>${studentSelect()}
      <label>${T('Що задати', 'Что задать')}</label>
      ${ids.map((k) => { const s = info(k); return `<label class="mk-ch"><input type="checkbox" value="${k}"${pre.has(k) ? ' checked' : ''}><span>${esc(s.n)}. ${esc(s.title)} <small>· ${hwCount(k)} ${T('завд.', 'зад.')}</small></span></label>`; }).join('')}
      <label>${T('Здати до', 'Сдать до')}</label><input type="datetime-local" value="${dueDefault()}">
      <label class="mk-ch"><input type="checkbox" data-parent><span>${T('Повідомити батьків у Telegram', 'Сообщить родителям в Telegram')}</span></label>
      <small>${T('Учень отримає завдання в кабінеті з автоперевіркою, а в описі буде посилання на урок.', 'Ученик получит задания в кабинете с автопроверкой, а в описании будет ссылка на урок.')}</small>
      <div class="mk-msg" role="status"></div>
      <div class="mk-row"><button type="button" data-close>${T('Скасувати', 'Отмена')}</button><button type="button" class="go">${T('Задати', 'Задать')}</button></div>`, (m) => {
      const msg = m.querySelector('.mk-msg');
      m.querySelector('.go').onclick = async () => {
        const sid = m.querySelector('[data-mk-student]').value;
        const pick = [...m.querySelectorAll('input[type=checkbox][value]')].filter((x) => x.checked).map((x) => x.value);
        const dueV = m.querySelector('input[type=datetime-local]').value;
        if (!sid) { msg.className = 'mk-msg bad'; msg.textContent = T('Оберіть учня', 'Выберите ученика'); return; }
        if (!pick.length) { msg.className = 'mk-msg bad'; msg.textContent = T('Позначте хоча б одне завдання', 'Отметьте хотя бы одно задание'); return; }
        if (sid !== SID) setStudent(sid);
        const ordered = INFO.filter((x) => pick.includes(x.id));
        const itemsText = ordered.flatMap((x) => HW[x.id]).map((b) => ({ type: b.type, instruction: b.instruction, text: b.text }));
        const whole = preset === 'all' && pick.length === HOME.length && HOME.every((k) => pick.includes(k));
        const title = (whole ? `${TITLE}: ${T('домашка до уроку', 'домашка к уроку')}` : `${TITLE}: ${ordered.map((x) => x.title).join(', ')}`).slice(0, 120);
        const instructions = T(`Завдання з уроку «${TITLE}». Якщо щось забулося, урок тут: ${lessonUrl(ordered[0].id)}`, `Задания из урока «${TITLE}». Если что-то забылось, урок здесь: ${lessonUrl(ordered[0].id)}`);
        const go = m.querySelector('.go'); go.disabled = true;
        const ok = await api('addHomework', { id: uid(), studentId: sid, title, instructions, kind: 'exercise', itemsText, due: dueV ? new Date(dueV).toISOString() : null, status: 'assigned', createdAt: new Date().toISOString(), toParent: m.querySelector('[data-parent]').checked });
        go.disabled = false;
        msg.className = 'mk-msg ' + (ok ? 'ok' : 'bad');
        msg.textContent = ok ? T('Готово! Домашка вже в кабінеті учня, йому прийде повідомлення.', 'Готово! Домашка уже в кабинете ученика, ему придёт уведомление.') : T('Не вийшло задати, спробуйте ще раз.', 'Не получилось задать, попробуйте ещё раз.');
        if (ok) setTimeout(() => m.remove(), 1500);
      };
    });
  }
  function toastMk(text) { const t = document.createElement('div'); t.className = 'mk-modal'; t.innerHTML = `<div class="mk-modal__box"><p>${esc(text)}</p><div class="mk-row"><button type="button" class="go" data-close>OK</button></div></div>`; document.body.appendChild(t); t.querySelector('[data-close]').onclick = () => t.remove(); }

  // ---------- вкладка уроку: інструменти вчителя ----------
  let cur = INFO[0] ? INFO[0].id : '';
  function tools() {
    INFO.forEach((s) => {
      const box = document.createElement('div'); box.className = 'mk-tools';
      box.innerHTML = `<button type="button" data-a="mark" title="${T('Зупинилися тут', 'Остановились здесь')}">${IC.flag}<span>${T('Зупинилися тут', 'Остановились здесь')}</span></button>${HW[s.id] ? `<button type="button" data-a="hw">${IC.hw}<span>${T('Задати домашкою', 'Задать домашкой')}</span></button>` : ''}`;
      box.querySelector('[data-a=mark]').onclick = () => markModal(s.id);
      const hb = box.querySelector('[data-a=hw]'); if (hb) hb.onclick = () => hwModal(s.id);
      s.el.prepend(box);
      const flag = document.createElement('span'); flag.className = 'mk-mark'; s.el.prepend(flag);
    });
  }
  function markSection() {
    INFO.forEach((s) => s.el.classList.remove('mk-here'));
    const mk = getMark(SID);
    if (!mk || !info(mk.sec)) return;
    const s = info(mk.sec); s.el.classList.add('mk-here');
    const st = student(); s.el.querySelector('.mk-mark').textContent = T(`Тут зупинилися${st ? ' з ' + st.name : ''} · ${fmtDate(mk.at)}`, `Здесь остановились${st ? ' с ' + st.name : ''} · ${fmtDate(mk.at)}`);
  }
  let banner = null;
  function renderBanner() {
    if (!document.body.classList.contains('mk-teacher')) return;
    if (!banner) { banner = document.createElement('div'); banner.className = 'mk-banner'; const w = document.querySelector('.wrap'); (w || document.body).before(banner); }
    const st = student(); const mk = getMark(SID);
    const s = mk && info(mk.sec);
    banner.innerHTML = `<span>${D && D.students.length ? studentSelect() : ''}</span><span>${s ? T(`Минулого разу${st ? ' з ' + esc(st.name) : ''} зупинилися на завданні ${esc(s.n)} «${esc(s.title)}» (${fmtDate(mk.at)}).`, `В прошлый раз${st ? ' с ' + esc(st.name) : ''} остановились на задании ${esc(s.n)} «${esc(s.title)}» (${fmtDate(mk.at)}).`) : T('Оберіть учня, і урок запам’ятає, де ви зупинилися.', 'Выберите ученика, и урок запомнит, где вы остановились.')}</span>${s ? `<button type="button">${T('Продовжити звідси', 'Продолжить отсюда')}</button>` : ''}${HOME.length ? `<button type="button" data-home style="background:#ffd23f">${T('Задати домашку уроку', 'Задать домашку урока')}</button>` : ''}<button type="button" data-give style="background:#AFC3F0">${T('Додати урок у кабінет учня', 'Добавить урок в кабинет ученика')}</button>`;
    const sel = banner.querySelector('[data-mk-student]'); if (sel) sel.onchange = () => setStudent(sel.value);
    const go = banner.querySelector('button:not([data-home]):not([data-give])'); if (go && s) go.onclick = () => goTo(s.id);
    const hb = banner.querySelector('[data-home]'); if (hb) hb.onclick = () => hwModal('all');
    const gb = banner.querySelector('[data-give]'); if (gb) gb.onclick = async () => {
      const st2 = student();
      if (!st2 || SID === 'local') { toastMk(T('Спочатку оберіть учня зліва.', 'Сначала выберите ученика слева.')); return; }
      const ok = await api('addNote', { id: uid(), studentId: st2.id, text: T('Урок: ', 'Урок: ') + TITLE, at: new Date().toISOString(), files: [{ url: lessonUrl(''), name: TITLE }] });
      toastMk(ok ? T(`Готово: урок «${TITLE}» у кабінеті ${st2.name} (Матеріали з уроків) і в історії уроків.`, `Готово: урок «${TITLE}» в кабинете ${st2.name} (Материалы с уроков) и в истории уроков.`) : T('Не вийшло, спробуйте ще раз.', 'Не получилось, попробуйте ещё раз.'));
    };
  }
  function goTo(id) { const s = info(id); if (!s) return; s.el.scrollIntoView({ behavior: 'smooth', block: 'start' }); s.el.classList.remove('mk-flash'); void s.el.offsetWidth; s.el.classList.add('mk-flash'); }
  let dock = null;
  function renderDock() {
    if (!dock) { dock = document.createElement('div'); dock.className = 'mk-dock'; document.body.appendChild(dock); }
    const share = document.body.classList.contains('mk-share');
    dock.classList.toggle('min', share);
    dock.innerHTML = `<button type="button" class="mk-home" title="${share ? T('Показати панель учителя', 'Показать панель учителя') : 'Murly'}">${LOGO}</button>
      <button type="button" class="mk-b" data-a="pult">${IC.screen} ${T('Пульт для демонстрації', 'Пульт для демонстрации')}</button>
      <button type="button" class="mk-b${document.body.classList.contains('teacher') ? ' on' : ''}" data-a="ans">${IC.eye} ${T('Відповіді', 'Ответы')}</button>${langSw()}`;
    dock.querySelector('.mk-home').onclick = () => { if (document.body.classList.contains('mk-share')) { if (confirm(T('Вийти з режиму демонстрації? Учень знову побачить кнопки вчителя, якщо ви показуєте екран.', 'Выйти из режима демонстрации? Ученик снова увидит кнопки учителя, если вы показываете экран.'))) setShare(false); } else location.href = ON_SITE ? '/teacher' : 'https://murly.com.ua'; };
    dock.querySelector('[data-a=pult]').onclick = openPult;
    dock.querySelector('[data-a=ans]').onclick = () => { document.body.classList.toggle('teacher'); renderDock(); };
    bindLang(dock); applyLang();
  }
  function setShare(on) { document.body.classList.toggle('mk-share', on); if (on) document.body.classList.remove('teacher'); else INFO.forEach((s) => s.el.classList.remove('mk-reveal')); renderDock(); if (ch) ch.postMessage({ t: 'share', on }); }
  function openPult() {
    const w = window.open(`${location.pathname}?pult=1`, 'murly-pult-' + ID, 'width=460,height=820');
    if (!w) { toastMk(T('Браузер заблокував нове вікно. Дозвольте спливаючі вікна для murly.com.ua і натисніть ще раз.', 'Браузер заблокировал новое окно. Разрешите всплывающие окна для murly.com.ua и нажмите ещё раз.')); return; }
    setShare(true);
  }
  function watchScroll() {
    let raf = 0;
    const calc = () => { raf = 0; const y = window.innerHeight * 0.35; let best = INFO[0]; INFO.forEach((s) => { if (s.el.getBoundingClientRect().top <= y) best = s; }); if (best && best.id !== cur) { cur = best.id; if (ch) ch.postMessage({ t: 'cur', id: cur }); } };
    window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(calc); }, { passive: true });
    calc();
  }

  // ---------- пульт ----------
  let pultRoot = null; let t0 = 0; let tRun = false; let tAcc = 0; let shareOn = true;
  const secNotes = (s) => [...s.el.querySelectorAll('.lk-tnote')].map((p) => (LANG === 'ru' && p.dataset.ru ? p.dataset.ru : (p.dataset.uk || p.innerHTML)));
  const secAns = (s) => [...s.el.querySelectorAll('.lk-ans')].map((p) => esc(p.textContent.trim())).filter(Boolean);
  function renderPult() {
    if (!pultRoot) return;
    const s = info(cur) || INFO[0];
    const mk = getMark(SID);
    const plan = document.querySelector('details.teacher');
    const revealed = s && s.el.classList.contains('mk-reveal');
    pultRoot.innerHTML = `<header>${LOGO}<b>${T('Пульт учителя', 'Пульт учителя')}</b>${langSw()}</header>
      <div class="tip">${T('Показуйте учню тільки вкладку з уроком: «Поділитися екраном» → «Вкладка». Це вікно учень не бачить. Відповіді на вкладці уроку сховані.', 'Показывайте ученику только вкладку с уроком: «Поделиться экраном» → «Вкладка». Это окно ученик не видит. Ответы на вкладке урока скрыты.')}</div>
      <div class="box"><div class="row">${studentSelect() || `<span class="muted">${T('Учнів поки немає', 'Учеников пока нет')}</span>`}<span class="timer" id="mkT">0:00</span><button type="button" class="btn2" data-a="timer">${tRun ? T('Пауза', 'Пауза') : T('Старт', 'Старт')}</button></div>
        ${mk && info(mk.sec) ? `<p class="muted" style="margin:8px 0 0">${T('Минулого разу зупинилися', 'В прошлый раз остановились')}: <b>${esc(info(mk.sec).n)}. ${esc(info(mk.sec).title)}</b> · ${fmtDate(mk.at)} <button type="button" class="btn2" data-go="${mk.sec}">${T('Перейти', 'Перейти')}</button></p>` : ''}</div>
      ${s ? `<div class="box"><b>${esc(s.n)}. ${esc(s.title)}</b>${s.min ? ` <span class="muted">· ${s.min} ${T('хв', 'мин')}</span>` : ''}
        ${secNotes(s).map((n) => `<div class="note">${n}</div>`).join('') || `<p class="muted">${T('До цього завдання нотаток немає.', 'К этому заданию заметок нет.')}</p>`}
        ${secAns(s).map((a) => `<div class="ans">${a}</div>`).join('')}
        <div class="row" style="margin-top:10px">
          <button type="button" class="btn2" data-a="mark">${IC.flag}${T('Зупинилися тут', 'Остановились здесь')}</button>
          ${HW[s.id] ? `<button type="button" class="btn2" data-a="hw">${IC.hw}${T('Задати домашкою', 'Задать домашкой')}</button>` : ''}
          ${secAns(s).length ? `<button type="button" class="btn2${revealed ? ' on' : ''}" data-a="reveal">${IC.eye}${revealed ? T('Сховати відповіді', 'Скрыть ответы') : T('Показати відповіді учню', 'Показать ответы ученику')}</button>` : ''}
        </div></div>` : ''}
      <div class="box"><b>${T('Хід уроку', 'Ход урока')}</b> <span class="muted">${T('натисніть, щоб прокрутити урок учню', 'нажмите, чтобы прокрутить урок ученику')}</span>
        <ol>${INFO.map((x) => `<li class="${x.id === (s && s.id) ? 'cur' : ''}${mk && mk.sec === x.id ? ' mark' : ''}"><button type="button" data-go="${x.id}"><i>${esc(x.n)}</i><span data-mk="${T('тут зупинилися', 'тут остановились')}">${esc(x.title)}</span><small>${x.min ? x.min + ' ' + T('хв', 'мин') : ''}</small></button></li>`).join('')}</ol></div>
      <div class="box row">${HOME.length ? `<button type="button" class="btn2 go" data-a="home">${IC.hw}${T('Задати всю домашку уроку', 'Задать всю домашку урока')}</button>` : ''}<button type="button" class="btn2${shareOn ? ' on' : ''}" data-a="share">${IC.screen}${shareOn ? T('Демонстрація: увімкнена', 'Демонстрация: включена') : T('Демонстрація: вимкнена', 'Демонстрация: выключена')}</button></div>
      ${plan ? `<details class="box"><summary>${T('План уроку', 'План урока')}</summary>${plan.innerHTML.replace(/<summary[\s\S]*?<\/summary>/, '')}</details>` : ''}`;
    bindLang(pultRoot); applyLang();
    const sel = pultRoot.querySelector('[data-mk-student]'); if (sel) sel.onchange = () => setStudent(sel.value);
    pultRoot.querySelectorAll('[data-go]').forEach((b) => (b.onclick = () => { cur = b.dataset.go; if (ch) ch.postMessage({ t: 'go', id: b.dataset.go }); renderPult(); }));
    const q = (a) => pultRoot.querySelector(`[data-a=${a}]`);
    if (q('mark')) q('mark').onclick = () => markModal(s.id);
    if (q('hw')) q('hw').onclick = () => hwModal(s.id);
    if (q('home')) q('home').onclick = () => hwModal('all');
    if (q('reveal')) q('reveal').onclick = () => { const on = !s.el.classList.contains('mk-reveal'); s.el.classList.toggle('mk-reveal', on); if (ch) ch.postMessage({ t: 'reveal', id: s.id, on }); renderPult(); };
    q('share').onclick = () => { shareOn = !shareOn; if (ch) ch.postMessage({ t: 'setshare', on: shareOn }); renderPult(); };
    q('timer').onclick = () => { if (tRun) { tAcc += Date.now() - t0; tRun = false; } else { t0 = Date.now(); tRun = true; } renderPult(); };
    tick();
  }
  function tick() { const el = document.getElementById('mkT'); if (!el) return; const ms = tAcc + (tRun ? Date.now() - t0 : 0); const sec = Math.floor(ms / 1000); el.textContent = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`; }

  // ---------- запуск ----------
  function onMsg(m) {
    if (!m || !m.t) return;
    if (m.t === 'lang') setLang(m.l, true);
    if (m.t === 'student') setStudent(m.id, true);
    if (m.t === 'mark' && !PULT) { load().then((d) => { if (d) { D = d; renderBanner(); markSection(); } }); }
    if (PULT) {
      if (m.t === 'cur') { cur = m.id; renderPult(); }
      if (m.t === 'share') { shareOn = m.on; renderPult(); }
    } else {
      if (m.t === 'go') goTo(m.id);
      if (m.t === 'reveal') { const s = info(m.id); if (s) s.el.classList.toggle('mk-reveal', m.on); }
      if (m.t === 'setshare') setShare(m.on);
      if (m.t === 'hello') { ch.postMessage({ t: 'cur', id: cur }); ch.postMessage({ t: 'share', on: document.body.classList.contains('mk-share') }); }
    }
  }
  if (ch) ch.onmessage = (e) => onMsg(e.data);

  async function start() {
    if (PULT) {
      document.body.classList.add('mk-pult', 'teacher');
      pultRoot = document.createElement('div'); pultRoot.id = 'mk-pult'; pultRoot.className = 'mk-p'; document.body.appendChild(pultRoot);
      document.title = `${T('Пульт', 'Пульт')} · ${TITLE}`;
      try { window.speechSynthesis && (window.speechSynthesis.speak = function () {}); } catch (e) { /* */ }
      D = await load();
      if (!D) { pultRoot.innerHTML = `<header>${LOGO}<b>Murly</b></header><p class="tip">${T('Увійдіть у Murly як учитель, щоб користуватися пультом.', 'Войдите в Murly как учитель, чтобы пользоваться пультом.')}</p>`; return; }
      renderPult(); if (ch) ch.postMessage({ t: 'hello' });
      setInterval(tick, 1000);
      return;
    }
    brand();
    if (ON_SITE) wordPicker();
    document.body.classList.add('mk-student');
    D = await load();
    if (!D) return;
    document.body.classList.remove('mk-student'); document.body.classList.add('mk-teacher');
    if (!D.students.length && D.local) SID = 'local';
    tools(); renderDock(); renderBanner(); markSection(); watchScroll(); applyLang();
    if (!D.local) setTimeout(() => { if (LIVE) warmVoices(); }, 1500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
