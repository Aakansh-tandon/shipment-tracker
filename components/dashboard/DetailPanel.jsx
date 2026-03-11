"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { formatDate, daysRemaining } from "@/utils/formatDate";

export default function DetailPanel({ shipment, onClose }) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 280);
  };

  useEffect(() => {
    setClosing(false);
  }, [shipment?.id]);

  if (!shipment) return null;

  const days = daysRemaining(shipment.eta);
  const completedSteps = shipment.timeline.filter((s) => s.done).length;
  const totalSteps = shipment.timeline.length;
  const progressPct = Math.round((completedSteps / totalSteps) * 100);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-[#0B1120] border-l border-[#1A2740] overflow-y-auto ${
          closing ? "detail-panel-closing" : "detail-panel"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1A2740] sticky top-0 bg-[#0B1120]/95 backdrop-blur-xl z-10">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-mono text-sm font-medium">
              {shipment.id}
            </span>
            <StatusBadge status={shipment.status} />
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-gray-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                Shipment Progress
              </span>
              <span className="text-xs font-mono text-cyan-400">{progressPct}%</span>
            </div>
            <div className="h-1.5 bg-[#1A2740] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* ETA Countdown */}
          {shipment.status !== "Delivered" && (
            <div className="p-3 rounded-lg bg-cyan-400/5 border border-cyan-400/10">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-mono text-cyan-400">
                  {days > 0
                    ? `${days} day${days !== 1 ? "s" : ""} remaining`
                    : days === 0
                    ? "Arriving today"
                    : `${Math.abs(days)} day${Math.abs(days) !== 1 ? "s" : ""} overdue`}
                </span>
              </div>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4">
            <MetaItem label="Origin" value={shipment.origin} />
            <MetaItem label="Destination" value={shipment.destination} />
            <MetaItem label="Carrier" value={shipment.carrier} />
            <MetaItem label="Container" value={shipment.container} />
            <MetaItem label="Weight" value={shipment.weight} />
            <MetaItem label="Dispatch" value={formatDate(shipment.dispatchDate)} />
            <MetaItem label="ETA" value={formatDate(shipment.eta)} />
          </div>

          {/* Timeline */}
          <div>
            <h4 className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-4">
              Tracking Timeline
            </h4>
            <div className="space-y-0">
              {shipment.timeline.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-2.5 h-2.5 rounded-full mt-1 ${
                        step.done
                          ? "bg-cyan-400 shadow-[0_0_6px_rgba(0,212,255,0.4)]"
                          : "bg-[#1A2740] border border-[#243352]"
                      }`}
                    />
                    {i < shipment.timeline.length - 1 && (
                      <div
                        className={`w-px flex-1 min-h-[1.5rem] ${
                          step.done ? "bg-cyan-400/30" : "bg-[#1A2740]"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pb-4">
                    <p
                      className={`text-xs font-mono ${
                        step.done ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {step.step}
                    </p>
                    <p className="text-[10px] font-mono text-gray-600 mt-0.5">
                      {step.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Details Link */}
          <Link
            href={`/dashboard/shipments/${shipment.id}`}
            className="block w-full text-center py-2.5 rounded-lg border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-mono uppercase tracking-wider hover:bg-cyan-400/10 transition-colors"
          >
            View Full Details →
          </Link>
        </div>
      </div>
    </>
  );
}

function MetaItem({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-xs font-mono text-gray-300 mt-0.5">{value}</p>
    </div>
  );
}
