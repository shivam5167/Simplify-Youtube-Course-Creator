import React, { Suspense } from "react";

import AppSidebar from "@/components/layout/sidebar/app-sidebar";
import BreadCrumbHeader, {
  BreadCrumbHeaderLoader,
} from "@/components/layout/sidebar/breadcrumb-header";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-[var(--header)] shrink-0 items-center gap-2 bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Suspense fallback={<BreadCrumbHeaderLoader />}>
            <BreadCrumbHeader />
          </Suspense>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
