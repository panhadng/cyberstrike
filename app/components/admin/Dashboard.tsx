import { dashboardData } from "@/app/data/dummyData";
import {
  FaChartLine,
  FaFileAlt,
  FaRobot,
  FaExclamationTriangle,
  FaShieldAlt,
  FaUser,
  FaServer,
  FaClock,
  FaFilter,
  FaDownload,
  FaDatabase,
} from "react-icons/fa";
import { useState } from "react";

const Dashboard = () => {
  const { stats, recentActivity, threatsByRegion } = dashboardData;
  const [timeframe, setTimeframe] = useState("day");

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Admin Dashboard
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-black/30 rounded-xl p-2 border border-white/10">
            <span className="text-gray-400 text-sm px-2">View:</span>
            <button
              className={`px-3 py-1 rounded-lg text-sm ${
                timeframe === "day"
                  ? "bg-blue-500/30 text-blue-400"
                  : "text-gray-400 hover:bg-white/10"
              }`}
              onClick={() => setTimeframe("day")}
            >
              Day
            </button>
            <button
              className={`px-3 py-1 rounded-lg text-sm ${
                timeframe === "week"
                  ? "bg-blue-500/30 text-blue-400"
                  : "text-gray-400 hover:bg-white/10"
              }`}
              onClick={() => setTimeframe("week")}
            >
              Week
            </button>
            <button
              className={`px-3 py-1 rounded-lg text-sm ${
                timeframe === "month"
                  ? "bg-blue-500/30 text-blue-400"
                  : "text-gray-400 hover:bg-white/10"
              }`}
              onClick={() => setTimeframe("month")}
            >
              Month
            </button>
          </div>
          <button className="flex items-center gap-2 bg-black/30 rounded-xl p-2 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <FaDownload />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <FaFileAlt className="text-2xl text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Total Scans</h3>
          </div>
          <p className="text-4xl font-bold text-white">
            {stats.totalFiles.toLocaleString()}
          </p>
          <p className="text-gray-400 mt-2">{stats.totalFilesChange}</p>
        </div>

        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <FaExclamationTriangle className="text-2xl text-red-400" />
            <h3 className="text-xl font-semibold text-white">Threats</h3>
          </div>
          <p className="text-4xl font-bold text-white">
            {(stats.totalFiles - stats.cleanFiles).toLocaleString()}
          </p>
          <p className="text-gray-400 mt-2">
            {100 - parseInt(stats.cleanRate)}% detection rate
          </p>
        </div>

        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <FaChartLine className="text-2xl text-green-400" />
            <h3 className="text-xl font-semibold text-white">Clean Files</h3>
          </div>
          <p className="text-4xl font-bold text-white">
            {stats.cleanFiles.toLocaleString()}
          </p>
          <p className="text-gray-400 mt-2">{stats.cleanRate}</p>
        </div>

        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <FaRobot className="text-2xl text-purple-400" />
            <h3 className="text-xl font-semibold text-white">Model Accuracy</h3>
          </div>
          <p className="text-4xl font-bold text-white">
            {stats.modelAccuracy}%
          </p>
          <p className="text-gray-400 mt-2">{stats.modelAccuracyChange}</p>
        </div>
      </div>

      {/* System Health and Threat by Region */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* System Health */}
        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">System Health</h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-green-400 text-sm">
                All Systems Operational
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FaServer className="text-blue-400" />
                <span className="text-white">API Service</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-400">99.9% uptime</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FaRobot className="text-purple-400" />
                <span className="text-white">ML Service</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-400">99.8% uptime</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FaDatabase className="text-yellow-400" />
                <span className="text-white">Database</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-400">100% uptime</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-red-400" />
                <span className="text-white">Security Services</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-400">99.7% uptime</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Average Response Time:</span>
              <span className="text-white">124ms</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-400">Last System Update:</span>
              <span className="text-white">2 days ago</span>
            </div>
          </div>
        </div>

        {/* Threats by Region */}
        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">
              Threats by Region
            </h3>
            <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
              <FaFilter className="text-xs" />
              <span>Filter</span>
            </button>
          </div>

          <div className="space-y-4">
            {threatsByRegion?.map((region, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white">{region.name}</span>
                  <span className="text-gray-400">{region.count} threats</span>
                </div>
                <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-red-400"
                    style={{ width: `${region.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-sm text-gray-400">
              Most threats originate from North America and Europe
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
          <button className="text-sm text-blue-400 hover:text-blue-300">
            View All Activity
          </button>
        </div>
        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                {activity.type === "fileUpload" && (
                  <>
                    <div
                      className={`p-3 rounded-lg ${
                        activity.status === "Clean"
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                      }`}
                    >
                      <FaFileAlt
                        className={`text-xl ${
                          activity.status === "Clean"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">New file scanned</p>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-400 text-sm">
                          {activity.fileName}
                        </p>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            activity.status === "Clean"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {activity.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <FaClock className="text-xs" />
                      <span>{activity.timestamp}</span>
                    </div>
                  </>
                )}
                {activity.type === "modelUpdate" && (
                  <>
                    <div className="p-3 rounded-lg bg-blue-500/20">
                      <FaRobot className="text-xl text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">Model updated</p>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-400 text-sm">
                          {activity.modelName}
                        </p>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-400">
                          {activity.performance}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <FaClock className="text-xs" />
                      <span>{activity.timestamp}</span>
                    </div>
                  </>
                )}
                {activity.type === "systemAlert" && (
                  <>
                    <div className="p-3 rounded-lg bg-yellow-500/20">
                      <FaExclamationTriangle className="text-xl text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">
                        {activity.alertTitle}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-400 text-sm">
                          Severity: {activity.severity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <FaClock className="text-xs" />
                      <span>{activity.timestamp}</span>
                    </div>
                  </>
                )}
                {activity.type === "userActivity" &&
                  activity.action &&
                  activity.username && (
                    <>
                      <div className="p-3 rounded-lg bg-purple-500/20">
                        <FaUser className="text-xl text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">
                          {activity.action}
                        </p>
                        <p className="text-gray-400 text-sm">
                          User: {activity.username}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <FaClock className="text-xs" />
                        <span>{activity.timestamp}</span>
                      </div>
                    </>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
