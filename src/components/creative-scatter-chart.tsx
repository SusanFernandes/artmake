"use client"

import { useMemo } from "react"
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Scatter, Tooltip } from "recharts"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { cn } from "@/lib/utils"

type Point = {
  id: string
  roas: number
  spend: number
  group: "teal" | "gray"
  title: string
  thumbnail: string
}

const formatDollar = (n: number) => (n >= 1000 ? `$${(n / 1000).toFixed(0)},000` : `$${n}`)

export function CreativeScatterChart() {
  const data = useMemo<Point[]>(
    () => [
      { id: "a1", roas: 0.05, spend: 80, group: "teal", title: "Shot A", thumbnail: "/images/creative-sample.png" },
      { id: "a2", roas: 0.12, spend: 110, group: "gray", title: "Shot B", thumbnail: "/images/creative-sample.png" },
      { id: "a3", roas: 0.35, spend: 210, group: "teal", title: "Shot C", thumbnail: "/images/creative-sample.png" },
      { id: "a4", roas: 0.6, spend: 180, group: "gray", title: "Shot D", thumbnail: "/images/creative-sample.png" },
      { id: "a5", roas: 0.9, spend: 320, group: "teal", title: "Shot E", thumbnail: "/images/creative-sample.png" },
      { id: "a6", roas: 1.2, spend: 640, group: "gray", title: "Shot F", thumbnail: "/images/creative-sample.png" },
      { id: "a7", roas: 1.4, spend: 520, group: "teal", title: "Shot G", thumbnail: "/images/creative-sample.png" },
      { id: "a8", roas: 1.7, spend: 450, group: "gray", title: "Shot H", thumbnail: "/images/creative-sample.png" },
      { id: "a9", roas: 2.0, spend: 700, group: "teal", title: "Shot I", thumbnail: "/images/creative-sample.png" },
      { id: "a10", roas: 2.6, spend: 880, group: "teal", title: "Shot J", thumbnail: "/images/creative-sample.png" },
      { id: "a11", roas: 3.0, spend: 950, group: "gray", title: "Shot K", thumbnail: "/images/creative-sample.png" },
    ],
    [],
  )

  return (
    <div
      className="rounded-xl border bg-card"
      style={{
        // dotted-paper background like the screenshot
        backgroundImage:
          "radial-gradient(color-mix(in oklch, var(--color-border), transparent 40%) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <div className="p-4">
        <div className="text-xs text-muted-foreground mb-2">Spend</div>
        <div className="h-[460px] rounded-md bg-white/60 dark:bg-black/20 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 30, left: 40, bottom: 40 }}>
              <CartesianGrid strokeDasharray="0" stroke="color-mix(in oklch, var(--color-border), transparent 20%)" />
              <XAxis
                type="number"
                dataKey="roas"
                name="ROAS"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "oklch(0.556 0 0)" }}
                domain={[0, 3.2]}
              />
              <YAxis
                type="number"
                dataKey="spend"
                name="Spend"
                tickFormatter={(v) => formatDollar(v)}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "oklch(0.556 0 0)" }}
                domain={[0, 1000]}
              />
              <Tooltip cursor={{ strokeDasharray: "4 4" }} content={<HoverCardTooltip />} />
              <Scatter
                name="Creatives (teal)"
                data={data.filter((d) => d.group === "teal")}
                fill="hsl(var(--chart-2))"
                fillOpacity={0.9}
              />
              <Scatter
                name="Creatives (gray)"
                data={data.filter((d) => d.group === "gray")}
                fill="oklch(0.80 0 0)"
                fillOpacity={0.9}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-muted-foreground mt-2">ROAS</div>
      </div>
    </div>
  )
}

function HoverCardTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const p: Point = payload[0].payload

  return (
    <div className="pointer-events-none">
      <PhoneCard
        title={p.title}
        spend={p.spend}
        roas={p.roas}
        src={p.thumbnail}
        accent={p.group === "teal" ? "teal" : "gray"}
      />
    </div>
  )
}

function PhoneCard({
  src,
  title,
  spend,
  roas,
  accent = "teal",
}: {
  src: string
  title: string
  spend: number
  roas: number
  accent?: "teal" | "gray"
}) {
  return (
    <Card
      className={cn(
        "w-56 rounded-3xl overflow-hidden shadow-xl border-2",
        accent === "teal" ? "border-[hsl(var(--chart-2))]" : "border-muted",
      )}
    >
      <div className="bg-muted/60 p-2">
        <div className="mx-auto h-2 w-12 rounded-full bg-muted-foreground/30" />
      </div>
      <div className="relative aspect-[9/16] bg-black">
        <Image
          src={src || "/placeholder.svg"}
          alt="Creative preview"
          fill
          className="object-cover"
          sizes="224px"
          priority={false}
        />
      </div>
      <div className="p-3">
        <div className="text-sm font-medium line-clamp-1">{title}</div>
        <div className="mt-1 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div>
            <div className="text-foreground font-semibold">{formatDollar(spend)}</div>
            <div>Spend</div>
          </div>
          <div>
            <div className="text-foreground font-semibold">{roas.toFixed(2)}</div>
            <div>ROAS</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
