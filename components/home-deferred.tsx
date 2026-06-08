'use client';

import dynamic from 'next/dynamic';

export const DeferredStarField = dynamic(
  () => import('@/components/star-field').then((m) => ({ default: m.StarField })),
  { ssr: false },
);

export const DeferredGameCarousel = dynamic(
  () => import('@/components/game-carousel').then((m) => ({ default: m.GameCarousel })),
  { ssr: false, loading: () => <div className="glass hidden min-h-[320px] rounded-lg lg:block" /> },
);
