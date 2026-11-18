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
