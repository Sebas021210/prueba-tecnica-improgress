import type { FiltroItem, MesItem, Registro } from '@/types/dashboard'
import type { LeadsMes, MixItem } from '@/types/view'

export const ALL = 'todas'

interface Scope {
  marca: string
  plataforma: string
  mes?: string
}

export interface Totals {
  inversion: number
  inversionPlan: number
  leads: number
  mensajes: number
  conversaciones: number
  impresiones: number
  clics: number
}

export function filterRegistros(registros: Registro[], { marca, plataforma, mes }: Scope): Registro[] {
  return registros.filter(
    (r) =>
      (marca === ALL || r.marca === marca) &&
      (plataforma === ALL || r.plataforma === plataforma) &&
      (mes === undefined || r.mes === mes),
  )
}

export function sumTotals(rows: Registro[]): Totals {
  return rows.reduce<Totals>(
    (acc, r) => ({
      inversion: acc.inversion + r.inversion,
      inversionPlan: acc.inversionPlan + r.inversionPlan,
      leads: acc.leads + r.leads,
      mensajes: acc.mensajes + r.mensajes,
      conversaciones: acc.conversaciones + r.conversaciones,
      impresiones: acc.impresiones + r.impresiones,
      clics: acc.clics + r.clics,
    }),
    { inversion: 0, inversionPlan: 0, leads: 0, mensajes: 0, conversaciones: 0, impresiones: 0, clics: 0 },
  )
}

// Ratio of sums (not the mean of per-row CTRs), so big rows weigh more.
export function ctrOf(t: Totals): number {
  return t.impresiones === 0 ? 0 : t.clics / t.impresiones
}

export function variation(current: number, previous: number | undefined): number | null {
  if (previous === undefined || previous === 0) return null
  return (current - previous) / previous
}

export function previousMonthId(meses: MesItem[], mes: string): string | undefined {
  const index = meses.findIndex((m) => m.id === mes)
  return index > 0 ? meses[index - 1].id : undefined
}

export function leadsByMonth(
  registros: Registro[],
  meses: MesItem[],
  scope: Omit<Scope, 'mes'>,
  selectedMes: string,
): LeadsMes[] {
  const rows = filterRegistros(registros, scope)
  return meses.map((m) => ({
    mes: m.id,
    corto: m.corto,
    leads: sumTotals(rows.filter((r) => r.mes === m.id)).leads,
    selected: m.id === selectedMes,
  }))
}

// Respects the platform filter so the mix total always equals the executed-investment KPI.
export function investmentMix(rows: Registro[], plataformas: FiltroItem[]): MixItem[] {
  const total = sumTotals(rows).inversion
  return plataformas
    .filter((p) => p.id !== ALL)
    .map((p) => {
      const inversion = sumTotals(rows.filter((r) => r.plataforma === p.id)).inversion
      return { plataforma: p.id, nombre: p.nombre, inversion, share: total === 0 ? 0 : inversion / total }
    })
    .filter((item) => item.inversion > 0)
    .sort((a, b) => b.inversion - a.inversion)
}
