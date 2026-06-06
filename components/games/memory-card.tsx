'use client';

import { fireWinConfetti } from '@/lib/fire-win-confetti';
import { useCallback, useEffect, useRef, useState } from 'react';

const SYMBOLS = ['⭐', '🌙', '⚡', '🎯', '🚀', '💎', '🎮', '🔮'];
const COLS = 4;

type Card = {
  id: number;
  symbol: string;
  flipped: boolean;
  matched: boolean;
};

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j]!, next[i]!];
  }
  return next;
}

function createDeck(): Card[] {
  return shuffle(
    SYMBOLS.flatMap((symbol, index) => [
      { id: index * 2, symbol, flipped: false, matched: false },
      { id: index * 2 + 1, symbol, flipped: false, matched: false },
    ])
  );
}

type MemoryCardTileProps = {
  card: Card;
  index: number;
  lock: boolean;
  won: boolean;
  onFlip: (index: number) => void;
};

function MemoryCardTile({ card, index, lock, won, onFlip }: MemoryCardTileProps) {
  const faceUp = card.flipped || card.matched;

  return (
    <button
      type="button"
      onClick={() => onFlip(index)}
      disabled={lock || card.matched || won}
      className="focus-ring size-14 [perspective:800px] disabled:cursor-default sm:size-16"
      aria-label={faceUp ? `Card ${card.symbol}` : 'Hidden card'}
    >
      <div
        className={`relative size-full transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:transition-none ${
          faceUp ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <span className="absolute inset-0 flex items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-xl transition hover:border-blue-300/40 [backface-visibility:hidden]">
          ?
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center rounded-md border text-xl [backface-visibility:hidden] [transform:rotateY(180deg)] ${
            card.matched ? 'border-emerald-400/50 bg-emerald-500/15' : 'border-blue-300/40 bg-white/[0.08]'
          }`}
        >
          {card.symbol}
        </span>
      </div>
    </button>
  );
}

export function MemoryCard() {
  const [cards, setCards] = useState<Card[]>(() => createDeck());
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const confettiFiredRef = useRef(false);

  const won = cards.length > 0 && cards.every((card) => card.matched);

  useEffect(() => {
    if (won && !confettiFiredRef.current) {
      confettiFiredRef.current = true;
      fireWinConfetti();
    }
  }, [won]);

  const flip = useCallback(
    (index: number) => {
      if (lock || won) return;

      setCards((current) => {
        const card = current[index]!;
        if (card.flipped || card.matched) return current;

        const flippedCount = current.filter((item) => item.flipped && !item.matched).length;
        if (flippedCount >= 2) return current;

        const next = current.map((item, i) => (i === index ? { ...item, flipped: true } : item));
        const nowFlipped = next.filter((item) => item.flipped && !item.matched);

        if (nowFlipped.length === 2) {
          setMoves((count) => count + 1);
          const [first, second] = nowFlipped;

          if (first!.symbol === second!.symbol) {
            return next.map((item) => (item.symbol === first!.symbol ? { ...item, matched: true, flipped: true } : item));
          }

          setLock(true);
          setTimeout(() => {
            setCards((latest) => latest.map((item) => (item.flipped && !item.matched ? { ...item, flipped: false } : item)));
            setLock(false);
          }, 700);
        }

        return next;
      });
    },
    [lock, won]
  );

  function reset() {
    confettiFiredRef.current = false;
    setCards(createDeck());
    setMoves(0);
    setLock(false);
  }

  const status = won ? 'All pairs found — you win!' : 'Flip two cards and find every matching pair.';

  return (
    <div>
      <div className="flex h-[360px] items-center justify-center rounded-lg border border-white/10 bg-black/30 p-4">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
          {cards.map((card, index) => (
            <MemoryCardTile key={card.id} card={card} index={index} lock={lock} won={won} onFlip={flip} />
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 text-xs text-neutral-400">
        <p className="font-bold text-white">{status}</p>
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-white/10 px-2 py-1 text-blue-200">Moves {moves}</span>
          <button
            type="button"
            onClick={reset}
            className="focus-ring rounded-md border border-white/10 px-2.5 py-1 text-neutral-300 transition hover:border-blue-300/40 hover:text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
