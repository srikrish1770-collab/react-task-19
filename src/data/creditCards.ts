import { asset } from '../utils/assets'

// Every icon has fallbacks, so a missing file never breaks the build.
const apple = asset('cc-apple.png', 'apple.png', 'cc-google.png')
const google = asset('cc-google.png', 'google.png', 'cc-apple.png')
const lock = asset('cc-lock.png', 'cc-block.png', 'cc-blue.png')
const block = asset('cc-block.png', 'cc-lock.png', 'cc-yellow.png')
const blue = asset('cc-blue.png', 'cc-yellow.png', 'cc-pink.png')
const pink = asset('cc-pink.png', 'cc-blue.png', 'cc-yellow.png')
const yellow = asset('cc-yellow.png', 'cc-blue.png', 'cc-pink.png')
const bgLav = asset('bg-lav.png', 'bg-pink.png', 'bg-cream.png')
const bgPink = asset('bg-pink.png', 'bg-lav.png', 'bg-cream.png')
const bgCream = asset('bg-cream.png', 'bg-lav.png', 'bg-pink.png')

export const cardVariants = [{ variant: 'sky' }, { variant: 'primary' }, { variant: 'light', faded: true }] as const
export const bankSlices = [
  { label: 'DBL Bank', color: 'var(--primary)', r: 88, from: 270, to: 360 },
  { label: 'BRC Bank', color: 'var(--accent)', r: 84, from: 90, to: 180 },
  { label: 'ABM Bank', color: 'var(--secondary)', r: 100, from: 0, to: 90 },
  { label: 'MCP Bank', color: 'var(--warning)', r: 80, from: 180, to: 270 },
]
export const cardList = [
  { bg: bgLav, fg: blue, bank: 'DBL Bank', number: '**** **** 5600', holder: 'William' },
  { bg: bgPink, fg: pink, bank: 'BRC Bank', number: '**** **** 4300', holder: 'Michel' },
  { bg: bgCream, fg: yellow, bank: 'ABM Bank', number: '**** **** 7560', holder: 'Edward' },
]
export const cardFields = [
  { id: 'type', label: 'Card Type', placeholder: 'Classic' }, { id: 'name', label: 'Name On Card', placeholder: 'My Cards' },
  { id: 'number', label: 'Card Number', placeholder: '**** **** **** ****' }, { id: 'exp', label: 'Expiration Date', placeholder: '25 January 2025', chevron: true },
]
export const cardSettings = [
  { title: 'Block Card', sub: 'Instantly block your card', icon: block },
  { title: 'Change Pin Code', sub: 'Choose another pin code', icon: lock },
  { title: 'Add to Google Pay', sub: 'Withdraw without any card', icon: google },
  { title: 'Add to Apple Pay', sub: 'Withdraw without any card', icon: apple },
  { title: 'Add to Apple Store', sub: 'Withdraw without any card', icon: apple },
]
