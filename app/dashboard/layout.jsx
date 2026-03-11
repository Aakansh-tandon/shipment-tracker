"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#080C14]">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <Navbar />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
