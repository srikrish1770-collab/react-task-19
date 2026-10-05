import type { Tile } from '../data/accounts'
export default function TileIcon({ tile }: { tile: Tile }) {
  if (tile.src) return <img className="tile" src={tile.src} alt="" />
  return (
    <span className="tile" style={{ backgroundImage: `url(${tile.bg})`, color: tile.color }}>
      <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {tile.glyph === 'person' ? <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z"/></>
          : <path d="M9 3v16l3.5 1.2V8c2 .5 3 1.5 3 3s-1 2.2-3 2.4v2c4-.2 6.5-1.8 6.5-5C19 6 15.500 3.500 9 3zM3 17l6-1.500M3 20l6-1.700"/>}
      </svg>
    </span>
  )
}
