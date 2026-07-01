'use client';

import { track } from '@vercel/analytics';
import { Analytics } from '@vercel/analytics/next';
import { useEffect } from 'react';

function getClickLabel(element: HTMLElement) {
  const explicit = element.getAttribute('data-analytics');
  if (explicit) return explicit;

  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;

  const text = element.textContent?.replace(/\s+/g, ' ').trim();
  if (text) return text.slice(0, 80);

  return 'unknown';
}

export function VercelAnalytics() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const tracked =
        target.closest('button') ??
        target.closest('a[data-analytics]');

      if (!tracked || !(tracked instanceof HTMLElement)) return;

      track('click', {
        label: getClickLabel(tracked),
        path: window.location.pathname,
        tag: tracked.tagName.toLowerCase(),
      });
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return <Analytics />;
}
