"use client";

export default function ShipmentTimeline({ timeline }) {
  return (
    <div className="space-y-0">
      {timeline.map((step, index) => (
        <div key={index} className="flex gap-4">
          {/* Vertical line + dot */}
          <div className="flex flex-col items-center">
            <div
              className={`w-3 h-3 rounded-full border-2 mt-1 ${
                step.done
                  ? "bg-cyan-400 border-cyan-400 shadow-[0_0_6px_rgba(0,212,255,0.4)]"
                  : "bg-[#0F172A] border-[#1A2740]"
              }`}
            />
            {index < timeline.length - 1 && (
              <div
                className={`w-0.5 flex-1 min-h-[2rem] ${
                  step.done
                    ? "bg-cyan-400/40"
                    : "bg-[#1A2740]"
                }`}
              />
            )}
          </div>

          {/* Content */}
          <div className="pb-6">
            <p
              className={`text-sm font-medium ${
                step.done ? "text-white" : "text-gray-600"
              }`}
            >
              {step.step}
            </p>
            <p className="text-xs font-mono text-gray-500 mt-0.5">
              {step.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
