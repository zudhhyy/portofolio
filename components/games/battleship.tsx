'use client';

import confetti from 'canvas-confetti';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const SIZE = 8;
const SHIPS = [3, 2, 2];

type Cell = 'ship' | 'hit' | 'miss' | null;

function placeShips(): Cell[][] {
  const grid: Cell[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));

  for (const length of SHIPS) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 100) {
      attempts++;
      const horizontal = Math.random() > 0.5;
      const row = Math.floor(Math.random() * SIZE);
      const col = Math.floor(Math.random() * SIZE);
      const cells: [number, number][] = [];

      for (let i = 0; i < length; i++) {
        const r = horizontal ? row : row + i;
        const c = horizontal ? col + i : col;
        if (r >= SIZE || c >= SIZE || grid[r]![c]) {
          cells.length = 0;
          break;
        }
        cells.push([r, c]);
      }

      if (cells.length === length) {
        for (const [r, c] of cells) grid[r]![c] = 'ship';
        placed = true;
      }
    }
  }

  return grid;
}

function fireWinConfetti() {
  const colors = ['#93c5fd', '#c4b5fd', '#fde047', '#ffffff'];
  confetti({
    particleCount: 90,
    spread: 70,
    origin: { y: 0.55 },
    colors,
  });
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors,
    });
  }, 180);
}

export function Battleship() {
  const [fleet, setFleet] = useState<Cell[][]>(() => placeShips());
  const [shots, setShots] = useState<Cell[][]>(() => Array.from({ length: SIZE }, () => Array(SIZE).fill(null)));
  const confettiFiredRef = useRef(false);

  const shipCells = useMemo(() => fleet.flat().filter((c) => c === 'ship').length, [fleet]);
  const hits = useMemo(() => shots.flat().filter((c) => c === 'hit').length, [shots]);
  const won = hits >= shipCells && shipCells > 0;

  useEffect(() => {
    if (won && !confettiFiredRef.current) {
      confettiFiredRef.current = true;
      fireWinConfetti();
    }
  }, [won]);

  const fire = useCallback(
    (row: number, col: number) => {
      if (shots[row]![col] || won) return;
      const next = shots.map((r) => [...r]);
      next[row]![col] = fleet[row]![col] === 'ship' ? 'hit' : 'miss';
      setShots(next);
    },
    [fleet, shots, won],
  );

  function reset() {
    confettiFiredRef.current = false;
    setFleet(placeShips());
    setShots(Array.from({ length: SIZE }, () => Array(SIZE).fill(null)));
  }

  const status = won ? 'Fleet destroyed — you win!' : 'Tap the grid to fire. Find all 3 hidden ships.';

  return (
    <div>
      <div className="flex h-[360px] items-center justify-center rounded-lg border border-white/10 bg-black/30 p-4">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}>
          {Array.from({ length: SIZE * SIZE }, (_, i) => {
            const row = Math.floor(i / SIZE);
            const col = i % SIZE;
            const state = shots[row]![col];
            return (
              <button
                key={i}
                type="button"
                onClick={() => fire(row, col)}
                disabled={Boolean(state) || won}
                className={`focus-ring size-8 rounded-sm border transition sm:size-9 ${
                  state === 'hit'
                    ? 'border-red-400/60 bg-red-500/40'
                    : state === 'miss'
                      ? 'border-white/10 bg-white/[0.06]'
                      : 'border-white/10 bg-white/[0.04] hover:border-blue-300/40'
                } disabled:cursor-default`}
                aria-label={`Fire at ${row + 1}, ${col + 1}`}
              >
                {state === 'hit' ? '💥' : state === 'miss' ? '🌊' : ''}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 text-xs text-neutral-400">
        <p className="text-white font-bold">{status}</p>
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-white/10 px-2 py-1 text-blue-200">Hits {hits}/{shipCells}</span>
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
