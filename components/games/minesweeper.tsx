'use client';

import confetti from 'canvas-confetti';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const ROWS = 8;
const COLS = 8;
const MINES = 10;

type Cell = {
  mine: boolean;
  adjacent: number;
  revealed: boolean;
  flagged: boolean;
};

type GameStatus = 'playing' | 'won' | 'lost';

function createEmptyBoard(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false,
      adjacent: 0,
      revealed: false,
      flagged: false,
    })),
  );
}

function inBounds(row: number, col: number) {
  return row >= 0 && row < ROWS && col >= 0 && col < COLS;
}

function neighbors(row: number, col: number): [number, number][] {
  const cells: [number, number][] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const r = row + dr;
      const c = col + dc;
      if (inBounds(r, c)) cells.push([r, c]);
    }
  }
  return cells;
}

function placeMines(board: Cell[][], safeRow: number, safeCol: number): Cell[][] {
  const next = board.map((row) => row.map((cell) => ({ ...cell })));
  const safe = new Set<string>([`${safeRow},${safeCol}`]);
  for (const [r, c] of neighbors(safeRow, safeCol)) safe.add(`${r},${c}`);

  let placed = 0;
  while (placed < MINES) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);
    if (safe.has(`${row},${col}`) || next[row]![col]!.mine) continue;
    next[row]![col]!.mine = true;
    placed++;
  }

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (next[row]![col]!.mine) continue;
      next[row]![col]!.adjacent = neighbors(row, col).filter(([r, c]) => next[r]![c]!.mine).length;
    }
  }

  return next;
}

function revealCell(board: Cell[][], row: number, col: number): { board: Cell[][]; hitMine: boolean } {
  const next = board.map((r) => r.map((cell) => ({ ...cell })));
  const cell = next[row]![col]!;
  if (cell.revealed || cell.flagged) return { board: next, hitMine: false };

  const queue: [number, number][] = [[row, col]];
  let hitMine = false;

  while (queue.length) {
    const [r, c] = queue.shift()!;
    const current = next[r]![c]!;
    if (current.revealed || current.flagged) continue;

    current.revealed = true;
    if (current.mine) {
      hitMine = true;
      break;
    }

    if (current.adjacent === 0) {
      for (const [nr, nc] of neighbors(r, c)) {
        if (!next[nr]![nc]!.revealed) queue.push([nr, nc]);
      }
    }
  }

  return { board: next, hitMine };
}

function toggleFlag(board: Cell[][], row: number, col: number): Cell[][] {
  const next = board.map((r) => r.map((cell) => ({ ...cell })));
  const cell = next[row]![col]!;
  if (cell.revealed) return next;
  cell.flagged = !cell.flagged;
  return next;
}

function revealAllMines(board: Cell[][]): Cell[][] {
  return board.map((row) =>
    row.map((cell) => (cell.mine ? { ...cell, revealed: true } : cell)),
  );
}

function checkWin(board: Cell[][]): boolean {
  return board.every((row) => row.every((cell) => cell.mine || cell.revealed));
}

function fireWinConfetti() {
  const colors = ['#93c5fd', '#c4b5fd', '#fde047', '#ffffff'];
  confetti({ particleCount: 90, spread: 70, origin: { y: 0.55 }, colors });
  setTimeout(() => {
    confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors });
    confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors });
  }, 180);
}

const NUMBER_CLASS: Record<number, string> = {
  1: 'text-blue-300',
  2: 'text-emerald-300',
  3: 'text-red-300',
  4: 'text-violet-300',
  5: 'text-amber-300',
  6: 'text-cyan-300',
  7: 'text-neutral-200',
  8: 'text-neutral-400',
};

export function Minesweeper() {
  const [board, setBoard] = useState<Cell[][]>(() => createEmptyBoard());
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [flagMode, setFlagMode] = useState(false);
  const confettiFiredRef = useRef(false);

  const flags = useMemo(() => board.flat().filter((cell) => cell.flagged).length, [board]);
  const finished = status !== 'playing';

  useEffect(() => {
    if (status === 'won' && !confettiFiredRef.current) {
      confettiFiredRef.current = true;
      fireWinConfetti();
    }
  }, [status]);

  const interact = useCallback(
    (row: number, col: number, action: 'reveal' | 'flag') => {
      if (finished) return;

      if (action === 'flag') {
        setBoard((current) => toggleFlag(current, row, col));
        return;
      }

      setBoard((current) => {
        let next = current;
        if (!started) {
          next = placeMines(current, row, col);
          setStarted(true);
        }

        const cell = next[row]![col]!;
        if (cell.flagged) return next;

        const result = revealCell(next, row, col);
        next = result.board;

        if (result.hitMine) {
          setStatus('lost');
          return revealAllMines(next);
        }

        if (checkWin(next)) setStatus('won');
        return next;
      });
    },
    [finished, started],
  );

  function reset() {
    confettiFiredRef.current = false;
    setBoard(createEmptyBoard());
    setStarted(false);
    setStatus('playing');
    setFlagMode(false);
  }

  const statusText =
    status === 'won'
      ? 'Cleared — you win!'
      : status === 'lost'
        ? 'Boom — mine hit!'
        : flagMode
          ? 'Flag mode — tap to mark mines'
          : 'Tap to reveal. Right-click or flag mode to mark mines.';

  return (
    <div>
      <div className="flex h-[360px] items-center justify-center rounded-lg border border-white/10 bg-black/30 p-4">
        <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
          {board.flatMap((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const key = `${rowIndex}-${colIndex}`;
              let content: React.ReactNode = null;
              let cellClass = 'border-white/10 bg-white/[0.2] hover:border-blue-300/40';

              if (cell.revealed) {
                if (cell.mine) {
                  content = '💣';
                  cellClass = 'border-red-400/60 bg-red-500/30';
                } else if (cell.adjacent > 0) {
                  content = cell.adjacent;
                  cellClass = 'border-white/10 bg-white/[0.08]';
                } else {
                  cellClass = 'border-white/10 bg-white/[0.06]';
                }
              } else if (cell.flagged) {
                content = '🚩';
                cellClass = 'border-amber-400/40 bg-amber-500/10';
              }

              return (
                <button
                  key={key}
                  type="button"
                  disabled={finished && !cell.mine}
                  onClick={() => interact(rowIndex, colIndex, flagMode ? 'flag' : 'reveal')}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    interact(rowIndex, colIndex, 'flag');
                  }}
                  className={`focus-ring flex size-8 items-center justify-center rounded-sm border text-xs font-bold transition sm:size-9 ${
                    finished ? 'disabled:cursor-default' : ''
                  } ${cellClass} ${cell.revealed && cell.adjacent > 0 ? NUMBER_CLASS[cell.adjacent] : ''}`}
                  aria-label={`Cell ${rowIndex + 1}, ${colIndex + 1}`}
                >
                  {content}
                </button>
              );
            }),
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 text-xs text-neutral-400">
        <p className="font-bold text-white">{statusText}</p>
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-white/10 px-2 py-1 text-blue-200">
            🚩 {flags}/{MINES}
          </span>
          <button
            type="button"
            onClick={() => setFlagMode((mode) => !mode)}
            disabled={finished}
            className={`focus-ring rounded-md border px-2.5 py-1 transition ${
              flagMode
                ? 'border-amber-400/50 bg-amber-500 text-amber-200'
                : 'border-white/10 text-neutral-300 hover:border-blue-300/40 hover:text-white'
            } disabled:cursor-default disabled:opacity-50`}
          >
            Flag
          </button>
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
