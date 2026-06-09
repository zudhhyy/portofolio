'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const BlockBreaker = dynamic(() => import('@/components/block-breaker').then((m) => ({ default: m.BlockBreaker })));
const Battleship = dynamic(() => import('@/components/games/battleship').then((m) => ({ default: m.Battleship })));
const TicTacToe = dynamic(() => import('@/components/games/tic-tac-toe').then((m) => ({ default: m.TicTacToe })));
const Minesweeper = dynamic(() => import('@/components/games/minesweeper').then((m) => ({ default: m.Minesweeper })));
const MemoryCard = dynamic(() => import('@/components/games/memory-card').then((m) => ({ default: m.MemoryCard })));

const games: {
  id: string;
  title: string;
  hint: string;
  component: ComponentType;
}[] = [
  {
    id: 'block-breaker',
    title: 'Block Breaker',
    hint: 'Break all bricks before you run out of lives',
    component: BlockBreaker,
  },
  {
    id: 'battleship',
    title: 'Battleship',
    hint: 'Find and sink every hidden ship on the grid',
    component: Battleship,
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    hint: 'Play as X against the CPU',
    component: TicTacToe,
  },
  {
    id: 'minesweeper',
    title: 'Minesweeper',
    hint: 'Clear the grid without hitting a mine',
    component: Minesweeper,
  },
  {
    id: 'memory-card',
    title: 'Memory Card',
    hint: 'Match all 8 pairs with the fewest moves',
    component: MemoryCard,
  },
];

export function GameCarousel() {
  const [index, setIndex] = useState(0);
  const game = games[index]!;
  const Game = game.component;

  function prev() {
    setIndex((i) => (i - 1 + games.length) % games.length);
  }

  function next() {
    setIndex((i) => (i + 1) % games.length);
  }

  return (
    <div className="glass relative rounded-lg p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-neutral-400 bold">
            Mini Games <span className="text-xs text-white">({index + 1}/{games.length})</span>
          </p>
          <h2 className="text-xl font-semibold">{game.title}</h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous game"
            className="focus-ring inline-flex size-8 items-center justify-center rounded-md border border-white/10 text-neutral-300 transition hover:border-blue-300/40 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next game"
            className="focus-ring inline-flex size-8 items-center justify-center rounded-md border border-white/10 text-neutral-300 transition hover:border-blue-300/40 hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <Game key={game.id} />

      <div className="mt-3 flex items-center justify-center gap-2">
        {games.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${item.title}`}
            className={`focus-ring h-2 rounded-full transition ${i === index ? 'w-6 bg-blue-300' : 'w-2 bg-white/25 hover:bg-white/40'}`}
          />
        ))}
      </div>

      <p className="mt-2 text-center text-xs text-white">{game.hint}</p>
    </div>
  );
}
