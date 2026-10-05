// Self-healing project audit. Runs before dev/build (and from vite.config.ts).
// Scans every relative import in src/ and creates a fallback for any file that does not exist,
// so Vite and tsc never fail on "Failed to resolve import".
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(ROOT, 'src')
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4nGNgAAIAAAUAAXpeqz8AAAAASUVORK5CYII=', 'base64')
const SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>'
const IMG = /\.(png|jpe?g|gif|webp|svg)$/i
const EXTS = ['', '.ts', '.tsx', '.js', '.jsx', '.css', '/index.ts', '/index.tsx']

// Real implementations for small shared files (used instead of an empty stub when one is missing).
const TEMPLATES = {
  'components/SearchBar.tsx': `export default function SearchBar() {
  return (
    <label className="search">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="9" cy="9" r="6.5"/><path d="M14 14l4 4" strokeLinecap="round"/></svg>
      <input placeholder="Search for something" aria-label="Search" />
    </label>
  )
}
`,
  'components/Section.tsx': `import type { ReactNode } from 'react'
export default function Section({ title, action, children }: { title: string; action?: string; children: ReactNode }) {
  return (
    <section>
      <div className="sec-head"><h2>{title}</h2>{action && <button className="link">{action}</button>}</div>
      {children}
    </section>
  )
}
`,
  'components/StatusBadge.tsx': `export default function StatusBadge({ amount }: { amount: number }) {
  const sign = amount < 0 ? '-' : '+'
  return <span className={'amt ' + (amount < 0 ? 'neg' : 'pos')}>{sign}{'$'}{Math.abs(amount).toLocaleString('en-US')}</span>
}
`,
  'components/Pagination.tsx': `const Chev = ({ left }: { left?: boolean }) => (
  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d={left ? 'M7 1L1 7l6 6' : 'M1 1l6 6-6 6'}/></svg>
)
interface Props { page: number; pages: number; onChange: (p: number) => void }
export default function Pagination({ page, pages, onChange }: Props) {
  return (
    <nav className="pager" aria-label="Pagination">
      <button className="pn" disabled={page === 1} onClick={() => onChange(page - 1)}><Chev left /><span className="plabel">Previous</span></button>
      {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
        <button key={p} className={p === page ? 'pg on' : 'pg'} aria-current={p === page ? 'page' : undefined} onClick={() => onChange(p)}>{p}</button>
      ))}
      <button className="pn" disabled={page === pages} onClick={() => onChange(page + 1)}><span className="plabel">Next</span><Chev /></button>
    </nav>
  )
}
`,
  'hooks/useCountUp.ts': `import { useEffect, useState } from 'react'
export function useCountUp(target: number, ms = 350) {
  const [v, setV] = useState(0)
  useEffect(() => {
    let raf = 0; const t0 = performance.now()
    const tick = (t: number) => { const p = Math.min((t - t0) / ms, 1); setV(Math.round(target * p)); if (p < 1) raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf)
  }, [target, ms])
  return v
}
`,
  'hooks/useSize.ts': `import { useEffect, useRef, useState } from 'react'
export function useSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, size] as const
}
`,
  'utils/assets.ts': `const files = import.meta.glob<string>('../assets/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' })
const EMPTY = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
export function asset(name: string, ...fallbacks: string[]): string {
  for (const n of [name, ...fallbacks]) {
    const url = files['../assets/' + n]
    if (url) return url
  }
  return EMPTY
}
`,
}

const walk = d => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap(e => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])) : [])
const isFile = p => fs.existsSync(p) && fs.statSync(p).isFile()

function collect(file, need) {
  const re = /import\s+(?:([^'"]*?)\s+from\s+)?['"](\.{1,2}\/[^'"]+)['"]/g
  for (const m of fs.readFileSync(file, 'utf8').matchAll(re)) {
    const base = path.resolve(path.dirname(file), m[2])
    if (EXTS.some(e => isFile(base + e))) continue
    const r = need.get(base) ?? { def: false, named: new Set(), types: new Set() }
    const clause = (m[1] || '').trim()
    const typeOnly = /^type\s/.test(clause)
    const c = clause.replace(/^type\s+/, '')
    const brace = c.match(/\{([\s\S]*)\}/)
    const head = c.replace(/\{[\s\S]*\}/, '').replace(/,/g, '').trim()
    if (head && !head.startsWith('*')) r.def = true
    if (brace) {
      for (let n of brace[1].split(',')) {
        n = n.trim()
        if (!n) continue
        const t = typeOnly || /^type\s/.test(n)
        n = n.replace(/^type\s+/, '').split(/\s+as\s+/)[0].trim()
        ;(t ? r.types : r.named).add(n)
      }
    }
    need.set(base, r)
  }
}

function stub(tsx, r) {
  const L = ['// AUTO-GENERATED FALLBACK: the original file was missing from this copy of the project.']
  if (tsx) {
    if (r.def || !r.named.size) L.push('export default function Fallback(_props?: any) { return <></> }')
    r.named.forEach(n => L.push('export const ' + n + ': any = (_p?: any) => <></>'))
  } else {
    if (r.def) L.push('const fallback: any = []', 'export default fallback')
    r.named.forEach(n => L.push(/^use[A-Z]/.test(n) ? 'export const ' + n + " = (..._a: any[]): any => ({})" : 'export const ' + n + ': any = []'))
    if (!r.def && !r.named.size && !r.types.size) L.push('export {}')
  }
  r.types.forEach(n => L.push('export type ' + n + ' = any'))
  return L.join('\n') + '\n'
}

function create(base, r) {
  const ext = path.extname(base)
  let file = base, body
  if (IMG.test(ext)) body = /svg$/i.test(ext) ? SVG : PNG
  else if (ext === '.css') body = '/* auto-generated fallback */\n'
  else {
    const rel = path.relative(SRC, base).split(path.sep).join('/')
    const tsx = /^(components|pages|layouts)\//.test(rel) || /^[A-Z]/.test(path.basename(base))
    const dir = fs.existsSync(base) && fs.statSync(base).isDirectory()
    file = dir ? path.join(base, tsx ? 'index.tsx' : 'index.ts') : base + (tsx ? '.tsx' : '.ts')
    body = TEMPLATES[rel + (tsx ? '.tsx' : '.ts')] ?? stub(tsx, r)
  }
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, body)
  return path.relative(ROOT, file).split(path.sep).join('/')
}

export function ensureFiles() {
  const need = new Map()
  for (const f of walk(SRC)) if (/\.(tsx?|css)$/.test(f)) collect(f, need)
  const made = [...need].map(([b, r]) => create(b, r))
  if (made.length) {
    console.warn('[ensureFiles] ' + made.length + ' file(s) were missing and fallbacks were created:\n  - ' + made.join('\n  - '))
    console.warn('[ensureFiles] The project now compiles. Re-extract the full bankdash.zip to restore the original content of these files.')
  }
  return made
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) ensureFiles()
