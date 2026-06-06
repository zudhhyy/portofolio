'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const WIDTH = 420;
const HEIGHT = 320;
const PADDLE_W = 76;
const PADDLE_H = 10;
const BALL_R = 5;
const ROWS = 5;
const COLS = 8;
const PAD = 4;
const TOP = 44;
const LEFT = 10;
const BRICK_H = 16;

const BRICK_COLORS = ['#62A8FF', '#8B5CF6', '#A78BFA', '#D8B4FE', '#34D399'];

type Brick = { x: number; y: number; w: number; h: number; alive: boolean; color: string };

type GameState = {
  paddleX: number;
  ballX: number;
  ballY: number;
  ballDx: number;
  ballDy: number;
  bricks: Brick[];
  running: boolean;
  attached: boolean;
};

function createBricks(brickW: number): Brick[] {
  const bricks: Brick[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      bricks.push({
        x: LEFT + col * (brickW + PAD),
        y: TOP + row * (BRICK_H + PAD),
        w: brickW,
        h: BRICK_H,
        alive: true,
        color: BRICK_COLORS[row % BRICK_COLORS.length],
      });
    }
  }
  return bricks;
}

function initialState(): GameState {
  const brickW = (WIDTH - LEFT * 2 - PAD * (COLS - 1)) / COLS;
  return {
    paddleX: WIDTH / 2 - PADDLE_W / 2,
    ballX: WIDTH / 2,
    ballY: HEIGHT - 36,
    ballDx: 2.6,
    ballDy: -2.6,
    bricks: createBricks(brickW),
    running: false,
    attached: true,
  };
}

