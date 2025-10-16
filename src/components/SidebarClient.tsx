"use client";

import { useState } from "react";
import { SidebarInput } from "@/components/ui/sidebar";
import type { Session } from "next-auth";

export function SidebarClient({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const [filter, setFilter] = useState("");

  return (
    <>
      {children}
    </>
  );
}
