const WIN_CONFETTI_COLORS = ['#93c5fd', '#c4b5fd', '#fde047', '#ffffff'];

export async function fireWinConfetti() {
  const confetti = (await import('canvas-confetti')).default;
  confetti({ particleCount: 90, spread: 70, origin: { y: 0.55 }, colors: WIN_CONFETTI_COLORS });
  setTimeout(() => {
    void confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors: WIN_CONFETTI_COLORS });
    void confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors: WIN_CONFETTI_COLORS });
  }, 180);
}
