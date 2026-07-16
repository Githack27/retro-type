export function loadGoogleFont(fontName: string) {
  if (typeof window === 'undefined') return;

  const normalFonts = ['helvetica', 'georgia', 'courier', 'system-ui', 'monospace', 'sans-serif', 'serif', 'special elite'];
  if (normalFonts.includes(fontName.toLowerCase())) {
    return;
  }

  const fontId = `g-font-${fontName.replace(/\s+/g, '-').toLowerCase()}`;
  if (!document.getElementById(fontId)) {
    const link = document.createElement('link');
    link.id = fontId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;700&display=swap`;
    document.head.appendChild(link);
  }
}
