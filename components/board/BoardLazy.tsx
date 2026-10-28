'use client';
import dynamic from 'next/dynamic';

// Excalidraw працює лише в браузері
const BoardLazy = dynamic(() => import('./Board'), { ssr: false, loading: () => <div className="bd bd--loading">…</div> });
export default BoardLazy;
