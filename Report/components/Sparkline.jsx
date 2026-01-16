import React from "react";

export default function Sparkline({ data, color = "#111827" }) {
  const width = 640;
  const height = 320;
  const padding = 50;
  const max = Math.max(...data);
  const min = Math.min(...data);

  const points = data
    .map((v, i) => {
      const x = padding + (i * (width - padding * 2)) / (data.length - 1);
      const y =
        height -
        padding -
        ((v - min) * (height - padding * 2)) / (max - min || 1);
      return `${x},${y}`;
    })
    .join(" ");

  const xTicks = data.map((_, i) => ({
    x: padding + (i * (width - padding * 2)) / (data.length - 1),
    label: i + 1,
  }));
  const yTicks = [min, (min + max) / 2, max].map((val) => ({
    y:
      height -
      padding -
      ((val - min) * (height - padding * 2)) / (max - min || 1),
    label: val,
  }));

  return (
    <svg width={width} height={height}>
      {/* Axes */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#9ca3af" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#9ca3af" />

      {/* X axis ticks */}
      {xTicks.map((tick, i) => (
        <g key={i}>
          <line x1={tick.x} y1={height - padding} x2={tick.x} y2={height - padding + 5} stroke="#9ca3af" />
          <text x={tick.x} y={height - padding + 20} textAnchor="middle" fontSize="12" fill="#6b7280">
            {tick.label}
          </text>
        </g>
      ))}

      {/* Y axis ticks */}
      {yTicks.map((tick, i) => (
        <g key={i}>
          <line x1={padding - 5} y1={tick.y} x2={padding} y2={tick.y} stroke="#9ca3af" />
          <text x={padding - 10} y={tick.y + 4} textAnchor="end" fontSize="12" fill="#6b7280">
            {tick.label}
          </text>
        </g>
      ))}

      {/* Axis labels */}
      <text
        x={width / 2}
        y={height - 5}
        textAnchor="middle"
        fontSize="14"
        fill="#111827"
      >
        X-axis: Time (data points)
      </text>
      <text
        x={18}
        y={height / 2.1}
        textAnchor="middle"
        fontSize="14"
        fill="#111827"
        transform={`rotate(-90, 20, ${height / 2})`}
      >
        Y-axis: Metric value (%)
      </text>

      {/* Data line */}
      <polyline fill="none" stroke={color} strokeWidth="3" points={points} />

      {/* Border */}
      <rect x="0" y="0" width={width} height={height} fill="none" stroke="#e5e7eb" rx="8" />
    </svg>
  );
}
