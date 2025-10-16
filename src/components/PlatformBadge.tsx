import { Badge } from "@/components/ui/badge";

interface PlatformBadgeProps {
  platform?: string;
  size?: "sm" | "md";
  className?: string;
}

const platformColors: Record<string, string> = {
  tiktok: "bg-black text-white",
  instagram: "gradient-primary text-white",
  youtube: "bg-youtube text-white",
  linkedin: "bg-linkedin text-white",
  facebook: "bg-facebook text-white",
  twitter: "bg-twitter text-white",
  pinterest: "bg-pinterest text-white",
};

export function PlatformBadge({ platform = "unknown", size = "sm", className = "" }: PlatformBadgeProps) {
  const key = (platform || "").toLowerCase();
  const colorClass = platformColors[key] ?? "bg-muted text-foreground";
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  const label = platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : "Platform";

  return (
    <Badge className={`${colorClass} ${sizeClass} font-medium ${className}`}>
      {label}
    </Badge>
  );
}
