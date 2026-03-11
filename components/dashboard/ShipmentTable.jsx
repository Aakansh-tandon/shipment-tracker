"use client";

import { useDispatch } from "react-redux";
import { setCurrentPage } from "@/store/slices/shipmentsSlice";
import useShipments from "@/hooks/useShipments";
import ShipmentRow from "./ShipmentRow";

export default function ShipmentTable({ selectedId, onSelectShipment }) {
  const { paginated, totalPages, currentPage, filtered } = useShipments();
  const dispatch = useDispatch();

  return (
    <div className="rounded-xl border border-[#1A2740] bg-[#0F172A] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#0B1120] text-left text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              <th className="px-4 py-3">Shipment ID</th>
              <th className="px-4 py-3">Origin</th>
              <th className="px-4 py-3">Destination</th>
              <th className="px-4 py-3">Carrier</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">ETA</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((shipment) => (
                <ShipmentRow
                  key={shipment.id}
                  shipment={shipment}
                  isSelected={selectedId === shipment.id}
                  onSelect={onSelectShipment}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-gray-600 font-mono text-xs"
                >
                  No shipments found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#1A2740]">
          <p className="text-[11px] font-mono text-gray-600">
            Showing {paginated.length} of {filtered.length} shipments
          </p>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => dispatch(setCurrentPage(page))}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                  page === currentPage
                    ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                    : "text-gray-600 hover:text-gray-400 hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
