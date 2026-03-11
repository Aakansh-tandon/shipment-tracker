"use client";

import { useState } from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import ShipmentTable from "@/components/dashboard/ShipmentTable";
import FilterBar from "@/components/dashboard/FilterBar";
import SearchBar from "@/components/dashboard/SearchBar";
import DetailPanel from "@/components/dashboard/DetailPanel";
import useShipments from "@/hooks/useShipments";

export default function DashboardPage() {
  const { stats } = useShipments();
  const [selectedShipment, setSelectedShipment] = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold text-white">
          Dashboard
        </h2>
        <p className="text-xs font-mono text-gray-600 mt-1">
          Real-time shipment monitoring & control
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Shipments"
          value={stats.total}
          color="cyan"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
        />
        <StatsCard
          title="In Transit"
          value={stats.inTransit}
          color="amber"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <StatsCard
          title="Delayed"
          value={stats.delayed}
          color="red"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Delivered"
          value={stats.delivered}
          color="green"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <FilterBar />
        <div className="w-full sm:w-72">
          <SearchBar />
        </div>
      </div>

      {/* Shipment Table */}
      <ShipmentTable
        selectedId={selectedShipment?.id}
        onSelectShipment={setSelectedShipment}
      />

      {/* Slide-in Detail Panel */}
      {selectedShipment && (
        <DetailPanel
          shipment={selectedShipment}
          onClose={() => setSelectedShipment(null)}
        />
      )}
    </div>
  );
}
