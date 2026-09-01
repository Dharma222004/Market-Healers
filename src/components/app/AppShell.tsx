"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/app/Sidebar";
import { Topbar } from "@/components/app/Topbar";
import { MobileBottomNav } from "@/components/app/MobileBottomNav";
import { GlobalSearchModal } from "@/components/app/GlobalSearchModal";
import { ProtectedRoute } from "@/components/app/ProtectedRoute";

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex h-screen w-screen overflow-hidden bg-[#F6F8FA] text-[#172033]">
        {/* Collapsible Left Desktop Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Topbar */}
          <Topbar onOpenSearch={() => setSearchModalOpen(true)} />

          {/* Scrollable Page Body */}
          <main className="flex-1 overflow-y-auto pb-20 md:pb-8 scrollbar-none">
            {children}
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />

        {/* Keyboard Quick-Search Modal */}
        <GlobalSearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
        />
      </div>
    </ProtectedRoute>
  );
};
