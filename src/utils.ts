export function invertColor(hex: string): string {
  return `#${Number(0xffffff - Number.parseInt(hex.slice(1), 16))
    .toString(16)
    .padStart(6, '0')}`
}
