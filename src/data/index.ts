import home from '../assets/home.png'; import tx from '../assets/transactions.png'
import inv from '../assets/investments.png'; import cc from '../assets/creditcards.png'
import loans from '../assets/loans.png'; import serv from '../assets/services.png'
import priv from '../assets/privileges.png'; import set from '../assets/setting.png'
import livia from '../assets/livia.png'; import randy from '../assets/randy.png'; import workman from '../assets/workman.png'

export const menu = [
  { label: 'Dashboard', icon: home }, { label: 'Transactions', icon: tx }, { label: 'Accounts', icon: '' },
  { label: 'Investments', icon: inv }, { label: 'Credit Cards', icon: cc }, { label: 'Loans', icon: loans },
  { label: 'Services', icon: serv }, { label: 'My Privileges', icon: priv }, { label: 'Setting', icon: set },
]
export const transactions = [
  { title: 'Deposit from my Card', date: '28 January 2021', amount: -850, tone: 'warning' },
  { title: 'Deposit Paypal', date: '25 January 2021', amount: 2500, tone: 'primary' },
  { title: 'Jemi Wilson', date: '21 January 2021', amount: 5400, tone: 'success' },
] as const
export const weekly = [
  { d: 'Sat', dep: 240, wd: 500 }, { d: 'Sun', dep: 130, wd: 410 }, { d: 'Mon', dep: 270, wd: 320 },
  { d: 'Tue', dep: 370, wd: 500 }, { d: 'Wed', dep: 240, wd: 150 }, { d: 'Thu', dep: 240, wd: 390 }, { d: 'Fri', dep: 350, wd: 400 },
]
export const expenses = [
  { label: 'Entertainment', pct: 30, color: 'var(--primary)' }, { label: 'Bill Expense', pct: 15, color: 'var(--warning)' },
  { label: 'Others', pct: 35, color: 'var(--secondary)' }, { label: 'Investment', pct: 20, color: 'var(--accent)' },
]
export const contacts = [
  { name: 'Livia Bator', role: 'CEO', img: livia, bold: true }, { name: 'Randy Press', role: 'Director', img: randy, bold: false },
  { name: 'Workman', role: 'Designer', img: workman, bold: false },
]
export const balance = [100, 340, 230, 480, 430, 780, 200, 570, 210, 620, 590]
export const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']

export interface TxRow { id: number; desc: string; txId: string; type: string; card: string; date: string; amount: number }
export const txBase: Omit<TxRow, 'id'>[] = [
  { desc: 'Spotify Subscription', txId: '#12548796', type: 'Shopping', card: '1234 ****', date: '28 Jan, 12.30 AM', amount: -2500 },
  { desc: 'Freepik Sales', txId: '#12548796', type: 'Transfer', card: '1234 ****', date: '25 Jan, 10.40 PM', amount: 750 },
  { desc: 'Mobile Service', txId: '#12548796', type: 'Service', card: '1234 ****', date: '20 Jan, 10.40 PM', amount: -150 },
  { desc: 'Wilson', txId: '#12548796', type: 'Transfer', card: '1234 ****', date: '15 Jan, 03.29 PM', amount: -1050 },
  { desc: 'Emilly', txId: '#12548796', type: 'Transfer', card: '1234 ****', date: '14 Jan, 10.40 PM', amount: 840 },
]
export const txTabs = ['All Transactions', 'Income', 'Expense'] as const
export type TxTab = typeof txTabs[number]
export const expenseBars = [
  { m: 'Aug', v: 4200, h: 92, t: 68 }, { m: 'Sep', v: 9800, h: 142, t: 110 }, { m: 'Oct', v: 4600, h: 96, t: 73 },
  { m: 'Nov', v: 2100, h: 49, t: 38 }, { m: 'Dec', v: 12500, h: 129, t: 98, hi: true }, { m: 'Jan', v: 4000, h: 88, t: 63 },
]
