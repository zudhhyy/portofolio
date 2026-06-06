'use client';

import confetti from 'canvas-confetti';
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
    ]),
  );
}

function fireWinConfetti() {
  const colors = ['#93c5fd', '#c4b5fd', '#fde047', '#ffffff'];
  confetti({ particleCount: 90, spread: 70, origin: { y: 0.55 }, colors });
  setTimeout(() => {
    confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors });
    confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors });
  }, 180);
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
            return next.map((item) =>
              item.symbol === first!.symbol ? { ...item, matched: true, flipped: true } : item,
            );
          }

          setLock(true);
          setTimeout(() => {
            setCards((latest) =>
              latest.map((item) =>
                item.flipped && !item.matched ? { ...item, flipped: false } : item,
              ),
            );
            setLock(false);
          }, 700);
        }

        return next;
      });
    },
    [lock, won],
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
          {cards.map((card, index) => {
            const faceUp = card.flipped || card.matched;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => flip(index)}
                disabled={lock || card.matched || won}
                className={`focus-ring flex size-14 items-center justify-center rounded-md border text-xl transition sm:size-16 ${
                  faceUp
                    ? card.matched
                      ? 'border-emerald-400/50 bg-emerald-500/15'
                      : 'border-blue-300/40 bg-white/[0.08]'
                    : 'border-white/10 bg-white/[0.04] hover:border-blue-300/40'
                } disabled:cursor-default`}
                aria-label={faceUp ? `Card ${card.symbol}` : 'Hidden card'}
              >
                {faceUp ? card.symbol : '?'}
              </button>
            );
          })}
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
