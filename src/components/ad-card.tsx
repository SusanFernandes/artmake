"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link2, Bookmark, Play } from "lucide-react"

export type Ad = {
  id: string
  brand: string
  title?: string
  savedAgo: string
  image: string
  tags: string[]
  category: string
  // natural height hint for placeholders only
  height?: number
}

type Props = {
  ad: Ad
  onClick?: (ad: Ad) => void
}

export function AdCard({ ad, onClick }: Props) {
  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label={`${ad.brand} ${ad.title || "ad"}: click to view details`}
      onClick={() => onClick?.(ad)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick?.(ad)
        }
      }}
      className="mb-4 break-inside-avoid overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="min-w-0">
          <CardTitle className="text-sm font-medium text-pretty">{ad.brand}</CardTitle>
          <p className="text-xs text-muted-foreground">{ad.savedAgo}</p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Link2 className="h-4 w-4" aria-hidden="true" />
          <Bookmark className="h-4 w-4" aria-hidden="true" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative rounded-md overflow-hidden">
          {/* Use provided images or placeholders; fixed width with natural height */}
          <img
            src={ad.image || "/placeholder.svg"}
            alt={`${ad.brand} ad creative`}
            className="w-full h-auto object-cover"
            style={ad.height ? { height: ad.height } : undefined}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center justify-center rounded-full bg-background/70 backdrop-blur px-2 py-2 shadow">
              <Play className="h-5 w-5" />
            </span>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {ad.tags.slice(0, 3).map((t) => (
            <Badge key={t} variant="secondary" className="rounded-full">
              {"#" + t}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
