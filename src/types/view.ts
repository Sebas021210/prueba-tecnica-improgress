// Shapes the dashboard hook hands to the components (already filtered and aggregated).

import type { Audiencia, ConversionCanal, Pacing } from '@/types/dashboard'

export interface DashboardFilters {
  marca: string
  plataforma: string
  mes: string
}

// `variation` is a fraction (0.12 = +12%); null when there is no previous month to compare.
export interface KpiInversion {
  value: number
  plan: number
  progress: number
  variation: number | null
}

export interface KpiMensajes {
  value: number
  costoPorConversacion: number
  variation: number | null
}

export interface KpiSimple {
  value: number
  variation: number | null
}

export interface Kpis {
  inversion: KpiInversion
  mensajes: KpiMensajes
  ctr: KpiSimple
  conversaciones: KpiSimple
}

export interface LeadsMes {
  mes: string
  corto: string
  leads: number
  selected: boolean
}

export interface MixItem {
  plataforma: string
  nombre: string
  inversion: number
  share: number
}

export interface PanelesMarca {
  audiencia: Audiencia
  conversionPorCanal: ConversionCanal[]
  pacing: Pacing
}
