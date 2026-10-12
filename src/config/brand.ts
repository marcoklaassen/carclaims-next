export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace('#', '');
  return {
    r: parseInt(cleaned.substring(0, 2), 16),
    g: parseInt(cleaned.substring(2, 4), 16),
    b: parseInt(cleaned.substring(4, 6), 16),
  };
}

export function toRgbString(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  return `${r}, ${g}, ${b}`;
}

export function lighten(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const nr = Math.min(255, Math.round(r + (255 - r) * amount));
  const ng = Math.min(255, Math.round(g + (255 - g) * amount));
  const nb = Math.min(255, Math.round(b + (255 - b) * amount));
  return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
}

export function darken(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const nr = Math.max(0, Math.round(r * (1 - amount)));
  const ng = Math.max(0, Math.round(g * (1 - amount)));
  const nb = Math.max(0, Math.round(b * (1 - amount)));
  return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
}

export const brandConfig = {
  primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#1AB3B9',
  secondaryColor: process.env.NEXT_PUBLIC_SECONDARY_COLOR || '#22D9E0',
  headerBg: process.env.NEXT_PUBLIC_HEADER_BG || '#333333',
  logoUrl: process.env.NEXT_PUBLIC_LOGO_URL || '/icon-carclaimsapi.svg',
  logoPosition: (process.env.NEXT_PUBLIC_LOGO_POSITION || 'right') as 'left' | 'right',
  buttonRadius: process.env.NEXT_PUBLIC_BUTTON_RADIUS || '30px',
  favicon: process.env.NEXT_PUBLIC_FAVICON || '/frida.ico',
};
