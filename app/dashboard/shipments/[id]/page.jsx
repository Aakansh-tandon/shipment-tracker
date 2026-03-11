"use client";

import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Link from "next/link";
import ShipmentDetails from "@/components/shipment/ShipmentDetails";
import ShipmentTimeline from "@/components/shipment/ShipmentTimeline";
import ShipmentMap from "@/components/shipment/ShipmentMap";

export default function ShipmentDetailPage() {
  const params = useParams();
  const shipment = useSelector((state) =>
    state.shipments.shipments.find((s) => s.id === params.id)
  );

  if (!shipment) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500 mb-4 font-mono">Shipment not found</p>
        <Link
          href="/dashboard"
          className="text-cyan-400 hover:text-cyan-300 text-sm font-mono"
        >
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm font-mono">
        <Link
          href="/dashboard"
          className="text-gray-500 hover:text-cyan-400 transition-colors"
        >
          Dashboard
        </Link>
        <span className="text-gray-600">/</span>
        <span className="text-cyan-400 font-medium">{shipment.id}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details + Timeline */}
        <div className="lg:col-span-1 space-y-6">
          <ShipmentDetails shipment={shipment} />
          <div className="bg-[#0F172A] rounded-xl border border-[#1A2740] p-5">
            <h3 className="text-sm font-heading font-semibold text-white mb-4">
              Tracking Timeline
            </h3>
            <ShipmentTimeline timeline={shipment.timeline} />
          </div>
        </div>

        {/* Right Column: Map */}
        <div className="lg:col-span-2">
          <ShipmentMap
            origin={shipment.origin}
            destination={shipment.destination}
          />
        </div>
      </div>
    </div>
  );
}
