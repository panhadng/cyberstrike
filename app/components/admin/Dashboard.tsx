import { dashboardData } from "@/app/data/dummyData";
import { FaChartBar, FaChartLine, FaFileAlt, FaRobot } from "react-icons/fa";
const Dashboard = () => {
  const { stats, recentActivity } = dashboardData;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Admin Dashboard
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <FaFileAlt className="text-2xl text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Total Files</h3>
          </div>
          <p className="text-4xl font-bold text-white">
            {stats.totalFiles.toLocaleString()}
          </p>
          <p className="text-gray-400 mt-2">{stats.totalFilesChange}</p>
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

      {/* Recent Activity */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">
          Recent Activity
        </h3>
        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5"
              >
                {activity.type === "fileUpload" && (
                  <>
                    <FaFileAlt
                      className={`text-${
                        activity.status === "Clean" ? "green" : "red"
                      }-400`}
                    />
                    <div>
                      <p className="text-white">New file uploaded</p>
                      <p className="text-gray-400 text-sm">
                        {activity.fileName} - {activity.timestamp}
                      </p>
                    </div>
                  </>
                )}
                {activity.type === "modelUpdate" && (
                  <>
                    <FaRobot className="text-blue-400" />
                    <div>
                      <p className="text-white">Model updated</p>
                      <p className="text-gray-400 text-sm">
                        {activity.modelName} - {activity.performance}
                      </p>
                    </div>
                  </>
                )}
                {activity.type === "systemAlert" && (
                  <>
                    <FaChartBar className="text-yellow-400" />
                    <div>
                      <p className="text-white">{activity.alertTitle}</p>
                      <p className="text-gray-400 text-sm">
                        Severity: {activity.severity} - {activity.timestamp}
                      </p>
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
