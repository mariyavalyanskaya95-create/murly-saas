// Сторінка «Англійська з малюком»: для батьків, які ростять білінгва або хочуть, щоб малюк з дитинства знав англійську.
import type { T } from '../i18n';
import type { ArtId } from '../activities/types';

export type Tip = { title: T; text: T; example?: string }; // example: коротка англійська фраза, яку можна казати малюку
export type Stage = { age: T; goal: T; tips: Tip[] }; // вік: 0-1, 1-2, 2-3, 3-5, 5-7
export type Book = { title: string; author: string; age: string; why: T }; // реальна книжка: лише назва, автор і наш опис
export type Story = { slug: string; title: string; age: string; art: ArtId[]; lines: string[]; words: string[]; uk: string[]; ru: string[] }; // наша коротка історія англійською + переклад по рядках
export type Rhyme = { title: string; lines: string[]; moves: T }; // наш віршик + рухи
export type Phrase = { en: string; uk: string; ru: string; when: T }; // фрази на кожен день
export type PrintGame = { slug: string; title: T; how: T; age: string; cards: { art: ArtId; word: string }[]; kind: 'memory' | 'bingo' | 'flashcards' | 'find' };
