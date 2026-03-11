"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  setStatusFilter,
  setCarrierFilter,
} from "@/store/slices/shipmentsSlice";
import { STATUS_LIST, CARRIERS } from "@/utils/constants";

export default function FilterBar() {
  const dispatch = useDispatch();
  const { status, carrier } = useSelector(
    (state) => state.shipments.filters
  );

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={status}
        onChange={(e) => dispatch(setStatusFilter(e.target.value))}
        className="px-3 py-2 text-xs font-mono rounded-lg border border-[#1A2740] bg-[#0F172A] text-gray-300 focus:ring-1 focus:ring-cyan-400/50 focus:border-cyan-400/50 outline-none appearance-none cursor-pointer hover:border-[#243352] transition-colors"
      >
        {STATUS_LIST.map((s) => (
          <option key={s} value={s}>
            {s === "All" ? "All Statuses" : s}
          </option>
        ))}
      </select>

      <select
        value={carrier}
        onChange={(e) => dispatch(setCarrierFilter(e.target.value))}
        className="px-3 py-2 text-xs font-mono rounded-lg border border-[#1A2740] bg-[#0F172A] text-gray-300 focus:ring-1 focus:ring-cyan-400/50 focus:border-cyan-400/50 outline-none appearance-none cursor-pointer hover:border-[#243352] transition-colors"
      >
        {CARRIERS.map((c) => (
          <option key={c} value={c}>
            {c === "All" ? "All Carriers" : c}
          </option>
        ))}
      </select>
    </div>
  );
}
