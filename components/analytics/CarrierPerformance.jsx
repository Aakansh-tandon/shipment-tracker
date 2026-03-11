"use client";

import { useSelector } from "react-redux";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CarrierPerformance() {
  const shipments = useSelector((state) => state.shipments.shipments);

  const data = useMemo(() => {
    const carriers = {};
    shipments.forEach((s) => {
      if (!carriers[s.carrier]) {
        carriers[s.carrier] = { total: 0, onTime: 0 };
      }
      carriers[s.carrier].total += 1;
      if (s.status === "Delivered") {
        carriers[s.carrier].onTime += 1;
      }
    });

    return Object.entries(carriers).map(([carrier, { total, onTime }]) => ({
      carrier,
      total,
      onTime,
      onTimeRate: Math.round((onTime / total) * 100),
    }));
  }, [shipments]);

  return (
    <div className="bg-[#0F172A] rounded-xl border border-[#1A2740] p-5">
      <h3 className="text-sm font-heading font-semibold text-white mb-4">
        Carrier Performance
      </h3>

      {/* Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A2740" opacity={0.5} />
            <XAxis
              dataKey="carrier"
              tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'DM Mono' }}
              stroke="#1A2740"
              angle={-20}
              textAnchor="end"
              height={50}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'DM Mono' }}
              stroke="#1A2740"
              domain={[0, 100]}
              unit="%"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0B1120",
                border: "1px solid #1A2740",
                borderRadius: "8px",
                color: "#C8D6E5",
                fontFamily: "DM Mono",
                fontSize: "12px",
              }}
              formatter={(value) => [`${value}%`, "On-Time Rate"]}
            />
            <Bar
              dataKey="onTimeRate"
              fill="#34d399"
              radius={[4, 4, 0, 0]}
              name="On-Time %"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="pb-2">Carrier</th>
              <th className="pb-2">Total</th>
              <th className="pb-2">Delivered</th>
              <th className="pb-2">On-Time %</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.carrier}
                className="border-t border-[#1A2740]"
              >
                <td className="py-2 text-gray-300 font-medium">
                  {row.carrier}
                </td>
                <td className="py-2 text-gray-500">{row.total}</td>
                <td className="py-2 text-gray-500">{row.onTime}</td>
                <td className="py-2">
                  <span
                    className={`font-medium ${
                      row.onTimeRate >= 50
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {row.onTimeRate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
