export function loadGoogleFont(fontName: string) {
  if (typeof window === 'undefined') return;

  const normalFonts = ['helvetica', 'georgia', 'courier', 'system-ui', 'monospace', 'sans-serif', 'serif'];
  if (normalFonts.includes(fontName.toLowerCase())) {
    document.documentElement.style.setProperty('--font-mono', fontName);
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

  document.documentElement.style.setProperty('--font-mono', `'${fontName}', monospace`);
}

export function applySettingsStyles(fontFamily: string, localFont: string, fontSize: number) {
  if (typeof window === 'undefined') return;

  const fontToUse = localFont.trim() !== '' ? localFont : fontFamily;
  if (localFont.trim() !== '') {
    document.documentElement.style.setProperty('--font-mono', `'${localFont}', monospace`);
  } else {
    loadGoogleFont(fontToUse);
  }

  document.documentElement.style.setProperty('--font-size-typer', `${fontSize}rem`);
}
