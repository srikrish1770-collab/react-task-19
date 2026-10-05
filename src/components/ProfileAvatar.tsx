import { useEffect, useState, type ChangeEvent } from 'react'
import { asset } from '../utils/assets'

const defaultAvatar = asset('set-avatar.png', 'me.png')
export default function ProfileAvatar() {
  const [src, setSrc] = useState(defaultAvatar)
  useEffect(() => () => { if (src.startsWith('blob:')) URL.revokeObjectURL(src) }, [src])
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setSrc(URL.createObjectURL(file))
  }
  return (
    <div className="pf-avatar">
      <img className="pf-img" src={src} alt="Profile" />
      <label className="pf-edit" title="Change profile image">
        <svg width="55%" height="55%" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25zM20.7 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
        <input type="file" accept="image/*" aria-label="Change profile image" onChange={onChange} />
      </label>
    </div>
  )
}
