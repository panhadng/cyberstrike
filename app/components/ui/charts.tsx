import React, { useState } from "react";
import { cn } from "@/app/lib/utils";

// Bar Chart Component
export const BarChart = ({
  data,
  height = 100,
  barWidth = 24,
  spacing = 8,
  barColors = ["#3b82f6"], // Default blue color
  labels,
  className,
  currentMonth,
  showTooltip = true,
}: {
  data: number[][] | number[];
  height?: number;
  barWidth?: number;
  spacing?: number;
  barColors?: string[];
  labels?: string[];
  className?: string;
  currentMonth?: number;
  showTooltip?: boolean;
}) => {
  // Convert single array to array of arrays for consistency
  const dataArrays = Array.isArray(data[0])
    ? (data as number[][])
    : [data as number[]];

  // Find the maximum value to scale the bars
  const maxValue = Math.max(...dataArrays.flat(), 1) * 1.1; // Ensure minimum scale of 1 and add 10% padding

  // State for tracking hovered bar
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Fixed bottom padding for labels regardless of chart height
  const labelHeight = 30;

  return (
    <div className={cn("relative w-full", className)} style={{ height }}>
      {/* Y-axis gridlines - Positioned to cover only the chart area */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: labelHeight,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {[0, 1, 2, 3, 5, 6, 7, 8, 9].map((_, i) => {
          // Calculate grid line positions from bottom to top
          const position = i / 5;
          return (
            <div
              key={i}
              className="border-t border-white/10 w-full h-0"
              style={{
                position: "absolute",
                top: `${(1 - position) * 100}%`,
                left: 0,
                right: 0,
              }}
            />
          );
        })}
      </div>

      {/* Bars - adjusted to use 90% of available height to prevent bars from being too tall */}
      <div
        className="absolute inset-0 flex items-end"
        style={{ paddingBottom: labelHeight }}
      >
        <div className="w-full flex justify-between items-end px-2">
          {labels?.map((label, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              style={{ width: barWidth + spacing }}
              onMouseEnter={() => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <div className="flex flex-col items-center">
                {dataArrays.map((dataArray, dataIndex) => (
                  <div
                    key={dataIndex}
                    className={cn(
                      "rounded-t-sm transition-all duration-200 w-full",
                      hoveredBar === index && "brightness-125"
                    )}
                    style={{
                      width: barWidth,
                      backgroundColor: barColors[dataIndex % barColors.length],
                      height: `${
                        (dataArray[index] / maxValue) *
                        (height - labelHeight) *
                        0.9
                      }px`,
                      marginBottom: dataIndex < dataArrays.length - 1 ? 0 : 0,
                      boxShadow:
                        currentMonth === index
                          ? "0 0 8px rgba(59, 130, 246, 0.6)"
                          : "none",
                      borderWidth: currentMonth === index ? "1px" : "0",
                      borderColor: "rgba(59, 130, 246, 0.6)",
                      borderStyle: "solid",
                    }}
                  ></div>
                ))}
              </div>

              {/* Tooltip */}
              {showTooltip && hoveredBar === index && (
                <div className="absolute bottom-full mb-2 bg-gray-900/90 text-white text-xs py-1 px-2 rounded-md shadow-lg z-10">
                  {dataArrays.map((dataArray, dataIndex) => (
                    <div
                      key={dataIndex}
                      className="flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            barColors[dataIndex % barColors.length],
                        }}
                      />
                      <span>{dataArray[index]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* X-axis labels - Now positioned absolutely at the bottom with minimal height */}
      <div
        className="absolute bottom-0 left-0 right-0 flex justify-between px-2"
        style={{ height: labelHeight }}
      >
        {labels?.map((label, index) => (
          <div
            key={index}
            className="flex items-center justify-center"
            style={{ width: barWidth + spacing }}
          >
            <span
              className={cn(
                "text-gray-400 text-xs transition-all",
                currentMonth === index && "text-blue-400 font-bold"
              )}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Pie Chart Component
export const PieChart = ({
  data,
  colors = ["#eab308", "#f97316", "#3b82f6"],
  size = 240,
  className,
  centerLabel,
  renderLegend,
  legendPosition = "bottom",
}: {
  data: { name: string; value: number }[];
  colors?: string[];
  size?: number;
  className?: string;
  centerLabel?: React.ReactNode;
  renderLegend?: boolean;
  legendPosition?: "bottom" | "right";
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  // Calculate cumulative percentages for slice positioning
  let cumulativePercentage = 0;
  const slices = data.map((item, index) => {
    const percentage = item.value / total;
    const startAngle = cumulativePercentage * 360;
    cumulativePercentage += percentage;
    const endAngle = cumulativePercentage * 360;

    return {
      ...item,
      percentage,
      startAngle,
      endAngle,
      color: colors[index % colors.length],
    };
  });

  return (
    <div className={cn("relative w-full flex justify-center", className)}>
      {/* Main container with flex layout */}
      <div className="flex items-center">
        {/* Pie chart container */}
        <div style={{ width: size, height: size, flex: "none" }}>
          <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            className="overflow-visible"
          >
            {/* Draw pie slices */}
            {slices.map((slice, index) => {
              // Convert angles to radians
              const startRad = (slice.startAngle * Math.PI) / 180;
              const endRad = (slice.endAngle * Math.PI) / 180;

              // Calculate the coordinates on the circle
              const startX = 50 + 45 * Math.cos(startRad);
              const startY = 50 + 45 * Math.sin(startRad);
              const endX = 50 + 45 * Math.cos(endRad);
              const endY = 50 + 45 * Math.sin(endRad);

              // Determine if the arc should be drawn as a large arc
              const largeArcFlag =
                slice.endAngle - slice.startAngle > 180 ? 1 : 0;

              // Create an SVG path for the slice
              const pathData = [
                `M 50 50`, // Move to center
                `L ${startX} ${startY}`, // Line to start point
                `A 45 45 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc to end point
                "Z", // Close path
              ].join(" ");

              return (
                <g
                  key={index}
                  onMouseEnter={() => setHoveredSlice(index)}
                  onMouseLeave={() => setHoveredSlice(null)}
                >
                  <path
                    d={pathData}
                    fill={slice.color}
                    className="transition-all duration-200"
                    style={{
                      transform:
                        hoveredSlice === index ? "scale(1.05)" : "scale(1)",
                      transformOrigin: "50px 50px",
                      filter:
                        hoveredSlice === index
                          ? "brightness(1.2)"
                          : "brightness(1)",
                    }}
                  />
                </g>
              );
            })}

            {/* Center circle with label */}
            {centerLabel && (
              <g>
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="rgba(0, 0, 0, 0.5)"
                  className="transition-opacity duration-300"
                />
                <foreignObject x="25" y="35" width="50" height="30">
                  <div className="h-full w-full flex flex-col items-center justify-center text-xs">
                    {centerLabel}
                  </div>
                </foreignObject>
              </g>
            )}
          </svg>
        </div>

        {/* Legend */}
        {renderLegend && legendPosition === "right" && (
          <div className="ml-8 flex-shrink-0 flex flex-col space-y-4">
            {data.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-2 transition-all duration-150",
                  hoveredSlice === index && "scale-105 font-medium"
                )}
                onMouseEnter={() => setHoveredSlice(index)}
                onMouseLeave={() => setHoveredSlice(null)}
              >
                <div
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{
                    backgroundColor: colors[index % colors.length],
                    boxShadow:
                      hoveredSlice === index
                        ? `0 0 0 2px ${colors[index % colors.length]}33`
                        : "none",
                  }}
                ></div>
                <span className="text-white text-sm whitespace-nowrap">
                  {item.name}
                </span>
                <span className="text-gray-400 text-xs whitespace-nowrap">
                  {item.value} ({Math.round((item.value / total) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom legend if needed */}
      {renderLegend && legendPosition === "bottom" && (
        <div className="mt-4 w-full flex flex-col space-y-2">
          {data.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-2 transition-all duration-150",
                hoveredSlice === index && "scale-105 font-medium"
              )}
              onMouseEnter={() => setHoveredSlice(index)}
              onMouseLeave={() => setHoveredSlice(null)}
            >
              <div
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{
                  backgroundColor: colors[index % colors.length],
                  boxShadow:
                    hoveredSlice === index
                      ? `0 0 0 2px ${colors[index % colors.length]}33`
                      : "none",
                }}
              ></div>
              <span className="text-white text-sm">{item.name}</span>
              <span className="text-gray-400 text-xs">
                {item.value} ({Math.round((item.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Line Chart Component
export const LineChart = ({
  data,
  height = 300,
  labels,
  lineColor = "#3b82f6",
  fillColor = "rgba(59, 130, 246, 0.1)",
  className,
  showTooltip = true,
}: {
  data: number[];
  height?: number;
  labels?: string[];
  lineColor?: string;
  fillColor?: string;
  className?: string;
  showTooltip?: boolean;
}) => {
  // Find min and max values for scaling
  const maxValue = Math.max(...data, 1) * 1.1; // Ensure minimum scale of 1 and add 10% padding
  const minValue = Math.min(...data, 0);
  const range = Math.max(maxValue - minValue, 1); // Prevent division by zero

  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Calculate points for the line
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - minValue) / range) * 100;
    return { x, y, value };
  });

  // Create SVG path for the line
  const linePath = points
    .map((point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
    )
    .join(" ");

  // Create SVG path for the area fill
  const areaPath = [
    ...points.map((point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
    ),
    `L ${points[points.length - 1].x} 100`,
    `L 0 100`,
    "Z",
  ].join(" ");

  return (
    <div className={cn("relative w-full", className)} style={{ height }}>
      {/* Y-axis gridlines */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 20, // Fixed bottom spacing for labels
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((_, i) => {
          // Calculate grid line positions from bottom to top
          const position = i / 5;
          return (
            <div
              key={i}
              className="border-t border-white/10 w-full h-0"
              style={{
                position: "absolute",
                top: `${(1 - position) * 100}%`,
                left: 0,
                right: 0,
              }}
            />
          );
        })}
      </div>

      {/* Chart */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Area fill under the line */}
        <path d={areaPath} fill={fillColor} stroke="none" />

        {/* Line */}
        <path d={linePath} fill="none" stroke={lineColor} strokeWidth="1" />

        {/* Data points */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r={hoveredPoint === index ? "2" : "1"}
              fill={lineColor}
              onMouseEnter={() => setHoveredPoint(index)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{
                transition: "r 0.2s ease",
                cursor: "pointer",
              }}
            />

            {/* Tooltip */}
            {showTooltip && hoveredPoint === index && (
              <foreignObject
                x={point.x - 20}
                y={point.y - 35}
                width="40"
                height="30"
              >
                <div className="bg-gray-900/90 text-white text-xs py-1 px-2 rounded-md shadow-lg text-center">
                  {point.value}
                </div>
              </foreignObject>
            )}
          </g>
        ))}
      </svg>

      {/* X-axis labels */}
      {labels && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
          {labels.map((label, index) => (
            <span
              key={index}
              className={cn(
                "text-gray-400 text-xs",
                hoveredPoint === index && "text-blue-400"
              )}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
