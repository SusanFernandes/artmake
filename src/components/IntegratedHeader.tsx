"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Home,
  TrendingUp,
  Users,
  Upload,
  LayoutDashboard,
  Briefcase,
  Users2,
  PlusCircle,
  Bell,
  Search,
  HelpCircle,
  CreditCard,
  Settings,
  ChevronRight,
  Sparkles,
  Command,
  LogOut,
} from "lucide-react";
import { auth } from "~/server/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import UploadCreatedFileForm from './created-files/UploadCreatedFileForm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarClient } from "./SidebarClient";

// Integrated Header Component
export default function IntegratedHeader({ session }: { session: any }) {
  const [openUpload, setOpenUpload] = useState(false);
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="h-4 w-px bg-border" />

      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
          <span className="text-sm font-bold text-white">CS</span>
        </div>
        <span className="hidden font-semibold sm:inline-block">
          Campaign Symphony
        </span>
      </Link>

      {/* Search Bar */}
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-64 pl-8 h-9 bg-muted/50"
          />
        </div>

        <Button variant="ghost" size="icon" className="h-9 w-9">
          <HelpCircle className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-background" />
        </Button>

        {/* Upload created file */}
        <Button variant="ghost" size="icon" onClick={() => setOpenUpload(true)} title="Upload created file">
          <Upload className="h-5 w-5" />
        </Button>

        {/* User Menu */}
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <div className="h-7 w-7 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                  {session.user.name?.charAt(0) || "U"}
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                    {session.user.name?.charAt(0) || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {session.user.email}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Manage account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="h-4 w-4 mr-2" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href="/api/auth/signout">
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/api/auth/signin">
            <Button size="sm">Sign in</Button>
          </Link>
        )}
      </div>
      <Sheet open={openUpload} onOpenChange={setOpenUpload}>
        <SheetContent side="right" className="w-[480px]">
          <SheetHeader>
            <SheetTitle>Upload Created File</SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <UploadCreatedFileForm />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
