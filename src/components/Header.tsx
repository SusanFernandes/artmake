"use client"

import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/65">
      <div className="flex h-16 items-center gap-4 px-6">
        <div
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-3 cursor-pointer"
          aria-label="Go to dashboard"
        >
          <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
            <span className="text-primary-foreground font-bold text-lg">CS</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-semibold text-sm">Campaign Symphony</span>
            <span className="text-xs text-muted-foreground hidden md:inline">Adops & creative workflows</span>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-4 max-w-3xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns, creatives, experts..."
              className="pl-10 bg-input text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">3</Badge>
          </Button>

          <Button variant="default" size="sm" onClick={() => router.push('/billing')} className="shadow-accent-glow">
            Upgrade
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/onboarding/brand-profile")}>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/team")}>Team Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/billing")}>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/")}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

