import { FaBrain, FaChartLine, FaDatabase } from "react-icons/fa";
import { mlEngineeringData } from "@/app/data/dummyData";

const MLEngineering = () => {
  const { models, trainingData, performanceMetrics } = mlEngineeringData;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        ML Engineering
      </h2>

      {/* Models Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <FaBrain className="text-2xl text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Models</h3>
        </div>
        <div className="bg-black/30 rounded-2xl p-6 border border-white/10 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/10">
                <th className="pb-4 pl-2">Name</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Accuracy</th>
                <th className="pb-4">Last Trained</th>
                <th className="pb-4">Technology</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr
                  key={model.id}
                  className="text-white border-b border-white/10"
                >
                  <td className="py-4 pl-2">
                    <div className="font-medium">{model.name}</div>
                    <div className="text-sm text-gray-400 mt-1 max-w-xs">
                      {model.inputFeatures.join(", ")}
                    </div>
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        model.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {model.status}
                    </span>
                  </td>
                  <td className="py-4 font-medium">{model.accuracy}%</td>
                  <td className="py-4 text-gray-400">{model.lastTrained}</td>
                  <td className="py-4">{model.technology}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium">
            Add New Model
          </button>
        </div>
      </div>

      {/* Training Data & Performance Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Training Data */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaDatabase className="text-2xl text-purple-400" />
            <h3 className="text-xl font-semibold text-white">Training Data</h3>
          </div>
          <div className="bg-black/30 rounded-2xl p-6 border border-white/10 h-full">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-gray-400 mb-1">Total Samples</p>
                <p className="text-2xl font-bold text-white">
                  {trainingData.totalSamples.toLocaleString()}
                </p>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-gray-400 mb-1">Last Updated</p>
                <p className="text-xl font-medium text-white">
                  {trainingData.lastUpdated}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-400 mb-4">Data Distribution</p>
              <div className="relative h-6 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-red-500"
                  style={{
                    width: `${
                      (trainingData.maliciousSamples /
                        trainingData.totalSamples) *
                      100
                    }%`,
                  }}
                ></div>
                <div
                  className="absolute left-0 top-0 h-full bg-green-500 border-r border-gray-700"
                  style={{
                    width: `${
                      (trainingData.cleanSamples / trainingData.totalSamples) *
                      100
                    }%`,
                    left: `${
                      (trainingData.maliciousSamples /
                        trainingData.totalSamples) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-white">
                    Malicious (
                    {Math.round(
                      (trainingData.maliciousSamples /
                        trainingData.totalSamples) *
                        100
                    )}
                    %)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white">
                    Clean (
                    {Math.round(
                      (trainingData.cleanSamples / trainingData.totalSamples) *
                        100
                    )}
                    %)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium">
                Upload Training Data
              </button>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaChartLine className="text-2xl text-blue-400" />
            <h3 className="text-xl font-semibold text-white">
              Performance Metrics
            </h3>
          </div>
          <div className="bg-black/30 rounded-2xl p-6 border border-white/10 h-full">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-gray-400 mb-1">Accuracy</p>
                <p className="text-2xl font-bold text-white">
                  {performanceMetrics.accuracy}%
                </p>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-gray-400 mb-1">F1 Score</p>
                <p className="text-2xl font-bold text-white">
                  {performanceMetrics.f1Score}%
                </p>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-gray-400 mb-1">Precision</p>
                <p className="text-2xl font-bold text-white">
                  {performanceMetrics.precision}%
                </p>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-gray-400 mb-1">Recall</p>
                <p className="text-2xl font-bold text-white">
                  {performanceMetrics.recall}%
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-400 mb-2">Error Rates</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-white">
                    False Positives: {performanceMetrics.falsePositives}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-white">
                    False Negatives: {performanceMetrics.falseNegatives}%
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium">
                Run Evaluation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLEngineering;
