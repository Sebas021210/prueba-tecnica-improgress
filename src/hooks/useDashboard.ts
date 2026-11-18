import { useMemo, useState } from 'react'
import { useAsyncData } from '@/hooks/useAsyncData'
import { fetchDashboardData } from '@/lib/api'
import {
  ALL,
  ctrOf,
  filterRegistros,
  investmentMix,
  leadsByMonth,
  previousMonthId,
  sumTotals,
  variation,
} from '@/lib/aggregate'
import type { DashboardData } from '@/types/dashboard'
import type { DashboardFilters, Kpis, LeadsMes, MixItem, PanelesMarca } from '@/types/view'

interface DashboardView {
  kpis: Kpis
  leadsPorMes: LeadsMes[]
  mix: MixItem[]
  paneles: PanelesMarca
  isEmpty: boolean
}

function buildView(data: DashboardData, { marca, plataforma, mes }: DashboardFilters): DashboardView {
  const { registros, filtros, panelesGlobales } = data

  const current = filterRegistros(registros, { marca, plataforma, mes })
  const prevId = previousMonthId(filtros.meses, mes)
  const previous = prevId ? sumTotals(filterRegistros(registros, { marca, plataforma, mes: prevId })) : undefined
  const now = sumTotals(current)

  return {
    isEmpty: current.length === 0,
    kpis: {
      inversion: {
        value: now.inversion,
        plan: now.inversionPlan,
        progress: now.inversionPlan === 0 ? 0 : now.inversion / now.inversionPlan,
        variation: variation(now.inversion, previous?.inversion),
      },
      mensajes: {
        value: now.mensajes,
        costoPorConversacion: panelesGlobales.costoPorConversacion[marca] ?? 0,
        variation: variation(now.mensajes, previous?.mensajes),
      },
      ctr: {
        value: ctrOf(now),
        variation: variation(ctrOf(now), previous ? ctrOf(previous) : undefined),
      },
      conversaciones: {
        value: now.conversaciones,
        variation: variation(now.conversaciones, previous?.conversaciones),
      },
    },
    leadsPorMes: leadsByMonth(registros, filtros.meses, { marca, plataforma }, mes),
    mix: investmentMix(current, filtros.plataformas),
    paneles: {
      audiencia: panelesGlobales.audiencia[marca],
      conversionPorCanal: panelesGlobales.conversionPorCanal[marca] ?? [],
      pacing: panelesGlobales.pacing[marca],
    },
  }
}

export function useDashboard() {
  const { data, loading, error, reload } = useAsyncData(fetchDashboardData)

  const [marca, setMarca] = useState(ALL)
  const [plataforma, setPlataforma] = useState(ALL)
  const [mesElegido, setMes] = useState<string | null>(null)

  const mes = mesElegido ?? data?.meta.mesDefault ?? ''

  const view = useMemo(
    () => (data ? buildView(data, { marca, plataforma, mes }) : null),
    [data, marca, plataforma, mes],
  )

  return {
    loading,
    error,
    reload,
    meta: data?.meta ?? null,
    opciones: data?.filtros ?? null,
    filters: { marca, plataforma, mes },
    setMarca,
    setPlataforma,
    setMes,
    view,
  }
}
