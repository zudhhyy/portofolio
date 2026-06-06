export const openInNewTab = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;

export function openHrefInNewTab(href: string) {
  const url = href.startsWith('#') ? `${window.location.origin}${window.location.pathname}${href}` : href;
  window.open(url, '_blank', 'noopener,noreferrer');
}
