// Російські пояснення «Чому так?» і підказки до пробних НМТ (лише на сервері)
import type { MockVariant } from './types';
import r1 from './ru-v1.json';
import r2 from './ru-v2.json';
import r3 from './ru-v3.json';
import r4 from './ru-v4.json';
import r5 from './ru-v5.json';
import r6 from './ru-v6.json';
import r7 from './ru-v7.json';
import r8 from './ru-v8.json';
import r9 from './ru-v9.json';
import r10 from './ru-v10.json';
import r11 from './ru-v11.json';
import r12 from './ru-v12.json';
import r13 from './ru-v13.json';
import r14 from './ru-v14.json';
import r15 from './ru-v15.json';
import r16 from './ru-v16.json';
import r17 from './ru-v17.json';
import r18 from './ru-v18.json';
import r19 from './ru-v19.json';
import r20 from './ru-v20.json';
const RU: Record<string, { k: string; why: string; hint: string }[]> = { '1': r1, '2': r2, '3': r3, '4': r4, '5': r5, '6': r6, '7': r7, '8': r8, '9': r9, '10': r10, '11': r11, '12': r12, '13': r13, '14': r14, '15': r15, '16': r16, '17': r17, '18': r18, '19': r19, '20': r20 };

export function localizeMock(v: MockVariant, lang: string): MockVariant {
  const ru = lang === 'ru' ? RU[v.id] : undefined;
  if (!ru) return v;
  const m = new Map(ru.map((x) => [x.k, x]));
  return {
    ...v,
    tasks: v.tasks.map((t, ti) => ({ ...t, items: t.items.map((it, qi) => {
      const r = m.get(`${ti}.${qi}`);
      return r ? { ...it, why: r.why || it.why, hint: r.hint || it.hint } : it;
    }) })) as MockVariant['tasks'],
  };
}
