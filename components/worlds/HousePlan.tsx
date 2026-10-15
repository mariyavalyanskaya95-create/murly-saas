'use client';
// План будинку згори: кімнати можна перетягувати, вони чіпляються одна до одної, де торкаються, там двері.
import { useMemo, useRef, useState } from 'react';
import { DOOR_W, GAP, bounds, connected, doorsOf, snapNear, type PlanRoom } from '@/lib/worlds/house-plan';

type R = PlanRoom & { name: string; wallHex: string; floorHex: string };

export default function HousePlan({ rooms, current, onChange, onEnter, onClose, onBad }: {
  rooms: R[]; current?: string;
  onChange: (rooms: R[]) => void; onEnter: (id: string) => void; onClose: () => void; onBad: (msg: string) => void;
}) {
  const level = rooms.find((r) => r.id === current)?.level ?? 0;
  const on = rooms.filter((r) => (r.level ?? 0) === level);
  const svg = useRef<SVGSVGElement>(null);
  type Drag = { id: string; dx: number; dz: number; x: number; z: number; sx: number; sz: number; moved: boolean };
  const [drag, setDragState] = useState<Drag | null>(null);
  const dragRef = useRef<Drag | null>(null); // події миші бувають швидші за перемальовування
  const setDrag = (d: Drag | null) => { dragRef.current = d; setDragState(d); };
  const b = useMemo(() => bounds(on, level), [on, level]);
  const pad = 2.2; // місце довкола, щоб було куди перетягнути
  const vb = { x: b.minX - pad, z: b.minZ - pad, w: b.maxX - b.minX + pad * 2, h: b.maxZ - b.minZ + pad * 2 };
  const toPlan = (e: React.PointerEvent) => {
    const el = svg.current!; const r = el.getBoundingClientRect();
    const k = Math.max(vb.w / r.width, vb.h / r.height); // preserveAspectRatio meet
    const ox = (r.width * k - vb.w) / 2, oz = (r.height * k - vb.h) / 2;
    return { x: vb.x - ox + (e.clientX - r.left) * k, z: vb.z - oz + (e.clientY - r.top) * k };
  };
  const shown = on.map((r) => (drag && r.id === drag.id ? { ...r, at: { x: drag.x, z: drag.z } } : r));

  const down = (e: React.PointerEvent, r: R) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    const p = toPlan(e);
    setDrag({ id: r.id, dx: p.x - r.at!.x, dz: p.z - r.at!.z, x: r.at!.x, z: r.at!.z, sx: r.at!.x, sz: r.at!.z, moved: false });
  };
  const move = (e: React.PointerEvent) => {
    const d = dragRef.current; if (!d) return;
    const p = toPlan(e);
    const x = p.x - d.dx, z = p.z - d.dz;
    setDrag({ ...d, x, z, moved: d.moved || Math.hypot(x - d.sx, z - d.sz) > 0.15 });
  };
  const up = (e: React.PointerEvent) => {
    const d0 = dragRef.current; if (!d0) return;
    const p = toPlan(e);
    const d = { ...d0, x: p.x - d0.dx, z: p.z - d0.dz }; d.moved = d0.moved || Math.hypot(d.x - d.sx, d.z - d.sz) > 0.15;
    setDrag(null);
    const r = rooms.find((q) => q.id === d.id)!;
    if (!d.moved) { onEnter(d.id); return; }
    if (on.length < 2) return;
    const at = snapNear(r, on.filter((q) => q.id !== d.id), d.x, d.z);
    if (!at) { onBad('No space there.'); return; }
    const next = rooms.map((q) => (q.id === d.id ? { ...q, at } : q));
    if (!connected(next, level)) { onBad('All rooms must be joined by doors.'); return; }
    onChange(next);
  };

  return (
    <div className="hm-plan" role="dialog" aria-label="House plan">
      <div className="hm-plan__head">
        <b>House plan</b>
        <span>Drag a room next to another room. Where rooms touch, there is a door. Tap a room to go there.</span>
        <button className="mu-btn mu-btn--lime t-btn-sm hm-en" onClick={onClose}>Done</button>
      </div>
      <svg ref={svg} viewBox={`${vb.x} ${vb.z} ${vb.w} ${vb.h}`} onPointerMove={move} onPointerUp={up} onPointerCancel={() => setDrag(null)}>
        <defs>
          <pattern id="hm-grid" width="0.4" height="0.4" patternUnits="userSpaceOnUse"><path d="M0.4 0H0V0.4" fill="none" stroke="#cfe3c2" strokeWidth="0.02" /></pattern>
        </defs>
        <rect x={vb.x} y={vb.z} width={vb.w} height={vb.h} fill="url(#hm-grid)" />
        {shown.map((r) => {
          const h = r.size / 2, x = r.at!.x - h, z = r.at!.z - h;
          return (
            <g key={r.id} className={`hm-plan__room ${r.id === current ? 'is-me' : ''} ${drag?.id === r.id ? 'is-drag' : ''}`} onPointerDown={(e) => down(e, r)}>
              <rect x={x - GAP / 2} y={z - GAP / 2} width={r.size + GAP} height={r.size + GAP} fill={r.wallHex} rx="0.05" />
              <rect x={x} y={z} width={r.size} height={r.size} fill={r.floorHex} />
              <text x={r.at!.x} y={r.at!.z} textAnchor="middle" dominantBaseline="middle" fontSize="0.32">{r.name}</text>
              {r.id === current && <text x={r.at!.x} y={r.at!.z + 0.42} textAnchor="middle" fontSize="0.22">you are here</text>}
            </g>
          );
        })}
        {!drag && on.flatMap((r) => doorsOf(r.id, on).filter((d) => r.id < d.to).map((d) => {
          const h = r.size / 2 + GAP / 2, cx = r.at!.x, cz = r.at!.z;
          const [x, z] = d.side === 0 ? [cx + d.at, cz - h] : d.side === 1 ? [cx - h, cz + d.at] : d.side === 2 ? [cx + d.at, cz + h] : [cx + h, cz + d.at];
          const horiz = d.side === 0 || d.side === 2;
          return <rect key={`${r.id}-${d.to}`} className="hm-plan__door" x={horiz ? x - DOOR_W / 2 : x - 0.09} y={horiz ? z - 0.09 : z - DOOR_W / 2} width={horiz ? DOOR_W : 0.18} height={horiz ? 0.18 : DOOR_W} />;
        }))}
      </svg>
    </div>
  );
}
