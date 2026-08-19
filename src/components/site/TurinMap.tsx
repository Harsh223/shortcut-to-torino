type Props = {
  variant?: "night" | "day";
  className?: string;
  showRoutes?: boolean;
  layers?: Record<string, boolean>;
};

const GRID_V = Array.from({ length: 22 }, (_, i) => 40 + i * 58);
const GRID_H = Array.from({ length: 19 }, (_, i) => 30 + i * 56);

export function TurinMap({ variant = "night", className = "", showRoutes = true, layers }: Props) {
  const night = variant === "night";
  const streetColor = night ? "#173B52" : "#DCE3EC";
  const majorColor = night ? "#22536F" : "#C6D2E0";
  const blockColor = night ? "#0C2436" : "#FFFFFF";
  const waterColor = night ? "#0B3A48" : "#CFE6EA";
  const on = (k: string) => !layers || layers[k];

  return (
    <svg
      viewBox="0 0 1200 1010"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="sc-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={night ? "#0E2A3D" : "#F7F9FC"} />
          <stop offset="100%" stopColor={night ? "#081C28" : "#EDF1F6"} />
        </linearGradient>
        <linearGradient id="sc-hills" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={night ? "#12384C" : "#E1EAF0"} stopOpacity="0.9" />
          <stop offset="100%" stopColor={night ? "#0E2A3D" : "#F2F4F7"} stopOpacity="0" />
        </linearGradient>
        <filter id="sc-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="1200" height="1010" fill="url(#sc-sky)" />

      {/* distant hills wash (east of the river) */}
      <path
        d="M700 210 C790 150 860 190 940 150 C1010 116 1090 150 1200 120 L1200 0 L700 0 Z"
        fill="url(#sc-hills)"
      />

      {/* city blocks */}
      <g opacity={night ? 0.5 : 0.9}>
        {GRID_H.slice(0, -1).map((y, r) =>
          GRID_V.slice(0, -1).map((x, ccol) =>
            (r * 7 + ccol * 3) % 5 === 0 ? null : (
              <rect
                key={`${x}-${y}`}
                x={x + 4}
                y={y + 4}
                width={50}
                height={48}
                rx={3}
                fill={blockColor}
                opacity={night ? 0.55 : 1}
              />
            ),
          ),
        )}
      </g>

      {/* the grid */}
      <g stroke={streetColor} strokeWidth="3">
        {GRID_V.map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="1010" />
        ))}
        {GRID_H.map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="1200" y2={y} />
        ))}
      </g>

      {/* major avenues */}
      <g stroke={majorColor} strokeWidth="9" strokeLinecap="round">
        <line x1="0" y1="366" x2="1200" y2="366" />
        <line x1="330" y1="0" x2="330" y2="1010" />
        <line x1="620" y1="0" x2="1120" y2="1010" />
        <line x1="0" y1="702" x2="1200" y2="702" />
      </g>

      {/* the Po */}
      <path
        d="M980 -20 C930 140 1010 260 940 400 C880 520 960 700 900 1030"
        stroke={waterColor}
        strokeWidth="46"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M980 -20 C930 140 1010 260 940 400 C880 520 960 700 900 1030"
        stroke={night ? "#0DB4B9" : "#0DB4B9"}
        strokeOpacity="0.18"
        strokeWidth="46"
        fill="none"
      />

      {/* park wedge */}
      <path d="M960 330 L1090 300 L1120 470 L980 470 Z" fill={night ? "#10404A" : "#E6F1EA"} />

      {on("traffic") && showRoutes && (
        <g strokeLinecap="round" fill="none" opacity="0.9">
          <path d="M0 366 L330 366" stroke="#1FA35A" strokeWidth="7" />
          <path d="M330 366 L620 366" stroke="#FF7A3D" strokeWidth="7" />
          <path d="M330 0 L330 240" stroke="#FF7A3D" strokeWidth="7" opacity="0.7" />
        </g>
      )}

      {showRoutes && (
        <>
          {/* drive route */}
          <path
            d="M214 590 L214 366 L620 366 L620 200 L852 200"
            stroke="#2F7BFF"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#sc-glow)"
          />
          <path
            d="M214 590 L214 366 L620 366 L620 200 L852 200"
            stroke="#FFFFFF"
            strokeOpacity="0.55"
            strokeWidth="4"
            strokeDasharray="18 46"
            fill="none"
            strokeLinecap="round"
            className="animate-dash"
          />
          {/* walk / transit path */}
          <path
            d="M852 200 L852 310 L1004 310"
            stroke="#0DB4B9"
            strokeWidth="9"
            strokeDasharray="2 16"
            strokeLinecap="round"
            fill="none"
          />
          {/* destination */}
          <g transform="translate(1004 310)">
            <circle r="16" fill="#FF7A3D" opacity="0.22" />
            <circle r="8" fill="#FF7A3D" />
          </g>
        </>
      )}

      {on("transit") && (
        <g>
          {[
            [400, 200],
            [736, 478],
            [214, 478],
          ].map(([x, y]) => (
            <g key={`t${x}${y}`} transform={`translate(${x} ${y})`}>
              <circle r="9" fill={night ? "#0E2A3D" : "#FFFFFF"} stroke="#0DB4B9" strokeWidth="4" />
            </g>
          ))}
        </g>
      )}

      {on("parking") && (
        <g>
          {[
            [504, 254],
            [852, 534],
            [272, 310],
          ].map(([x, y]) => (
            <g key={`p${x}${y}`} transform={`translate(${x} ${y})`}>
              <rect x="-13" y="-13" width="26" height="26" rx="9" fill="#2F7BFF" />
              <text
                x="0"
                y="6"
                textAnchor="middle"
                fontSize="16"
                fontWeight="800"
                fill="#FFFFFF"
                fontFamily="inherit"
              >
                P
              </text>
            </g>
          ))}
        </g>
      )}

      {on("charging") && (
        <g fill="#1FA35A">
          {[
            [620, 590],
            [968, 142],
          ].map(([x, y]) => (
            <g key={`c${x}${y}`} transform={`translate(${x} ${y})`}>
              <circle r="13" fill="#1FA35A" />
              <path d="M2 -7 L-4 1 L0 1 L-2 7 L4 -1 L0 -1 Z" fill="#FFFFFF" />
            </g>
          ))}
        </g>
      )}

      {on("micromobility") && (
        <g fill="#FF7A3D">
          {[
            [446, 422],
            [678, 254],
            [330, 646],
          ].map(([x, y]) => (
            <g key={`m${x}${y}`} transform={`translate(${x} ${y})`}>
              <circle r="10" fill="#FF7A3D" opacity="0.9" />
              <circle r="3.5" fill="#FFFFFF" />
            </g>
          ))}
        </g>
      )}

      {on("signals") && (
        <g>
          {[
            [620, 366],
            [330, 366],
          ].map(([x, y]) => (
            <g key={`s${x}${y}`} transform={`translate(${x} ${y})`}>
              <rect x="-7" y="-16" width="14" height="32" rx="7" fill={night ? "#0B2130" : "#1A2332"} />
              <circle cy="-8" r="3.4" fill="#FF7A3D" />
              <circle cy="8" r="3.4" fill="#1FA35A" />
            </g>
          ))}
        </g>
      )}

      {/* location puck */}
      <g transform="translate(214 590)">
        <circle r="30" fill="#0DB4B9" className="animate-puck" />
        <circle r="15" fill="#0DB4B9" fillOpacity="0.25" />
        <circle r="9" fill="#0DB4B9" stroke="#FFFFFF" strokeWidth="3.5" />
      </g>
    </svg>
  );
}
