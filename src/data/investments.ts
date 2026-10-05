import tesla from '../assets/tesla.png'; import google from '../assets/google.png'; import apple from '../assets/apple-pink.png'
import rate from '../assets/rate.png'; import count from '../assets/count.png'; import total from '../assets/total.png'

export const invStats = [
  { label: 'Total Invested Amount', value: 150000, icon: total, scale: 1, format: (n: number) => `$${n.toLocaleString('en-US')}` },
  { label: 'Number of Investments', value: 1250, icon: count, scale: 1, format: (n: number) => n.toLocaleString('en-US') },
  { label: 'Rate of Return', value: 5.8, icon: rate, scale: 100, format: (n: number) => `+${n.toFixed(2)}%` },
]
export const years = ['2016', '2017', '2018', '2019', '2020', '2021']
export const yearly = [6000, 24000, 16000, 37000, 21000, 29500]
export const monthly = [11000, 14000, 20500, 12000, 27000, 32500, 21000, 29000, 24500, 15000, 34500]
export interface Holding { name: string; sub: string; value: string; ret: number; icon: string }
export const holdings: Holding[] = [
  { name: 'Apple Store', sub: 'E-commerce, Marketplace', value: '$54,000', ret: 16, icon: apple },
  { name: 'Samsung Mobile', sub: 'E-commerce, Marketplace', value: '$25,300', ret: -4, icon: google },
  { name: 'Tesla Motors', sub: 'Electric Vehicles', value: '$8,200', ret: 25, icon: tesla },
]
export const stocks = [
  { no: '01.', name: 'Trivago', price: '$520', ret: 5 }, { no: '02.', name: 'Canon', price: '$480', ret: 10 },
  { no: '03.', name: 'Uber Food', price: '$350', ret: -3 }, { no: '04.', name: 'Nokia', price: '$940', ret: 2 },
  { no: '05.', name: 'Tiktok', price: '$670', ret: -12 },
]
