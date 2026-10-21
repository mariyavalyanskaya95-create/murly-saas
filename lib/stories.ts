// Усі історії для читання: страшні, романтичні, комедії.
import { STORIES as SCARY, type Story } from './scary-stories';
import { ROMANCE } from './stories-romance';
import { COMEDY } from './stories-comedy';

export type Genre = 'scary' | 'romance' | 'comedy';
export const GENRES: { id: Genre; label: { uk: string; ru: string; en: string }; kit: string }[] = [
  { id: 'scary', label: { uk: 'Страшні', ru: 'Страшные', en: 'Scary' }, kit: 'st-cat-shock' },
  { id: 'romance', label: { uk: 'Романтичні', ru: 'Романтические', en: 'Romantic' }, kit: 'st-cat-heart' },
  { id: 'comedy', label: { uk: 'Комедії', ru: 'Комедии', en: 'Comedy' }, kit: 'st-cat-blep' },
];
export const ALL_STORIES: (Story & { genre: Genre })[] = [
  ...SCARY.map((s) => ({ ...s, genre: 'scary' as Genre })),
  ...ROMANCE.map((s) => ({ ...s, genre: 'romance' as Genre })),
  ...COMEDY.map((s) => ({ ...s, genre: 'comedy' as Genre })),
];
export const findStory = (id: string) => ALL_STORIES.find((s) => s.id === id);
