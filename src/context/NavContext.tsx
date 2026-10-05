import { createContext, useContext } from 'react'

/** Lets any component navigate between pages without prop drilling. */
export const NavContext = createContext<(label: string) => void>(() => {})
export const useNav = () => useContext(NavContext)
