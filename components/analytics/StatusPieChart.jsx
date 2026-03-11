"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const COLORS = {
  "In Transit": "#00D4FF",
  Delayed: "#f87171",
  Delivered: "#34d399",
  Pending: "#fbbf24",
};

export default function StatusPieChart() {
  const shipments = useSelector((state) => state.shipments.shipments);

  const data = useMemo(() => {
    const counts = {};
    shipments.forEach((s) => {
      counts[s.status] = (counts[s.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [shipments]);

  return (
    <div className="bg-[#0F172A] rounded-xl border border-[#1A2740] p-5">
      <h3 className="text-sm font-heading font-semibold text-white mb-4">
        Status Distribution
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              stroke="#0F172A"
              strokeWidth={2}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[entry.name] || "#64748b"}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0B1120",
                border: "1px solid #1A2740",
                borderRadius: "8px",
                color: "#C8D6E5",
                fontFamily: "DM Mono",
                fontSize: "12px",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "11px", fontFamily: "DM Mono", color: "#64748b" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
