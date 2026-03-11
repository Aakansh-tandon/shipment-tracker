"use client";

import StatusBadge from "@/components/dashboard/StatusBadge";
import { formatDate, daysRemaining } from "@/utils/formatDate";

export default function ShipmentDetails({ shipment }) {
  const days = daysRemaining(shipment.eta);

  return (
    <div className="bg-[#0F172A] rounded-xl border border-[#1A2740] p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-heading font-semibold text-white">
          Shipment Details
        </h3>
        <StatusBadge status={shipment.status} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DetailItem label="Shipment ID" value={shipment.id} highlight />
        <DetailItem label="Carrier" value={shipment.carrier} />
        <DetailItem label="Origin" value={shipment.origin} />
        <DetailItem label="Destination" value={shipment.destination} />
        <DetailItem label="Dispatch Date" value={formatDate(shipment.dispatchDate)} />
        <DetailItem label="ETA" value={formatDate(shipment.eta)} />
        <DetailItem label="Weight" value={shipment.weight} />
        <DetailItem label="Container" value={shipment.container} />
      </div>

      {/* ETA Countdown */}
      {shipment.status !== "Delivered" && (
        <div className="mt-4 p-3 rounded-lg bg-cyan-400/5 border border-cyan-400/20">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-mono font-medium text-cyan-300">
              {days > 0
                ? `${days} day${days !== 1 ? "s" : ""} remaining`
                : days === 0
                ? "Arriving today"
                : `${Math.abs(days)} day${Math.abs(days) !== 1 ? "s" : ""} overdue`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value, highlight }) {
  return (
    <div>
      <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">{label}</p>
      <p className={`text-sm font-medium mt-0.5 ${
        highlight ? "text-cyan-400 font-mono" : "text-gray-300"
      }`}>
        {value}
      </p>
    </div>
  );
}
