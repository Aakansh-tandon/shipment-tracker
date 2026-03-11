"use client";

export default function StatsCard({ title, value, icon, color }) {
  const iconColor = {
    cyan: "text-cyan-400",
    amber: "text-amber-400",
    red: "text-red-400",
    green: "text-emerald-400",
  };

  const glowClass = {
    cyan: "radial-glow-cyan",
    amber: "radial-glow-amber",
    red: "radial-glow-red",
    green: "radial-glow-green",
  };

  return (
    <div className={`relative overflow-hidden rounded-xl border border-[#1A2740] bg-[#0F172A] p-5 ${glowClass[color] || ""}`}>
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-heading font-bold text-white mt-1">
            {value}
          </p>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/[0.06] ${iconColor[color] || iconColor.cyan}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
