import { auth } from "~/server/auth";
import IntegratedHeader from "./IntegratedHeader";
import { SidebarClient } from "./SidebarClient";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import AppSidebar from "./app-sidebar";

export default async function Shell({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;
  try {
    session = await auth();
  } catch (e) {
    // Log the auth error server-side and continue with a null session so
    // the root layout doesn't crash during SSR (common in dev when
    // AUTH_SECRET is missing or misconfigured).
    // This avoids React hydration errors caused by an exception during
    // render and lets pages render a signed-out state instead.
    // See: https://errors.authjs.dev#jwtsessionerror
    // eslint-disable-next-line no-console
    console.error("Auth error in Shell component:", e);
    session = null;
  }

  return (
    <SidebarProvider>
      <SidebarClient session={session}>
        <AppSidebar session={session} />
      </SidebarClient>
      <SidebarInset>
        <IntegratedHeader session={session} />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

