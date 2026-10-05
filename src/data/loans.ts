import personal from '../assets/loan-personal.png'; import corporate from '../assets/loan-corporate.png'
import business from '../assets/loan-business.png'; import custom from '../assets/loan-custom.png'

export const loanStats: { label: string; value: number | string; icon: string }[] = [
  { label: 'Personal Loans', value: 50000, icon: personal }, { label: 'Corporate Loans', value: 100000, icon: corporate },
  { label: 'Business Loans', value: 500000, icon: business }, { label: 'Custom Loans', value: 'Choose Money', icon: custom },
]
export const loanColumns = ['SL No', 'Loan Money', 'Left to repay', 'Duration', 'Interest rate', 'Installment', 'Repay']
const r = (n: string, money: string, left: string, duration: string, rate: string, inst: string) => ({ n, money, left, duration, rate, inst })
export const loanRows = [
  r('01.', '$100,000', '$40,500', '8 Months', '12%', '$2,000 / month'), r('02.', '$500,000', '$250,000', '36 Months', '10%', '$8,000 / month'),
  r('03.', '$900,000', '$40,500', '12 Months', '12%', '$5,000 / month'), r('04.', '$50,000', '$40,500', '25 Months', '5%', '$2,000 / month'),
  r('05.', '$50,000', '$40,500', '5 Months', '16%', '$10,000 / month'), r('06.', '$80,000', '$25,500', '14 Months', '8%', '$2,000 / month'),
  r('07.', '$12,000', '$5,500', '9 Months', '13%', '$500 / month'), r('08.', '$160,000', '$100,800', '3 Months', '12%', '$900 / month'),
]
export const loanTotal = { money: '$125,0000', left: '$750,000', inst: '$50,000 / month' }
