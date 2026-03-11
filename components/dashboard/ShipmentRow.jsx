"use client";

import StatusBadge from "./StatusBadge";
import { formatDate } from "@/utils/formatDate";

export default function ShipmentRow({ shipment, isSelected, onSelect }) {
  return (
    <tr
      onClick={() => onSelect?.(shipment)}
      className={`shipment-row border-b border-[#1A2740]/60 cursor-pointer ${
        isSelected ? "selected" : ""
      }`}
    >
      <td className="px-4 py-3">
        <span className="text-cyan-400 font-mono text-xs font-medium">
          {shipment.id}
        </span>
      </td>
      <td className="px-4 py-3 text-xs font-mono text-gray-400">
        {shipment.origin}
      </td>
      <td className="px-4 py-3 text-xs font-mono text-gray-400">
        {shipment.destination}
      </td>
      <td className="px-4 py-3 text-xs font-mono text-gray-400">
        {shipment.carrier}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={shipment.status} />
      </td>
      <td className="px-4 py-3 text-xs font-mono text-gray-500">
        {formatDate(shipment.eta)}
      </td>
    </tr>
  );
}
