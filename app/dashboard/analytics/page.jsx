"use client";

import dynamic from "next/dynamic";

const DeliveryChart = dynamic(
  () => import("@/components/analytics/DeliveryChart"),
  { ssr: false }
);
const StatusPieChart = dynamic(
  () => import("@/components/analytics/StatusPieChart"),
  { ssr: false }
);
const CarrierPerformance = dynamic(
  () => import("@/components/analytics/CarrierPerformance"),
  { ssr: false }
);

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold text-white">
          Analytics
        </h2>
        <p className="text-xs font-mono text-gray-600 mt-1">
          Shipment performance insights & metrics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DeliveryChart />
        <StatusPieChart />
      </div>

      <CarrierPerformance />
    </div>
  );
}
