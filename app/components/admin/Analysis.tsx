import {
  FaChartLine,
  FaExclamationTriangle,
  FaFileAlt,
  FaSearch,
} from "react-icons/fa";
import { analysisData } from "@/app/data/dummyData";

const Analysis = () => {
  const { threatStats, threatDistribution, recentDetections, monthlyTrends } =
    analysisData;

  // Calculate total for pie chart percentages
  const total = threatDistribution.reduce((sum, item) => sum + item.value, 0);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Analysis
      </h2>

      {/* Threat Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <FaExclamationTriangle className="text-xl text-red-400" />
            <h3 className="text-lg font-semibold text-white">Total Threats</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {threatStats.totalThreats}
          </p>
        </div>

        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <FaSearch className="text-xl text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Phishing</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {threatStats.phishingAttempts}
          </p>
        </div>

        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <FaFileAlt className="text-xl text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Malware</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {threatStats.malwareAttachments}
          </p>
        </div>

        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <FaChartLine className="text-xl text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              Suspicious Links
            </h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {threatStats.suspiciousLinks}
          </p>
        </div>
      </div>

      {/* Threat Distribution and Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Threat Distribution (Pie Chart) */}
        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-6">
            Threat Distribution
          </h3>

          <div className="flex justify-center mb-4">
            {/* Simple CSS Pie Chart */}
            <div className="relative w-48 h-48">
              {/* Phishing Slice */}
              <div
                className="absolute w-full h-full rounded-full bg-yellow-500"
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${
                    50 +
                    50 *
                      Math.cos(
                        2 * Math.PI * (threatDistribution[0].value / total)
                      )
                  }% ${
                    50 -
                    50 *
                      Math.sin(
                        2 * Math.PI * (threatDistribution[0].value / total)
                      )
                  }%, 50% 50%)`,
                  transform: "rotate(0deg)",
                }}
              ></div>

              {/* Malware Slice */}
              <div
                className="absolute w-full h-full rounded-full bg-orange-500"
                style={{
                  clipPath: `polygon(50% 50%, ${
                    50 +
                    50 *
                      Math.cos(
                        2 * Math.PI * (threatDistribution[0].value / total)
                      )
                  }% ${
                    50 -
                    50 *
                      Math.sin(
                        2 * Math.PI * (threatDistribution[0].value / total)
                      )
                  }%, ${
                    50 +
                    50 *
                      Math.cos(
                        2 *
                          Math.PI *
                          ((threatDistribution[0].value +
                            threatDistribution[1].value) /
                            total)
                      )
                  }% ${
                    50 -
                    50 *
                      Math.sin(
                        2 *
                          Math.PI *
                          ((threatDistribution[0].value +
                            threatDistribution[1].value) /
                            total)
                      )
                  }%, 50% 50%)`,
                  transform: "rotate(0deg)",
                }}
              ></div>

              {/* Suspicious Links Slice */}
              <div
                className="absolute w-full h-full rounded-full bg-blue-500"
                style={{
                  clipPath: `polygon(50% 50%, ${
                    50 +
                    50 *
                      Math.cos(
                        2 *
                          Math.PI *
                          ((threatDistribution[0].value +
                            threatDistribution[1].value) /
                            total)
                      )
                  }% ${
                    50 -
                    50 *
                      Math.sin(
                        2 *
                          Math.PI *
                          ((threatDistribution[0].value +
                            threatDistribution[1].value) /
                            total)
                      )
                  }%, 100% 50%, 50% 50%)`,
                  transform: "rotate(0deg)",
                }}
              ></div>

              {/* Center Circle (for donut effect) */}
              <div className="absolute w-28 h-28 bg-black/50 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {total} Total
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {threatDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full ${
                    index === 0
                      ? "bg-yellow-500"
                      : index === 1
                      ? "bg-orange-500"
                      : "bg-blue-500"
                  }`}
                ></div>
                <span className="text-white">{item.name}</span>
                <span className="text-gray-400">
                  {item.value} ({Math.round((item.value / total) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-6">
            Monthly Trends
          </h3>

          <div className="relative h-60">
            {/* Y-axis gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[0, 1, 2, 3, 4].map((_, i) => (
                <div
                  key={i}
                  className="border-t border-white/10 w-full h-0"
                ></div>
              ))}
            </div>

            {/* Bars */}
            <div className="absolute inset-0 flex items-end pt-6">
              <div className="w-full flex justify-between items-end">
                {monthlyTrends.months.map((month, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2"
                    style={{ height: "100%" }}
                  >
                    {/* Phishing */}
                    <div
                      className="w-4 bg-yellow-500 rounded-t-sm"
                      style={{
                        height: `${(monthlyTrends.phishing[i] / 50) * 100}%`,
                        maxHeight: "90%",
                      }}
                    ></div>

                    {/* Malware */}
                    <div
                      className="w-4 bg-orange-500 rounded-t-sm"
                      style={{
                        height: `${(monthlyTrends.malware[i] / 50) * 100}%`,
                        maxHeight: "90%",
                      }}
                    ></div>

                    {/* Suspicious Links */}
                    <div
                      className="w-4 bg-blue-500 rounded-t-sm"
                      style={{
                        height: `${
                          (monthlyTrends.suspiciousLinks[i] / 50) * 100
                        }%`,
                        maxHeight: "90%",
                      }}
                    ></div>

                    <span className="text-gray-400 text-sm mt-2">{month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4 gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-400">Phishing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-gray-400">Malware</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-400">Suspicious Links</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Detections */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">
          Recent Detections
        </h3>
        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <div className="space-y-4">
            {recentDetections.map((detection) => (
              <div
                key={detection.id}
                className="bg-black/30 rounded-xl p-4 border border-white/5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <FaFileAlt className="text-blue-400" />
                      <h4 className="text-lg font-medium text-white">
                        {detection.fileName}
                      </h4>
                      <span
                        className={`ml-2 px-3 py-1 rounded-full text-xs ${
                          detection.threatType === "Phishing"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : detection.threatType === "Malware"
                            ? "bg-orange-500/20 text-orange-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        {detection.threatType}
                      </span>
                    </div>
                    <p className="text-gray-400 mt-1">
                      Detected {detection.detectionTime} | Confidence:{" "}
                      <span className="text-white">
                        {detection.confidence}%
                      </span>
                    </p>
                  </div>

                  <button className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors">
                    View Details
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {detection.indicators.map((indicator, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/5 rounded text-sm text-gray-300"
                    >
                      {indicator}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
