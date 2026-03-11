"use client";

export default function ShipmentMap({ origin, destination }) {
  return (
    <div className="bg-[#0F172A] rounded-xl border border-[#1A2740] p-5">
      <h3 className="text-sm font-heading font-semibold text-white mb-4">
        Route Map
      </h3>
      <div className="relative">
        <svg
          viewBox="0 0 800 400"
          className="w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0"
            y="0"
            width="800"
            height="400"
            rx="8"
            fill="#080C14"
          />

          {/* Continents */}
          <path
            d="M80 80 L180 60 L200 100 L220 140 L200 180 L160 200 L120 180 L80 140 Z"
            fill="#0F172A" stroke="#1A2740" strokeWidth="0.5"
          />
          <path
            d="M160 220 L200 200 L220 240 L210 300 L180 340 L150 320 L140 280 Z"
            fill="#0F172A" stroke="#1A2740" strokeWidth="0.5"
          />
          <path
            d="M340 60 L400 50 L420 80 L410 120 L380 130 L350 110 Z"
            fill="#0F172A" stroke="#1A2740" strokeWidth="0.5"
          />
          <path
            d="M360 150 L420 140 L440 200 L430 280 L400 320 L370 300 L350 240 L340 180 Z"
            fill="#0F172A" stroke="#1A2740" strokeWidth="0.5"
          />
          <path
            d="M440 50 L600 40 L660 80 L680 140 L660 180 L600 200 L520 180 L480 140 L440 100 Z"
            fill="#0F172A" stroke="#1A2740" strokeWidth="0.5"
          />
          <path
            d="M530 180 L560 170 L580 220 L560 270 L530 260 L520 220 Z"
            fill="#0F172A" stroke="#1A2740" strokeWidth="0.5"
          />
          <path
            d="M620 280 L700 270 L720 310 L700 350 L650 350 L620 320 Z"
            fill="#0F172A" stroke="#1A2740" strokeWidth="0.5"
          />

          {/* Route line */}
          <path
            d="M200 120 C 350 50, 500 50, 650 130"
            stroke="url(#routeGradient)"
            strokeWidth="2"
            strokeDasharray="8 4"
            fill="none"
          />

          {/* Origin dot */}
          <circle cx="200" cy="120" r="5" fill="#22c55e" />
          <circle cx="200" cy="120" r="10" fill="#22c55e" opacity="0.3">
            <animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Destination dot */}
          <circle cx="650" cy="130" r="5" fill="#00D4FF" />
          <circle cx="650" cy="130" r="10" fill="#00D4FF" opacity="0.3">
            <animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Ship icon on route */}
          <circle cx="420" cy="70" r="4" fill="#00D4FF">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path="M200 120 C 350 50, 500 50, 650 130"
            />
          </circle>

          <defs>
            <linearGradient
              id="routeGradient"
              x1="200" y1="120" x2="650" y2="130"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#22c55e" />
              <stop offset="1" stopColor="#00D4FF" />
            </linearGradient>
          </defs>
        </svg>

        {/* Labels */}
        <div className="flex justify-between mt-3 px-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-gray-400">{origin}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono text-gray-400">{destination}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
