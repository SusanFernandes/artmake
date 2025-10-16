"use client"

import { useMemo } from "react"
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"

type Row = { name: string; spend: number }

export function SpendBarChart() {
  const data = useMemo<Row[]>(
    () => [
      { name: "New Launched", spend: 1020 },
      { name: "Scaling", spend: 560 },
      { name: "Winners", spend: 820 },
    ],
    [],
  )

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="text-sm font-medium mb-2">Spend by Category</div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 16, left: 4, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip content={<SpendTooltip />} />
            <Bar dataKey="spend" fill="hsl(var(--chart-1))" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function SpendTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const p = payload[0].payload as Row
  return (
    <Card className="pointer-events-none w-56 border shadow-xl">
      <div className="p-3">
        <div className="text-sm font-medium">{p.name}</div>
        <div className="text-muted-foreground text-xs">Spend</div>
        <div className="font-semibold text-lg">${p.spend.toLocaleString()}</div>
      </div>
    </Card>
  )
}
