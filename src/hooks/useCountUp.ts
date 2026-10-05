import { useEffect, useState } from 'react'

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Eased count-up (easeOutCubic). Skips the animation when the user prefers reduced motion. */
export function useCountUp(target: number, ms = 1000) {
  const [v, setV] = useState(() => (reduced() ? target : 0))
  useEffect(() => {
    if (reduced()) { setV(target); return }
    let raf = 0; const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min((t - t0) / ms, 1)
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, ms])
  return v
}