export function BlockBreaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<GameState>(initialState());
  const rafRef = useRef<number>(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [status, setStatus] = useState<'ready' | 'playing' | 'won' | 'lost'>('ready');

  const syncUi = useCallback((nextScore: number, nextLives: number, nextStatus: typeof status) => {
    scoreRef.current = nextScore;
    livesRef.current = nextLives;
    setScore(nextScore);
    setLives(nextLives);
    setStatus(nextStatus);
  }, []);

  const resetRound = useCallback(
    (keepScore = false, keepLives = true) => {
      const brickW = (WIDTH - LEFT * 2 - PAD * (COLS - 1)) / COLS;
      const g = gameRef.current;
      g.paddleX = WIDTH / 2 - PADDLE_W / 2;
      g.ballX = WIDTH / 2;
      g.ballY = HEIGHT - 36;
      g.ballDx = 2.6 * (Math.random() > 0.5 ? 1 : -1);
      g.ballDy = -2.6;
      g.bricks = createBricks(brickW);
      g.running = false;
      g.attached = true;

      syncUi(keepScore ? scoreRef.current : 0, keepLives ? livesRef.current : 3, 'ready');
    },
    [syncUi],
  );

  const launch = useCallback(() => {
    if (status === 'won') {
      resetRound(false, true);
      return;
    }
    if (status === 'lost') {
      resetRound(false, false);
      return;
    }
    const g = gameRef.current;
    if (!g.running && g.attached) {
      g.running = true;
      g.attached = false;
      setStatus('playing');
    }
  }, [resetRound, status]);

  const setPaddleFromClientX = useCallback((clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scale = WIDTH / rect.width;
    const x = (clientX - rect.left) * scale - PADDLE_W / 2;
    gameRef.current.paddleX = Math.max(0, Math.min(WIDTH - PADDLE_W, x));
    if (gameRef.current.attached) {
      gameRef.current.ballX = gameRef.current.paddleX + PADDLE_W / 2;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const step = () => {
      const g = gameRef.current;

      if (g.running && !g.attached) {
        g.ballX += g.ballDx;
        g.ballY += g.ballDy;

        if (g.ballX - BALL_R <= 0 || g.ballX + BALL_R >= WIDTH) {
          g.ballDx *= -1;
          g.ballX = Math.max(BALL_R, Math.min(WIDTH - BALL_R, g.ballX));
        }
        if (g.ballY - BALL_R <= 0) {
          g.ballDy *= -1;
          g.ballY = BALL_R;
        }

        const paddleY = HEIGHT - 24;
        if (
          g.ballDy > 0 &&
          g.ballY + BALL_R >= paddleY &&
          g.ballY + BALL_R <= paddleY + PADDLE_H + 4 &&
          g.ballX >= g.paddleX &&
          g.ballX <= g.paddleX + PADDLE_W
        ) {
          const hit = (g.ballX - (g.paddleX + PADDLE_W / 2)) / (PADDLE_W / 2);
          g.ballDx = hit * 3.2;
          g.ballDy = -Math.abs(g.ballDy);
          g.ballY = paddleY - BALL_R;
        }

        if (g.ballY - BALL_R > HEIGHT) {
          const nextLives = livesRef.current - 1;
          if (nextLives <= 0) {
            g.running = false;
            syncUi(scoreRef.current, 0, 'lost');
          } else {
            g.attached = true;
            g.running = false;
            g.ballX = g.paddleX + PADDLE_W / 2;
            g.ballY = paddleY - BALL_R - 2;
            syncUi(scoreRef.current, nextLives, 'ready');
          }
        }

        for (const brick of g.bricks) {
          if (!brick.alive) continue;
          if (
            g.ballX + BALL_R >= brick.x &&
            g.ballX - BALL_R <= brick.x + brick.w &&
            g.ballY + BALL_R >= brick.y &&
            g.ballY - BALL_R <= brick.y + brick.h
          ) {
            brick.alive = false;
            const overlapLeft = g.ballX + BALL_R - brick.x;
            const overlapRight = brick.x + brick.w - (g.ballX - BALL_R);
            const overlapTop = g.ballY + BALL_R - brick.y;
            const overlapBottom = brick.y + brick.h - (g.ballY - BALL_R);
            const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
            if (minOverlap === overlapLeft || minOverlap === overlapRight) g.ballDx *= -1;
            else g.ballDy *= -1;

            const nextScore = scoreRef.current + 10;
            syncUi(nextScore, livesRef.current, 'playing');
            break;
          }
        }

        if (g.bricks.every((b) => !b.alive)) {
          g.running = false;
          syncUi(scoreRef.current, livesRef.current, 'won');
        }
      } else if (g.attached) {
        g.ballX = g.paddleX + PADDLE_W / 2;
        g.ballY = HEIGHT - 24 - BALL_R - 2;
      }

      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      const bg = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      bg.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      bg.addColorStop(1, 'rgba(8, 12, 32, 0.98)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (const brick of g.bricks) {
        if (!brick.alive) continue;
        ctx.fillStyle = brick.color;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.roundRect(brick.x, brick.y, brick.w, brick.h, 3);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.beginPath();
      ctx.roundRect(g.paddleX, HEIGHT - 24, PADDLE_W, PADDLE_H, 4);
      ctx.fill();

      const ballGrad = ctx.createRadialGradient(g.ballX - 1, g.ballY - 1, 1, g.ballX, g.ballY, BALL_R);
      ballGrad.addColorStop(0, '#ffffff');
      ballGrad.addColorStop(1, '#93c5fd');
      ctx.fillStyle = ballGrad;
      ctx.beginPath();
      ctx.arc(g.ballX, g.ballY, BALL_R, 0, Math.PI * 2);
      ctx.fill();

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [syncUi]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const g = gameRef.current;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        launch();
      }
      if (e.key === 'ArrowLeft') g.paddleX = Math.max(0, g.paddleX - 18);
      if (e.key === 'ArrowRight') g.paddleX = Math.min(WIDTH - PADDLE_W, g.paddleX + 18);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [launch]);

  const statusLabel =
    status === 'won' ? 'You cleared the board!' : status === 'lost' ? 'Game over — try again' : 'Click or press Space to launch';

  return (
    <div className="glass relative rounded-lg p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-neutral-400">Mini Game</p>
          <h2 className="text-xl font-semibold">Block Breaker</h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-blue-200">Score {score}</span>
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-emerald-200">Lives {lives}</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-black/30">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="block w-full cursor-crosshair touch-none"
          onMouseMove={(e) => setPaddleFromClientX(e.clientX)}
          onTouchMove={(e) => {
            e.preventDefault();
            setPaddleFromClientX(e.touches[0]?.clientX ?? 0);
          }}
          onClick={launch}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 text-xs text-neutral-400">
        <p>{statusLabel}</p>
        <button
          type="button"
          onClick={() => resetRound(false, true)}
          className="focus-ring rounded-md border border-white/10 px-2.5 py-1 text-neutral-300 transition hover:border-blue-300/40 hover:text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
