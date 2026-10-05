import { asset } from '../utils/assets'

const hand = asset('svc-hand.png')
export interface ServiceTile { src?: string; bg?: string; fg?: string }
export const serviceCategories = [
  { title: 'Life Insurance', sub: 'Unlimited protection', icon: asset('svc-life.png') },
  { title: 'Shopping', sub: 'Buy. Think. Grow.', icon: asset('svc-shop.png') },
  { title: 'Safety', sub: 'We are your allies', icon: asset('svc-safety.png') },
]
export const serviceList: { name: string; tile: ServiceTile }[] = [
  { name: 'Business loans', tile: { src: hand } },
  { name: 'Checking accounts', tile: { bg: asset('svc-bg-cream.png'), fg: asset('svc-briefcase.png') } },
  { name: 'Savings accounts', tile: { bg: asset('svc-bg-pink.png'), fg: asset('svc-chart.png') } },
  { name: 'Debit and credit cards', tile: { bg: asset('svc-bg-lav.png'), fg: asset('svc-user.png') } },
  { name: 'Life Insurance', tile: { bg: asset('svc-bg-teal.png'), fg: asset('svc-shield.png') } },
  { name: 'Business loans', tile: { src: hand } },
]
export const serviceDescription = 'It is a long established'
export const serviceColumns = [1, 2, 3].map(n => ({ id: n, title: 'Lorem Ipsum', sub: 'Many publishing' }))
export const highlightedService = 2
