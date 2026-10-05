export default function StatusBadge({ amount }: { amount: number }) {
  return <span className={`amt ${amount < 0 ? 'neg' : 'pos'}`}>{amount < 0 ? '-' : '+'}${Math.abs(amount).toLocaleString('en-US')}</span>
}
