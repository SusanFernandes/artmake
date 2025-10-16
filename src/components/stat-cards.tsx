"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatCards() {
  return (
    <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
      <Stat title="New Launched" value="102" change="+15%" note="Previous period" positive />
      <Stat title="Scaling" value="56" change="+20%" note="Previous period" positive />
      <Stat title="Winners" value="12" change="+53%" note="Previous period" positive />
      <Stat title="CTR" value="2.1%" change="+4%" note="Previous period" positive />
      <Stat title="CPA" value="$18" change="-9%" note="Previous period" />
      <Stat title="Active Tests" value="34" change="+7%" note="Previous period" positive />
    </div>
  )
}

function Stat({
  title,
  value,
  change,
  note,
  positive,
}: {
  title: string
  value: string
  change: string
  note: string
  positive?: boolean
}) {
  return (
    <Card className="border-muted">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-semibold">{value}</div>
        <div className="text-xs mt-2 text-muted-foreground">
          <span className={positive ? "text-emerald-600" : "text-red-600"}>{change}</span> {note}
        </div>
      </CardContent>
    </Card>
  )
}
