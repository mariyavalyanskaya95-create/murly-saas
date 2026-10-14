'use client';
import { createContext } from 'react';

// Хто хоче знати результат гри (домашка), загортає гру в цей провайдер
export const GameFinishContext = createContext<((score: number, total: number) => void) | null>(null);
