import { useMemo, useState } from 'react'
import { txBase, type TxRow, type TxTab } from '../data'
const PAGE_SIZE = 5
const ALL: TxRow[] = Array.from({ length: 20 }, (_, i) => ({ ...txBase[i % 5], id: i, txId: i < 5 ? txBase[i].txId : `#${12548796 - i}` }))
export function useTransactions() {
  const [tab, setTab] = useState<TxTab>('All Transactions')
  const [page, setPage] = useState(1)
  const filtered = useMemo(() => ALL.filter(r => tab === 'All Transactions' || (tab === 'Income' ? r.amount > 0 : r.amount < 0)), [tab])
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  return {
    tab, page, pages, rows: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    changeTab: (t: TxTab) => { setTab(t); setPage(1) }, setPage,
  }
}
