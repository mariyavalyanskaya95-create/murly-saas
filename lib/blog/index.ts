import { POSTS } from './posts';
import { POSTS_2 } from './posts-2';
import { POSTS_3 } from './posts-3';
export type { Post, Block, Lang2 } from './types';
export const BLOG = [...POSTS, ...POSTS_2, ...POSTS_3].sort((a, b) => b.date.localeCompare(a.date));
export const getPost = (slug: string) => BLOG.find((p) => p.slug === slug);
