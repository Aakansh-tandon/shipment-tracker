"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function DeliveryChart() {
  const shipments = useSelector((state) => state.shipments.shipments);

  const data = useMemo(() => {
    const delivered = shipments.filter((s) => s.status === "Delivered");
    const weeks = {};

    delivered.forEach((s) => {
      const date = new Date(s.eta);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const key = weekStart.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      weeks[key] = (weeks[key] || 0) + 1;
    });

    return Object.entries(weeks)
      .map(([week, count]) => ({ week, deliveries: count }))
      .slice(-4);
  }, [shipments]);

  return (
    <div className="bg-[#0F172A] rounded-xl border border-[#1A2740] p-5">
      <h3 className="text-sm font-heading font-semibold text-white mb-4">
        Weekly Deliveries
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A2740" opacity={0.5} />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'DM Mono' }}
              stroke="#1A2740"
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'DM Mono' }}
              stroke="#1A2740"
              allowDecimals={false}
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
            />
            <Bar
              dataKey="deliveries"
              fill="#00D4FF"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
