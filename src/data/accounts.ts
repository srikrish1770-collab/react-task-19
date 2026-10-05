import bag from '../assets/bag.png'; import hand from '../assets/hand.png'; import expense from '../assets/expense.png'; import piggy from '../assets/piggy.png'
import sync from '../assets/sync.png'; import tools from '../assets/tools.png'; import pink from '../assets/person-pink.png'; import apple from '../assets/apple.png'
import cream from '../assets/rect-cream.png'; import lav from '../assets/rect-lav.png'

export interface Tile { src?: string; bg?: string; glyph?: 'person' | 'ps'; color?: string }
export const accStats = [
  { label: 'My Balance', value: 12750, icon: bag }, { label: 'Income', value: 5600, icon: hand },
  { label: 'Expense', value: 3460, icon: expense }, { label: 'Total Saving', value: 7920, icon: piggy },
]
export const lastTx: { title: string; date: string; type: string; card: string; status: string; amount: number; tile: Tile }[] = [
  { title: 'Spotify Subscription', date: '25 Jan 2021', type: 'Shopping', card: '1234 ****', status: 'Pending', amount: -150, tile: { src: sync } },
  { title: 'Mobile Service', date: '25 Jan 2021', type: 'Service', card: '1234 ****', status: 'Completed', amount: -340, tile: { src: tools } },
  { title: 'Emilly Wilson', date: '25 Jan 2021', type: 'Transfer', card: '1234 ****', status: 'Completed', amount: 780, tile: { src: pink } },
]
export const invoices: { name: string; ago: string; price: string; tile: Tile }[] = [
  { name: 'Apple Store', ago: '5h ago', price: '$450', tile: { src: apple } },
  { name: 'Michael', ago: '2 days ago', price: '$160', tile: { bg: cream, glyph: 'person', color: '#F59E0B' } },
  { name: 'Playstation', ago: '5 days ago', price: '$1085', tile: { bg: lav, glyph: 'ps', color: '#4F46E5' } },
  { name: 'William', ago: '10 days ago', price: '$90', tile: { src: pink } },
]
export const accBars = [
  { d: 'Sat', debit: 135, credit: 234 }, { d: 'Sun', debit: 106, credit: 186 }, { d: 'Mon', debit: 102, credit: 139 },
  { d: 'Tue', debit: 212, credit: 123 }, { d: 'Wed', debit: 150, credit: 214 }, { d: 'Thu', debit: 158, credit: 105 }, { d: 'Fri', debit: 179, credit: 216 },
]
