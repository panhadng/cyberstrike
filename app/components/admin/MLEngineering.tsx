import { useState } from "react";
import {
  FaBrain,
  FaChartLine,
  FaDatabase,
  FaTools,
  FaCog,
  FaSync,
  FaServer,
  FaPlus,
  FaInfoCircle,
  FaChartBar,
} from "react-icons/fa";
import { mlEngineeringData } from "@/app/data/dummyData";

const MLEngineering = () => {
  const { models, systemPerformance, recentTraining } = mlEngineeringData;

  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [viewMode, setViewMode] = useState<"models" | "system">("models");
  const [isRetraining, setIsRetraining] = useState<Record<number, boolean>>({});

  // Handle model selection
  const handleModelSelect = (modelId: number) => {
    setSelectedModel(modelId);
    setShowConfigModal(true);
  };

  // Handle model retraining
  const handleRetrain = (modelId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the modal

    // Set the retraining flag for this model
    setIsRetraining((prev) => ({ ...prev, [modelId]: true }));

    // Simulate retraining completion after 2 seconds
    setTimeout(() => {
      setIsRetraining((prev) => ({ ...prev, [modelId]: false }));
    }, 2000);
  };

  // Find the currently selected model object if any
  const selectedModelData = selectedModel
    ? models.find((m) => m.id === selectedModel)
    : null;

  return (
    <div className="pb-8">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        ML Engineering
      </h2>

      {/* Performance View Toggle */}
      <div className="flex justify-end mb-6">
        <div className="bg-black/50 rounded-xl p-1 flex">
          <button
            onClick={() => setViewMode("models")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === "models"
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Individual Models
          </button>
          <button
            onClick={() => setViewMode("system")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === "system"
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            System Performance
          </button>
        </div>
      </div>

      {/* Models View */}
      {viewMode === "models" && (
        <div className="space-y-8">
          {models.map((model) => (
            <div
              key={model.id}
              className="bg-black/30 rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-blue-500/50 transition-colors"
              onClick={() => handleModelSelect(model.id)}
            >
              {/* Model Header */}
              <div className="bg-black/50 p-5 flex justify-between items-center border-b border-white/10">
                <div className="flex items-center gap-3">
                  <FaBrain className="text-2xl text-blue-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {model.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{model.description}</p>
                  </div>
                  <span
                    className={`ml-4 px-3 py-1 text-xs rounded-full ${
                      model.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {model.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition-colors text-white text-sm ${
                      isRetraining[model.id]
                        ? "opacity-75 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={(e) => handleRetrain(model.id, e)}
                    disabled={isRetraining[model.id]}
                  >
                    {isRetraining[model.id] ? (
                      <>
                        <FaSync className="animate-spin" />
                        <span>Retraining...</span>
                      </>
                    ) : (
                      <>
                        <FaSync />
                        <span>Retrain Model</span>
                      </>
                    )}
                  </button>
                  <FaCog className="text-gray-400 hover:text-white transition-colors text-xl" />
                </div>
              </div>

              {/* Model Details */}
              <div className="p-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Model Stats */}
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                      <FaChartBar className="text-blue-400" />
                      <span>Model Performance</span>
                    </h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/30 rounded-xl p-4">
                        <p className="text-gray-400 mb-1">Accuracy</p>
                        <p className="text-2xl font-bold text-white">
                          {model.accuracy}%
                        </p>
                      </div>
                      <div className="bg-black/30 rounded-xl p-4">
                        <p className="text-gray-400 mb-1">F1 Score</p>
                        <p className="text-2xl font-bold text-white">
                          {model.f1Score}%
                        </p>
                      </div>
                      <div className="bg-black/30 rounded-xl p-4">
                        <p className="text-gray-400 mb-1">Precision</p>
                        <p className="text-2xl font-bold text-white">
                          {model.precision}%
                        </p>
                      </div>
                      <div className="bg-black/30 rounded-xl p-4">
                        <p className="text-gray-400 mb-1">Recall</p>
                        <p className="text-2xl font-bold text-white">
                          {model.recall}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-white">
                          False Positives: {model.falsePositives}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-white">
                          False Negatives: {model.falseNegatives}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <div className="bg-black/20 px-3 py-1 rounded-lg text-gray-300 text-sm">
                        <span className="text-gray-400 mr-2">Technology:</span>
                        {model.technology}
                      </div>
                      <div className="bg-black/20 px-3 py-1 rounded-lg text-gray-300 text-sm">
                        <span className="text-gray-400 mr-2">
                          Last Trained:
                        </span>
                        {model.lastTrained}
                      </div>
                    </div>
                  </div>

                  {/* Training Data */}
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                      <FaDatabase className="text-purple-400" />
                      <span>Training Data</span>
                    </h4>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-black/30 rounded-xl p-4">
                        <p className="text-gray-400 mb-1">Total Samples</p>
                        <p className="text-2xl font-bold text-white">
                          {model.trainingData.totalSamples.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-black/30 rounded-xl p-4">
                        <p className="text-gray-400 mb-1">Last Updated</p>
                        <p className="text-xl font-medium text-white">
                          {model.trainingData.lastUpdated}
                        </p>
                      </div>
                    </div>

                    {/* Data Distribution */}
                    {model.type === "binary" ? (
                      // Binary Classification Distribution
                      <div>
                        <p className="text-gray-400 mb-3">Data Distribution</p>
                        <div className="relative h-6 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="absolute left-0 top-0 h-full bg-red-500"
                            style={{
                              width: `${
                                (model.trainingData.maliciousSamples /
                                  model.trainingData.totalSamples) *
                                100
                              }%`,
                            }}
                          ></div>
                          <div
                            className="absolute left-0 top-0 h-full bg-green-500 border-r border-gray-700"
                            style={{
                              width: `${
                                (model.trainingData.cleanSamples /
                                  model.trainingData.totalSamples) *
                                100
                              }%`,
                              left: `${
                                (model.trainingData.maliciousSamples /
                                  model.trainingData.totalSamples) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex flex-wrap justify-between mt-2 text-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-white">
                              Malicious (
                              {Math.round(
                                (model.trainingData.maliciousSamples /
                                  model.trainingData.totalSamples) *
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
                                (model.trainingData.cleanSamples /
                                  model.trainingData.totalSamples) *
                                  100
                              )}
                              %)
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Multi-class Distribution
                      <div>
                        <p className="text-gray-400 mb-3">Class Distribution</p>
                        {model.trainingData.classDistribution &&
                          Object.entries(
                            model.trainingData.classDistribution
                          ).map(([className, count], index) => {
                            // Calculate percentage
                            const percentage =
                              ((count as number) /
                                model.trainingData.totalSamples) *
                              100;
                            const colors = [
                              "bg-blue-500",
                              "bg-red-500",
                              "bg-green-500",
                              "bg-yellow-500",
                              "bg-purple-500",
                            ];
                            const color = colors[index % colors.length];

                            return (
                              <div key={className} className="mb-2">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-white">
                                    {className}
                                  </span>
                                  <span className="text-gray-400">
                                    {count} samples ({percentage.toFixed(1)}%)
                                  </span>
                                </div>
                                <div className="w-full h-2 bg-gray-700 rounded-full">
                                  <div
                                    className={`h-full ${color} rounded-full`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}

                    <div className="mt-4">
                      <button className="w-full px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex justify-center items-center gap-2">
                        <FaPlus className="text-sm" />
                        <span>Upload Training Data</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* System Performance View */}
      {viewMode === "system" && (
        <div className="bg-black/30 rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <FaServer className="text-blue-400" />
              <span>System Performance Overview</span>
            </h3>
            <div className="bg-black/20 px-3 py-1 rounded-lg text-gray-300 text-sm">
              Last evaluated: {systemPerformance.lastEvaluated}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Metrics Panel */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4">
                Overall Performance Metrics
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 rounded-xl p-4">
                  <p className="text-gray-400 mb-1">Accuracy</p>
                  <p className="text-2xl font-bold text-white">
                    {systemPerformance.accuracy}%
                  </p>
                </div>
                <div className="bg-black/30 rounded-xl p-4">
                  <p className="text-gray-400 mb-1">F1 Score</p>
                  <p className="text-2xl font-bold text-white">
                    {systemPerformance.f1Score}%
                  </p>
                </div>
                <div className="bg-black/30 rounded-xl p-4">
                  <p className="text-gray-400 mb-1">Precision</p>
                  <p className="text-2xl font-bold text-white">
                    {systemPerformance.precision}%
                  </p>
                </div>
                <div className="bg-black/30 rounded-xl p-4">
                  <p className="text-gray-400 mb-1">Recall</p>
                  <p className="text-2xl font-bold text-white">
                    {systemPerformance.recall}%
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-gray-400 mb-2">Error Rates</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-white">
                      False Positives: {systemPerformance.falsePositives}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-white">
                      False Negatives: {systemPerformance.falseNegatives}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-black/20 rounded-xl">
                <p className="text-gray-400 mb-2">Evaluation Information</p>
                <p className="text-white">{systemPerformance.evaluationSet}</p>
              </div>
            </div>

            {/* Recent Training Activity */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4">
                Recent Model Updates
              </h4>
              <div className="space-y-4">
                {recentTraining.map((event, idx) => {
                  const relatedModel = models.find(
                    (m) => m.id === event.modelId
                  );
                  return (
                    <div
                      key={idx}
                      className="bg-black/30 rounded-xl p-4 border border-white/5"
                    >
                      <div className="flex justify-between mb-2">
                        <div className="font-medium text-white">
                          {relatedModel?.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {event.timestamp}
                        </div>
                      </div>
                      <div className="text-sm text-gray-300 mb-2">
                        {event.event}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-400">
                          {event.details}
                        </div>
                        <div className="text-sm text-green-400">
                          {event.performance}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6">
                <button className="w-full px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex justify-center items-center gap-2">
                  <FaSync className="text-sm" />
                  <span>Run System Evaluation</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-black/20 rounded-xl p-4 border border-gray-800">
            <div className="flex items-center gap-2 text-yellow-500 mb-2">
              <FaInfoCircle />
              <h4 className="font-medium">Model Pipeline Information</h4>
            </div>
            <p className="text-gray-300">
              The system employs a layered approach with three specialized
              models:
            </p>
            <ul className="mt-2 space-y-1 text-gray-400 list-disc list-inside">
              <li>
                Email Body Classifier analyzes email content for malicious
                patterns
              </li>
              <li>Attachment Classifier detects malware in attached files</li>
              <li>
                Malware Type Classifier categorizes detected threats by type
              </li>
            </ul>
            <p className="mt-2 text-gray-300">
              The combined system provides robust protection with{" "}
              {systemPerformance.accuracy}% accuracy against known and emerging
              threats.
            </p>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {showConfigModal && selectedModelData && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-black/50 p-5 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-3">
                <FaCog className="text-2xl text-blue-400" />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {selectedModelData.name} Configuration
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Adjust model parameters and settings
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-gray-400 hover:text-white transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Hyperparameters */}
                <div className="bg-black/30 rounded-xl p-5 border border-white/5">
                  <h4 className="text-lg font-medium text-white mb-4">
                    Hyperparameters
                  </h4>

                  {selectedModelData.technology ===
                    "TF-IDF + Logistic Regression" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">
                          Learning Rate
                        </label>
                        <input
                          type="range"
                          min="0.001"
                          max="0.1"
                          step="0.001"
                          defaultValue={selectedModelData.config.learningRate}
                          className="w-full accent-blue-500"
                        />
                        <div className="flex justify-between text-gray-500 text-xs">
                          <span>0.001</span>
                          <span>0.1</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">
                          Max Iterations
                        </label>
                        <select className="w-full bg-black/30 rounded-lg p-2 border border-white/10 text-white">
                          <option value="500">500</option>
                          <option
                            value="1000"
                            selected={
                              selectedModelData.config.maxIterations === 1000
                            }
                          >
                            1000
                          </option>
                          <option value="2000">2000</option>
                          <option value="5000">5000</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">
                          Regularization
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            className={`py-2 px-3 rounded-lg text-center ${
                              selectedModelData.config.regularization === "L1"
                                ? "bg-blue-600 text-white"
                                : "bg-black/20 text-gray-400"
                            }`}
                          >
                            L1 (Lasso)
                          </button>
                          <button
                            className={`py-2 px-3 rounded-lg text-center ${
                              selectedModelData.config.regularization === "L2"
                                ? "bg-blue-600 text-white"
                                : "bg-black/20 text-gray-400"
                            }`}
                          >
                            L2 (Ridge)
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">
                          Regularization Strength (C)
                        </label>
                        <input
                          type="range"
                          min="0.01"
                          max="1"
                          step="0.01"
                          defaultValue={
                            selectedModelData.config.regularizationStrength
                          }
                          className="w-full accent-blue-500"
                        />
                        <div className="flex justify-between text-gray-500 text-xs">
                          <span>0.01 (stronger)</span>
                          <span>1.0 (weaker)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedModelData.technology === "XGBoost" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">
                          Learning Rate
                        </label>
                        <input
                          type="range"
                          min="0.01"
                          max="0.3"
                          step="0.01"
                          defaultValue={selectedModelData.config.learningRate}
                          className="w-full accent-blue-500"
                        />
                        <div className="flex justify-between text-gray-500 text-xs">
                          <span>0.01</span>
                          <span>0.3</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">
                          Number of Estimators
                        </label>
                        <select className="w-full bg-black/30 rounded-lg p-2 border border-white/10 text-white">
                          <option value="100">100</option>
                          <option value="200">200</option>
                          <option
                            value="300"
                            selected={
                              selectedModelData.config.numEstimators === 300
                            }
                          >
                            300
                          </option>
                          <option value="500">500</option>
                          <option value="1000">1000</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">
                          Max Depth
                        </label>
                        <input
                          type="range"
                          min="3"
                          max="10"
                          step="1"
                          defaultValue={selectedModelData.config.maxDepth}
                          className="w-full accent-blue-500"
                        />
                        <div className="flex justify-between text-gray-500 text-xs">
                          <span>3</span>
                          <span>10</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 mb-1 text-sm">
                            Subsample
                          </label>
                          <input
                            type="range"
                            min="0.5"
                            max="1.0"
                            step="0.1"
                            defaultValue={selectedModelData.config.subsample}
                            className="w-full accent-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 mb-1 text-sm">
                            Colsample By Tree
                          </label>
                          <input
                            type="range"
                            min="0.5"
                            max="1.0"
                            step="0.1"
                            defaultValue={
                              selectedModelData.config.colsampleByTree
                            }
                            className="w-full accent-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedModelData.technology === "Random Forest" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">
                          Number of Estimators
                        </label>
                        <select className="w-full bg-black/30 rounded-lg p-2 border border-white/10 text-white">
                          <option value="100">100</option>
                          <option value="200">200</option>
                          <option value="300">300</option>
                          <option
                            value="500"
                            selected={
                              selectedModelData.config.numEstimators === 500
                            }
                          >
                            500
                          </option>
                          <option value="1000">1000</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">
                          Max Depth
                        </label>
                        <input
                          type="range"
                          min="5"
                          max="20"
                          step="1"
                          defaultValue={selectedModelData.config.maxDepth}
                          className="w-full accent-blue-500"
                        />
                        <div className="flex justify-between text-gray-500 text-xs">
                          <span>5</span>
                          <span>20</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 mb-1 text-sm">
                            Min Samples Leaf
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            defaultValue={
                              selectedModelData.config.minSamplesLeaf
                            }
                            className="w-full bg-black/30 rounded-lg p-2 border border-white/10 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 mb-1 text-sm">
                            Min Samples Split
                          </label>
                          <input
                            type="number"
                            min="2"
                            max="10"
                            defaultValue={
                              selectedModelData.config.minSamplesSplit
                            }
                            className="w-full bg-black/30 rounded-lg p-2 border border-white/10 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Training Configuration */}
                <div className="bg-black/30 rounded-xl p-5 border border-white/5">
                  <h4 className="text-lg font-medium text-white mb-4">
                    Training Configuration
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-1 text-sm">
                        Train/Test Split
                      </label>
                      <div className="relative mt-1">
                        <select className="w-full bg-black/30 rounded-lg p-2 border border-white/10 text-white appearance-none">
                          <option value="0.1">10% test / 90% train</option>
                          <option
                            value="0.2"
                            selected={
                              selectedModelData.config.trainTestSplit === 0.2
                            }
                          >
                            20% test / 80% train
                          </option>
                          <option
                            value="0.3"
                            selected={
                              selectedModelData.config.trainTestSplit === 0.3
                            }
                          >
                            30% test / 70% train
                          </option>
                          <option value="0.4">40% test / 60% train</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={
                            selectedModelData.config.crossValidation
                          }
                          className="w-4 h-4 rounded accent-blue-500"
                        />
                        <span className="text-white">
                          Enable Cross-Validation
                        </span>
                      </label>
                    </div>

                    {selectedModelData.config.crossValidation && (
                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">
                          K-Folds
                        </label>
                        <select className="w-full bg-black/30 rounded-lg p-2 border border-white/10 text-white">
                          <option
                            value="3"
                            selected={selectedModelData.config.kFolds === 3}
                          >
                            3-fold
                          </option>
                          <option
                            value="5"
                            selected={selectedModelData.config.kFolds === 5}
                          >
                            5-fold
                          </option>
                          <option value="10">10-fold</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">
                        Feature Selection
                      </label>
                      <div className="space-y-2">
                        {selectedModelData.config.featureSelection.map(
                          (feature, idx) => (
                            <label
                              key={idx}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                defaultChecked={true}
                                className="w-4 h-4 rounded accent-blue-500"
                              />
                              <span className="text-white">{feature}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 p-4 rounded-xl text-sm text-gray-400 mb-6">
                <div className="flex items-center gap-2 text-yellow-500 mb-2">
                  <FaInfoCircle />
                  <h4 className="font-medium">Optimization Tips</h4>
                </div>
                <p>
                  For the {selectedModelData.name}, we recommend tuning{" "}
                  {selectedModelData.technology ===
                  "TF-IDF + Logistic Regression"
                    ? "learning rate and regularization strength"
                    : selectedModelData.technology === "XGBoost"
                    ? "learning rate, max depth, and number of estimators"
                    : "number of estimators and min samples leaf"}{" "}
                  for optimal performance.
                </p>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="px-5 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MLEngineering;
