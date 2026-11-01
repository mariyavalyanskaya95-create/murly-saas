import { POSTS } from './posts';
export type { Post, Block, Lang2 } from './types';
export const BLOG = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
export const getPost = (slug: string) => BLOG.find((p) => p.slug === slug);
