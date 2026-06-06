import confetti from 'canvas-confetti';

const WIN_CONFETTI_COLORS = ['#93c5fd', '#c4b5fd', '#fde047', '#ffffff'];

export function fireWinConfetti() {
  confetti({ particleCount: 90, spread: 70, origin: { y: 0.55 }, colors: WIN_CONFETTI_COLORS });
  setTimeout(() => {
    confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors: WIN_CONFETTI_COLORS });
    confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors: WIN_CONFETTI_COLORS });
  }, 180);
}
