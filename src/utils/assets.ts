/**
 * Safe asset resolver.
 * Every image in src/assets is registered at build time via import.meta.glob,
 * so a missing file can never cause "Failed to resolve import".
 * asset('cc-pink.png', 'cc-blue.png') returns the first file that exists,
 * or a transparent pixel if none of them do.
 */
const files = import.meta.glob<string>('../assets/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' })

const EMPTY = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export function asset(name: string, ...fallbacks: string[]): string {
  for (const n of [name, ...fallbacks]) {
    const url = files[`../assets/${n}`]
    if (url) return url
  }
  return EMPTY
}
