"use client";

import { getStatusColor, getStatusDot } from "@/utils/statusHelpers";

export default function StatusBadge({ status }) {
  const isTransit = status === "In Transit";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider ${getStatusColor(status)}`}
    >
      {/* Animated pulse dot for In Transit */}
      {isTransit ? (
        <span className="relative flex h-1.5 w-1.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getStatusDot(status)}`}></span>
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${getStatusDot(status)}`}></span>
        </span>
      ) : (
        <span className={`inline-flex rounded-full h-1.5 w-1.5 ${getStatusDot(status)}`}></span>
      )}
      {status}
    </span>
  );
}
