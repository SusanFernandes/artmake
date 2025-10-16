"use client"

import { useMemo } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"

type Point = { date: string; roas: number; spend: number }

export function RoasTrendChart() {
  const data = useMemo<Point[]>(
    () => [
      { date: "Sep 01", roas: 0.8, spend: 220 },
      { date: "Sep 05", roas: 0.9, spend: 260 },
      { date: "Sep 10", roas: 1.1, spend: 300 },
      { date: "Sep 15", roas: 1.2, spend: 340 },
      { date: "Sep 20", roas: 1.4, spend: 500 },
      { date: "Sep 25", roas: 1.7, spend: 620 },
      { date: "Sep 30", roas: 1.6, spend: 580 },
    ],
    [],
  )

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="text-sm font-medium mb-2">ROAS Trend</div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 16, left: 4, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} domain={[0, "dataMax + 0.5"]} />
            <Tooltip content={<RoasTooltip />} />
            <Line type="monotone" dataKey="roas" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function RoasTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const p = payload[0].payload as Point
  return (
    <Card className="pointer-events-none w-56 border shadow-xl">
      <div className="p-3">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="text-muted-foreground">ROAS</div>
            <div className="font-semibold">{p.roas.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Spend</div>
            <div className="font-semibold">${p.spend}</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
