import { settingsTabs } from './settings'

export interface SearchItem { label: string; hint: string; page: string; tab?: string }
/** Everything the header search can jump to. */
export const searchIndex: SearchItem[] = [
  { label: 'Dashboard', hint: 'Overview', page: 'Dashboard' },
  { label: 'Transactions', hint: 'Page', page: 'Transactions' },
  { label: 'Accounts', hint: 'Page', page: 'Accounts' },
  { label: 'Investments', hint: 'Page', page: 'Investments' },
  { label: 'Credit Cards', hint: 'Page', page: 'Credit Cards' },
  { label: 'Loans', hint: 'Page', page: 'Loans' },
  { label: 'Services', hint: 'Page', page: 'Services' },
  { label: 'My Privileges', hint: 'Page', page: 'My Privileges' },
  { label: 'Settings', hint: 'Page', page: 'Setting' },
  ...settingsTabs.map(t => ({ label: t, hint: 'Settings', page: 'Setting', tab: t })),
  { label: 'Quick Transfer', hint: 'Dashboard', page: 'Dashboard' },
  { label: 'Add New Card', hint: 'Credit Cards', page: 'Credit Cards' },
  { label: 'Trending Stock', hint: 'Investments', page: 'Investments' },
]

export const notifications = [
  { id: 1, title: 'Deposit received', text: 'Paypal deposited $2,500 to your account.', time: '2h ago' },
  { id: 2, title: 'New card added', text: 'Your DBL Bank card is ready to use.', time: 'Yesterday' },
  { id: 3, title: 'Loan reminder', text: 'Installment of $2,000 is due in 3 days.', time: '2 days ago' },
]
