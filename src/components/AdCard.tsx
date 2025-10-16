import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { PlatformBadge } from "./PlatformBadge";
import { Heart, Eye, MessageCircle, Share2, Play } from "lucide-react";

interface AdCardExtras {
  className?: string;
  alt?: string;
}

interface AdCardProps {
  ad: {
    id: string;
    platform: string;
    brand: string;
    thumbnail: string;
    title: string;
    views: number;
    likes: number;
    comments: number;
    shares?: number;
    duration?: string;
    engagement: number;
  };
  onSave?: (id: string) => void;
  onPreview?: (id: string) => void;
}

export function AdCard({ ad, onSave, onPreview, ...rest }: AdCardProps & AdCardExtras) {
  const formatNumber = (num: any) => {
    // Defensive: handle undefined, null, or non-number values
    if (num === null || num === undefined) return "0";
    const n = typeof num === "number" ? num : Number(num || 0);
    if (isNaN(n)) return "0";
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  return (
    <Card className={`group overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg ${rest.className ?? ""}`}>
      <div className="relative aspect-[16/9] overflow-hidden rounded-md">
        <img
          src={ad.thumbnail}
          alt={rest.alt ?? ad.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <PlatformBadge platform={ad.platform} />
        </div>
        {ad.duration && (
          <div className="absolute right-2 bottom-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
            {ad.duration}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
          <Button
            size="icon"
            variant="secondary"
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            onClick={() => onPreview?.(ad.id)}
            aria-label={`Preview ad ${ad.title}`}
          >
            {ad.duration ? (
              <Play className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-foreground text-base font-semibold">
            {ad.brand}
          </span>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-primary h-8 w-8"
            onClick={() => onSave?.(ad.id)}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
          {ad.title}
        </p>
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {formatNumber(ad.views)}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {formatNumber(ad.likes)}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              {formatNumber(ad.comments)}
            </div>
          </div>
          <span className="text-success font-medium">{ad.engagement}%</span>
        </div>
      </div>
    </Card>
  );
}
