'use client';

import { fireWinConfetti } from '@/lib/fire-win-confetti';
import { useEffect, useRef, useState } from 'react';

type Cell = 'X' | 'O' | null;
type Board = Cell[];

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(board: Board): Cell | 'draw' | null {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return board.every(Boolean) ? 'draw' : null;
}

function bestMove(board: Board): number {
  const empty = board.map((c, i) => (c ? -1 : i)).filter((i) => i >= 0) as number[];
  for (const i of empty) {
    const next = [...board];
    next[i] = 'O';
    if (getWinner(next) === 'O') return i;
  }
  for (const i of empty) {
    const next = [...board];
    next[i] = 'X';
    if (getWinner(next) === 'X') return i;
  }
  if (board[4] === null) return 4;
  const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)]!;
  return empty[Math.floor(Math.random() * empty.length)]!;
}

function dumbMove(board: Board): number {
  const empty = board.map((c, i) => (c ? -1 : i)).filter((i) => i >= 0) as number[];
  return empty[Math.floor(Math.random() * empty.length)]!;
}

function pickMove(board: Board, dumbMode: boolean): number {
  return dumbMode ? dumbMove(board) : bestMove(board);
}

type TicTacToeCellProps = {
  value: Cell;
  index: number;
  thinking: boolean;
  onPlay: (index: number) => void;
};

function TicTacToeCell({ value, index, thinking, onPlay }: TicTacToeCellProps) {
  const faceUp = value !== null;

  return (
    <button
      type="button"
      onClick={() => onPlay(index)}
      disabled={faceUp || thinking}
      className="focus-ring size-20 [perspective:800px] disabled:cursor-default sm:size-24"
      aria-label={faceUp ? `Cell ${value}` : 'Empty cell'}
    >
      <div
        className={`relative size-full transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:transition-none ${
          faceUp ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <span className="absolute inset-0 flex items-center justify-center rounded-md border border-white/10 bg-white/[0.04] [backface-visibility:hidden] hover:border-blue-300/40" />
        <span
          className={`absolute inset-0 flex items-center justify-center rounded-md border border-white/10 bg-white/[0.08] text-3xl font-bold [backface-visibility:hidden] [transform:rotateY(180deg)] ${
            value === 'X' ? 'text-blue-300' : 'text-violet-300'
          }`}
        >
          {value}
        </span>
      </div>
    </button>
  );
}

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [thinking, setThinking] = useState(false);
  const [gamesCompleted, setGamesCompleted] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confettiFiredRef = useRef(false);

  const dumbMode = gamesCompleted >= 3;

  const winner = getWinner(board);
  const finished = winner !== null;

  useEffect(() => {
    if (winner === 'X' && !confettiFiredRef.current) {
      confettiFiredRef.current = true;
      void fireWinConfetti();
    }
  }, [winner]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function play(index: number) {
    if (board[index] || finished || thinking) return;

    const next = [...board];
    next[index] = 'X';
    setBoard(next);

    if (getWinner(next)) return;

    setThinking(true);
    timeoutRef.current = setTimeout(() => {
      setBoard((current) => {
        if (getWinner(current)) return current;
        const after = [...current];
        const cpu = pickMove(after, dumbMode);
        after[cpu] = 'O';
        return after;
      });
      setThinking(false);
    }, 750);
  }

  function reset() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (finished) {
      if (winner === 'X') setGamesCompleted(0);
      else setGamesCompleted((count) => count + 1);
    }
    confettiFiredRef.current = false;
    setThinking(false);
    setBoard(Array(9).fill(null));
  }

  const endMessage = winner === 'X' ? 'You Win!' : winner === 'O' ? 'CPU Wins' : winner === 'draw' ? 'Draw Game' : null;

  const endColor = winner === 'X' ? 'text-blue-300' : winner === 'O' ? 'text-violet-300' : 'text-neutral-300';

  const status = thinking ? (dumbMode ? 'CPU is guessing...' : 'CPU is thinking...') : finished ? null : 'You are X — take a turn';

  return (
    <div>
      <div className="relative flex h-[360px] flex-col items-center justify-center rounded-lg border border-white/10 bg-black/30 p-4">
        {finished && endMessage ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className={`text-4xl font-bold sm:text-5xl ${endColor}`}>{endMessage}</p>
            {winner === 'X' ? <p className="text-sm text-neutral-400">Nice work — you won!</p> : null}
            <button
              type="button"
              onClick={reset}
              className="focus-ring rounded-md border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition hover:border-blue-300/40"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            {thinking ? (
              <p className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center animate-pulse text-sm font-medium text-violet-300">
                {dumbMode ? 'CPU is guessing...' : 'CPU is thinking...'}
              </p>
            ) : null}
            <div className={`grid grid-cols-3 gap-2 ${thinking ? 'opacity-70' : ''}`}>
              {board.map((cell, index) => (
                <TicTacToeCell key={index} value={cell} index={index} thinking={thinking} onPlay={play} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 text-xs text-neutral-400">
        <p className="text-white font-bold">{status ?? '\u00A0'}</p>
        {!finished ? (
          <button
            type="button"
            onClick={reset}
            className="focus-ring rounded-md border border-white/10 px-2.5 py-1 text-neutral-300 transition hover:border-blue-300/40 hover:text-white"
          >
            Reset
          </button>
        ) : null}
      </div>
    </div>
  );
}
