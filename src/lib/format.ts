const integer = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })
const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})
const currencyCents = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function formatInteger(value: number): string {
  return integer.format(value)
}

export function formatCurrency(value: number): string {
  return currency.format(value)
}

export function formatCurrencyCents(value: number): string {
  return currencyCents.format(value)
}

// Takes a fraction: 0.015 -> "1.5%".
export function formatPercent(fraction: number, digits = 1): string {
  return `${(fraction * 100).toFixed(digits)}%`
}

// Same as formatPercent but always signed: 0.02 -> "+2.0%", -0.027 -> "-2.7%".
export function formatVariation(fraction: number): string {
  const sign = fraction > 0 ? '+' : ''
  return `${sign}${formatPercent(fraction)}`
}

// 68000 -> "68k", 1250 -> "1.3k", 950 -> "950".
export function formatCompact(value: number): string {
  if (value < 1000) return String(value)
  const thousands = value / 1000
  return `${thousands.toFixed(thousands < 10 ? 1 : 0).replace(/\.0$/, '')}k`
}
