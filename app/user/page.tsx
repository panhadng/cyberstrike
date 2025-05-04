"use client";
import {
  FaUpload,
  FaFileAlt,
  FaShieldAlt,
  FaExclamationTriangle,
  FaSearch,
  FaClock,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import Layout from "../components/Layout";
import { useState } from "react";
import "../styles/scrollbar.css";

interface ScanDetails {
  sender: string;
  subject: string;
  attachments: string[];
  links: string[];
  indicators: string[];
  recommendations: string[];
}

interface ScanResults {
  fileName: string;
  timestamp: string;
  riskScore: number;
  status: "Malicious" | "Clean";
  details: ScanDetails;
}

interface FileHistoryItem {
  id: string;
  fileName: string;
  status: "Malicious" | "Clean";
  riskScore: number;
  uploadDate: string;
}

export default function UserPortal() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scanResults, setScanResults] = useState<ScanResults | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [restrictToEml, setRestrictToEml] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
        riskScore: 0.85,
        status: "Malicious",
        details: {
          sender: "suspicious@example.com",
          subject: "Urgent: Your Account Security Alert",
          attachments: ["invoice.pdf"],
          links: ["https://malicious-site.com"],
          indicators: [
            "Suspicious sender domain",
            "Contains malicious attachment",
            "Suspicious links detected",
            "Urgency language used",
          ],
          recommendations: [
            "Do not open the attachment",
            "Delete the email",
            "Report to your IT department",
            "Update your email security settings",
          ],
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
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <FaShieldAlt className="text-lg" />
                      {isScanning ? "Scanning..." : "Scan File"}
                    </button>
                  )}
                </div>
              </div>
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

          {/* Scan Results */}
          {scanResults && (
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-4">
                <FaShieldAlt className="text-2xl text-purple-400" />
                <h3 className="text-xl font-semibold text-white">
                  Scan Results
                </h3>
              </div>
              <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400">File Name</p>
                      <p className="text-white font-medium">
                        {scanResults.fileName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Scan Time</p>
                      <p className="text-white font-medium">
                        {new Date(scanResults.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Risk Score</p>
                      <div className="flex items-center gap-2">
                        <div className="w-full h-2 bg-gray-700 rounded-full">
                          <div
                            className={`h-full rounded-full ${
                              scanResults.riskScore > 0.7
                                ? "bg-red-500"
                                : scanResults.riskScore > 0.3
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{ width: `${scanResults.riskScore * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-medium">
                          {(scanResults.riskScore * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400">Status</p>
                      <p
                        className={`font-medium ${
                          scanResults.status === "Malicious"
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                      >
                        {scanResults.status}
                      </p>
                    </div>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400">Sender</p>
                      <p className="text-white font-medium">
                        {scanResults.details.sender}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Subject</p>
                      <p className="text-white font-medium">
                        {scanResults.details.subject}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Attachments</p>
                      <div className="flex flex-wrap gap-2">
                        {scanResults.details.attachments.map(
                          (attachment, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm"
                            >
                              {attachment}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400">Suspicious Links</p>
                      <div className="flex flex-wrap gap-2">
                        {scanResults.details.links.map((link, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm"
                          >
                            {link}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Indicators and Recommendations */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Threat Indicators
                    </h4>
                    <ul className="space-y-2">
                      {scanResults.details.indicators.map(
                        (indicator, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FaExclamationTriangle className="text-red-400 mt-1" />
                            <span className="text-gray-300">{indicator}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {scanResults.details.recommendations.map(
                        (recommendation, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FaShieldAlt className="text-blue-400 mt-1" />
                            <span className="text-gray-300">
                              {recommendation}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
