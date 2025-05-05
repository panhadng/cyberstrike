"use client";
import {
  FaUpload,
  FaFileAlt,
  FaSearch,
  FaClock,
  FaEnvelopeOpenText,
  FaLightbulb,
  FaChartBar,
  FaDoorOpen,
  FaExclamation,
  FaServer,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { FaMicroscope } from "react-icons/fa";
import Layout from "../components/Layout";
import { useState } from "react";
import React from "react";
import "../styles/scrollbar.css";
import ScanResultsDisplay, { ScanResults } from "../components/ScanResults";

interface FileHistoryItem {
  id: string;
  fileName: string;
  status: "Malicious" | "Clean";
  riskScore: number;
  uploadDate: string;
}

interface AiInsight {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  actionable: boolean;
}

export default function UserPortal() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scanResults, setScanResults] = useState<ScanResults | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [restrictToEml, setRestrictToEml] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [insightsMinimized, setInsightsMinimized] = useState(false);

  // Dummy file history data
  const fileHistory: FileHistoryItem[] = [
    {
      id: "1",
      fileName: "invoice.eml",
      status: "Malicious",
      riskScore: 0.85,
      uploadDate: "2 hours ago",
    },
    {
      id: "2",
      fileName: "report.pdf",
      status: "Clean",
      riskScore: 0.12,
      uploadDate: "5 hours ago",
    },
    {
      id: "3",
      fileName: "contract.eml",
      status: "Clean",
      riskScore: 0.08,
      uploadDate: "1 day ago",
    },
    {
      id: "4",
      fileName: "presentation.pptx",
      status: "Malicious",
      riskScore: 0.92,
      uploadDate: "2 days ago",
    },
    {
      id: "5",
      fileName: "meeting_notes.eml",
      status: "Clean",
      riskScore: 0.15,
      uploadDate: "3 days ago",
    },
  ];

  // Dummy AI insights data
  const aiInsights: AiInsight[] = [
    {
      id: "1",
      icon: <FaServer className="text-red-400" />,
      title: "Suspicious Domain Pattern",
      description:
        "40% of your malicious emails come from domains containing 'account-verify' or 'secure-login'",
      severity: "high",
      actionable: true,
    },
    {
      id: "2",
      icon: <FaExclamation className="text-yellow-400" />,
      title: "Common Malware Type",
      description:
        "Phishing attempts make up 65% of detected threats, primarily requesting password resets",
      severity: "medium",
      actionable: false,
    },
    {
      id: "3",
      icon: <FaDoorOpen className="text-red-400" />,
      title: "Backdoor Attempts",
      description:
        "Three recent emails contained backdoor software disguised as PDF invoice attachments",
      severity: "high",
      actionable: true,
    },
    {
      id: "4",
      icon: <FaChartBar className="text-blue-400" />,
      title: "Weekly Threat Increase",
      description:
        "Malicious email detection has increased by 22% in the past week",
      severity: "medium",
      actionable: false,
    },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      if (restrictToEml && !event.target.files[0].name.endsWith(".eml")) {
        alert("Please select an .eml file");
        return;
      }
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleScan = () => {
    if (!selectedFile) return;

    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setScanResults({
        fileName: selectedFile.name,
        timestamp: new Date().toISOString(),
        bodyRiskScore: 0.62,
        attachmentRiskScore: 0.91,
        riskScore: 0.85,
        malwareType: "Phishing + Macro Malware",
        status: "Malicious",
        details: {
          sender: "suspicious@example.com",
          subject: "Urgent: Your Account Security Alert",
          attachments: ["invoice.pdf"],
          links: ["https://malicious-site.com"],
          bodyIndicators: [
            "Suspicious sender domain",
            "Urgency language used",
            "Suspicious phrases: 'Urgent', 'Your Account'",
            "Malicious link detected",
          ],
          attachmentIndicators: [
            "Contains macro script",
            "High entropy (possible obfuscation)",
            "MIME type mismatch",
          ],
          recommendations: [
            "Do not open the attachment",
            "Delete the email",
            "Report to your IT department",
            "Update your email security settings",
          ],
        },
        classifierInfo: {
          bodyClassifier: "TF-IDF + Logistic Regression",
          attachmentClassifier: "Metadata + XGBoost",
          malwareTypeClassifier: "XGBoost (Multi-class)",
          evaluationMetric: "F1 Score",
          confidenceScore: 0.92,
        },
      });
      setIsScanning(false);
    }, 2000);
  };

  const filteredHistory = fileHistory.filter((file) =>
    file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout showTopLeftLogo>
      <div className="flex flex-col h-full w-full items-center justify-center">
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-12 w-full max-w-6xl border border-white/10 mx-auto h-full max-h-[90vh] my-8 overflow-auto flex flex-col pb-12 cyber-scrollbar">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            User Portal
          </h2>

          {/* File Upload Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FaUpload className="text-2xl text-blue-400" />
                <h3 className="text-xl font-semibold text-white">
                  Upload File
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-gray-400">Restrict to .eml files</label>
                <input
                  type="checkbox"
                  checked={restrictToEml}
                  onChange={(e) => setRestrictToEml(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="bg-black/30 rounded-2xl p-6 border border-white/10 border-dashed">
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <FaEnvelopeOpenText className="text-4xl text-blue-400" />
                <p className="text-gray-400 text-center">
                  {selectedFile
                    ? `Selected: ${selectedFile.name}`
                    : "Drag and drop your file here, or click to browse"}
                </p>
                <input
                  type="file"
                  accept={restrictToEml ? ".eml" : "*"}
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <div className="flex flex-row gap-4">
                  <label
                    htmlFor="file-upload"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-2"
                  >
                    <FaEnvelopeOpenText className="text-lg" />
                    Select File
                  </label>
                  {selectedFile && (
                    <button
                      onClick={handleScan}
                      disabled={isScanning}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <FaMicroscope className="text-lg" />
                      {isScanning ? "Scanning..." : "Scan File"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Scan Results - Moved above File History */}
          {scanResults && (
            <div className="mb-12">
              <ScanResultsDisplay scanResults={scanResults} isAdmin={false} />
            </div>
          )}

          {/* AI Insights Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FaLightbulb className="text-2xl text-yellow-400" />
                <h3 className="text-xl font-semibold text-white">
                  AI Insights
                </h3>
              </div>
              <button
                onClick={() => setInsightsMinimized(!insightsMinimized)}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-yellow-400"
              >
                {insightsMinimized ? (
                  <>
                    <FaChevronDown className="text-sm" />
                    <span className="text-sm">Expand</span>
                  </>
                ) : (
                  <>
                    <FaChevronUp className="text-sm" />
                    <span className="text-sm">Minimize</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
              <p className="text-gray-300 mb-4">
                Based on your file upload history and scanning results, our AI
                has detected the following patterns and insights:
              </p>

              {!insightsMinimized && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aiInsights.map((insight) => (
                    <div
                      key={insight.id}
                      className={`p-4 rounded-xl border ${
                        insight.severity === "high"
                          ? "border-red-500/20 bg-red-900/10"
                          : insight.severity === "medium"
                          ? "border-yellow-500/20 bg-yellow-900/10"
                          : "border-blue-500/20 bg-blue-900/10"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{insight.icon}</div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">
                            {insight.title}
                          </h4>
                          <p className="text-gray-300 text-sm">
                            {insight.description}
                          </p>

                          {insight.actionable && (
                            <button className="mt-3 text-sm px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors">
                              View Recommendations
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {insightsMinimized && (
                <div className="flex justify-center mt-2">
                  <button
                    onClick={() => setInsightsMinimized(false)}
                    className="text-yellow-400 flex items-center gap-2 hover:underline"
                  >
                    <FaChevronDown />
                    <span>Show all insights</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* File History Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaFileAlt className="text-2xl text-purple-400" />
              <h3 className="text-xl font-semibold text-white">File History</h3>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search your uploaded files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/30 rounded-xl p-4 pl-12 text-white border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* File History Table */}
            <div className="bg-black/30 rounded-2xl p-6 border border-white/10 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="pb-4">File Name</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Risk Score</th>
                    <th className="pb-4">Upload Date</th>
                    <th className="pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((file) => (
                    <tr
                      key={file.id}
                      className="text-white border-b border-white/10"
                    >
                      <td className="py-4 flex items-center gap-2">
                        <FaFileAlt className="text-blue-400" />
                        <span>{file.fileName}</span>
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            file.status === "Malicious"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {file.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-700 rounded-full">
                            <div
                              className={`h-full rounded-full ${
                                file.riskScore > 0.7
                                  ? "bg-red-500"
                                  : file.riskScore > 0.3
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${file.riskScore * 100}%` }}
                            ></div>
                          </div>
                          <span>{(file.riskScore * 100).toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="py-4 flex items-center gap-2 text-gray-400">
                        <FaClock className="text-sm" />
                        <span>{file.uploadDate}</span>
                      </td>
                      <td className="py-4">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
