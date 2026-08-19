type Props = {
  variant?: "night" | "day";
  className?: string;
  showRoutes?: boolean;
  layers?: Record<string, boolean>;
};

const W = 1200;
const H = 1010;
const STEP = 38;
const vx = (i: number) => 40 + i * STEP;
const hy = (j: number) => 30 + j * STEP;
const GRID_V = Array.from({ length: 31 }, (_, i) => vx(i));
const GRID_H = Array.from({ length: 26 }, (_, j) => hy(j));

// route anchors on the grid
const AX = vx(4); // 192
const BX = vx(14); // 572
const CX = vx(21); // 838
const TOPY = hy(5); // 220
const MIDY = hy(11); // 448
const BOTY = hy(19); // 752
const DESTX = vx(25); // 990
const DESTY = hy(14); // 562

export function TurinMap({ variant = "night", className = "", showRoutes = true, layers }: Props) {
  const night = variant === "night";
  const streetColor = night ? "#173B52" : "#DCE3EC";
  const majorColor = night ? "#22536F" : "#C6D2E0";
  const blockColor = night ? "#0C2436" : "#FFFFFF";
  const waterColor = night ? "#0B3A48" : "#CFE6EA";
  const on = (k: string) => !layers || layers[k];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
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
          <feGaussianBlur stdDeviation="9" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width={W} height={H} fill="url(#sc-sky)" />

      {/* distant hills wash, east of the river */}
      <path
        d="M660 260 C760 180 850 230 930 180 C1010 130 1100 175 1200 140 L1200 0 L660 0 Z"
        fill="url(#sc-hills)"
      />

      {/* city blocks */}
      <g opacity={night ? 0.55 : 1}>
        {GRID_H.slice(0, -1).map((y, r) =>
          GRID_V.slice(0, -1).map((x, col) =>
            (r * 7 + col * 3) % 6 === 0 ? null : (
              <rect
                key={`${x}-${y}`}
                x={x + 3}
                y={y + 3}
                width={STEP - 6}
                height={STEP - 6}
                rx={2.5}
                fill={blockColor}
                opacity={night ? 0.5 : 1}
              />
            ),
          ),
        )}
      </g>

      {/* the grid */}
      <g stroke={streetColor} strokeWidth="2.5">
        {GRID_V.map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2={H} />
        ))}
        {GRID_H.map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2={W} y2={y} />
        ))}
      </g>

      {/* major avenues */}
      <g stroke={majorColor} strokeWidth="7" strokeLinecap="round">
        <line x1="0" y1={MIDY} x2={W} y2={MIDY} />
        <line x1="0" y1={BOTY} x2={W} y2={BOTY} />
        <line x1={AX} y1="0" x2={AX} y2={H} />
        <line x1={BX} y1="0" x2={BX} y2={H} />
        <line x1="430" y1="0" x2="1010" y2={H} />
      </g>

      {/* the Po */}
      <path
        d="M980 -20 C930 180 1030 340 950 520 C880 680 970 830 930 1040"
        stroke={waterColor}
        strokeWidth="40"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M980 -20 C930 180 1030 340 950 520 C880 680 970 830 930 1040"
        stroke="#0DB4B9"
        strokeOpacity="0.16"
        strokeWidth="40"
        fill="none"
      />

      {/* park wedge on the far bank */}
      <path d="M1000 420 L1130 392 L1160 620 L1020 620 Z" fill={night ? "#10404A" : "#E6F1EA"} />

      {on("traffic") && showRoutes && (
        <g strokeLinecap="round" fill="none" opacity="0.95">
          <path d={`M0 ${MIDY} L${AX} ${MIDY}`} stroke="#1FA35A" strokeWidth="6" />
          <path d={`M${AX} ${MIDY} L${BX} ${MIDY}`} stroke="#FF7A3D" strokeWidth="6" />
          <path d={`M${BX} 0 L${BX} ${TOPY}`} stroke="#FF7A3D" strokeWidth="6" opacity="0.65" />
          <path d={`M0 ${BOTY} L${vx(9)} ${BOTY}`} stroke="#1FA35A" strokeWidth="6" opacity="0.7" />
        </g>
      )}

      {showRoutes && (
        <>
          <path
            d={`M${AX} ${BOTY} L${AX} ${MIDY} L${BX} ${MIDY} L${BX} ${TOPY} L${CX} ${TOPY}`}
            stroke="#2F7BFF"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#sc-glow)"
          />
          <path
            d={`M${AX} ${BOTY} L${AX} ${MIDY} L${BX} ${MIDY} L${BX} ${TOPY} L${CX} ${TOPY}`}
            stroke="#FFFFFF"
            strokeOpacity="0.5"
            strokeWidth="3.5"
            strokeDasharray="16 44"
            fill="none"
            strokeLinecap="round"
            className="animate-dash"
          />
          <path
            d={`M${CX} ${TOPY} L${CX} ${DESTY} L${DESTX} ${DESTY}`}
            stroke="#0DB4B9"
            strokeWidth="8"
            strokeDasharray="2 14"
            strokeLinecap="round"
            fill="none"
          />
          <g transform={`translate(${DESTX} ${DESTY})`}>
            <circle r="15" fill="#FF7A3D" opacity="0.22" />
            <circle r="7" fill="#FF7A3D" />
          </g>
        </>
      )}

      {on("transit") && (
        <g>
          {[
            [vx(9), TOPY],
            [vx(18), BOTY],
            [AX, hy(15)],
            [vx(24), hy(3)],
          ].map(([x, y]) => (
            <g key={`t${x}-${y}`} transform={`translate(${x} ${y})`}>
              <circle r="8" fill={night ? "#0E2A3D" : "#FFFFFF"} stroke="#0DB4B9" strokeWidth="3.5" />
            </g>
          ))}
        </g>
      )}

      {on("parking") && (
        <g>
          {[
            [vx(11), hy(7)],
            [vx(20), hy(22)],
            [vx(6), hy(13)],
            [vx(26), hy(19)],
          ].map(([x, y]) => (
            <g key={`p${x}-${y}`} transform={`translate(${x} ${y})`}>
              <rect x="-12" y="-12" width="24" height="24" rx="8" fill="#2F7BFF" />
              <text
                x="0"
                y="6"
                textAnchor="middle"
                fontSize="15"
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
        <g>
          {[
            [vx(15), hy(23)],
            [vx(23), hy(6)],
            [vx(2), hy(4)],
          ].map(([x, y]) => (
            <g key={`c${x}-${y}`} transform={`translate(${x} ${y})`}>
              <circle r="11" fill="#1FA35A" />
              <path d="M2 -6 L-3.5 1 L0 1 L-1.5 6 L3.5 -1 L0 -1 Z" fill="#FFFFFF" />
            </g>
          ))}
        </g>
      )}

      {on("micromobility") && (
        <g>
          {[
            [vx(8), hy(17)],
            [vx(17), hy(9)],
            [vx(12), hy(24)],
            [vx(28), hy(12)],
          ].map(([x, y]) => (
            <g key={`m${x}-${y}`} transform={`translate(${x} ${y})`}>
              <circle r="9" fill="#FF7A3D" />
              <circle r="3" fill="#FFFFFF" />
            </g>
          ))}
        </g>
      )}

      {on("signals") && (
        <g>
          {[
            [BX, MIDY],
            [AX, MIDY],
            [BX, TOPY],
          ].map(([x, y]) => (
            <g key={`s${x}-${y}`} transform={`translate(${x} ${y})`}>
              <rect x="-6" y="-14" width="12" height="28" rx="6" fill={night ? "#0B2130" : "#1A2332"} />
              <circle cy="-7" r="3" fill="#FF7A3D" />
              <circle cy="7" r="3" fill="#1FA35A" />
            </g>
          ))}
        </g>
      )}

      {/* location puck */}
      <g transform={`translate(${AX} ${BOTY})`}>
        <circle r="26" fill="#0DB4B9" className="animate-puck" />
        <circle r="14" fill="#0DB4B9" fillOpacity="0.25" />
        <circle r="8" fill="#0DB4B9" stroke="#FFFFFF" strokeWidth="3" />
      </g>
    </svg>
  );
}
