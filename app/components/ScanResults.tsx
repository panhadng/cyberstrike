import React, { useState } from "react";
import {
  FaExclamationTriangle,
  FaInfoCircle,
  FaCheckCircle,
  FaPaperclip,
  FaEnvelope,
  FaBrain,
  FaChevronDown,
  FaChevronUp,
  FaDatabase,
  FaVirus,
  FaNetworkWired,
  FaLock,
  FaExclamation,
} from "react-icons/fa";
import { FaMicroscope } from "react-icons/fa";

// Types
export interface ScanDetails {
  sender: string;
  subject: string;
  attachments: string[];
  links: string[];
  bodyIndicators: string[];
  attachmentIndicators: string[];
  recommendations: string[];
}

export interface ScanResults {
  fileName: string;
  timestamp: string;
  bodyRiskScore: number;
  attachmentRiskScore: number;
  riskScore: number;
  malwareType: string;
  status: "Malicious" | "Clean";
  details: ScanDetails;
  classifierInfo?: {
    bodyClassifier: string;
    attachmentClassifier: string;
    malwareTypeClassifier: string;
    evaluationMetric: string;
    confidenceScore: number;
  };
  // Admin-specific extended info
  adminInfo?: {
    modelVersion: string;
    addedToDatabase: boolean;
    threatSignatureId?: string;
    falsePositiveRisk: number;
    processingTime: string;
    similarSamples: number;
  };
}

interface ScanResultsProps {
  scanResults: ScanResults;
  isAdmin?: boolean;
  onExport?: () => void;
  adminActions?: React.ReactNode;
}

const ScanResultsDisplay: React.FC<ScanResultsProps> = ({
  scanResults,
  isAdmin = false,
  onExport,
  adminActions,
}) => {
  const [minimized, setMinimized] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FaMicroscope className="text-2xl text-green-400" />
          <h3 className="text-xl font-semibold text-white">Scan Results</h3>
        </div>
        <div className="flex items-center gap-3">
          {onExport && (
            <button
              onClick={onExport}
              className="px-3 py-1 rounded-lg bg-green-500/20 text-green-400 text-sm"
            >
              Export Report
            </button>
          )}
          <button
            onClick={() => setMinimized(!minimized)}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/30 hover:bg-black/50 transition-colors text-purple-400"
          >
            {minimized ? (
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
      </div>
      <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
        {/* Admin-specific scan summary */}
        {isAdmin && scanResults.adminInfo && (
          <div className="mb-6 bg-blue-900/20 rounded-xl p-4 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-3">
              <FaDatabase className="text-blue-400" />
              <h4 className="text-lg font-semibold text-white">
                Admin Analysis Summary
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Model Version</p>
                <p className="text-white font-medium">
                  {scanResults.adminInfo?.modelVersion}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Processing Time</p>
                <p className="text-white font-medium">
                  {scanResults.adminInfo?.processingTime}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Similar Samples</p>
                <p className="text-white font-medium">
                  {scanResults.adminInfo?.similarSamples} found
                </p>
              </div>
              <div>
                <p className="text-gray-400">False Positive Risk</p>
                <p className="text-white font-medium">
                  {(scanResults.adminInfo?.falsePositiveRisk || 0) * 100}%
                </p>
              </div>
              <div>
                <p className="text-gray-400">Threat Database</p>
                <p className="text-white font-medium">
                  {scanResults.adminInfo?.addedToDatabase
                    ? `Added (ID: ${scanResults.adminInfo?.threatSignatureId})`
                    : "Not added"}
                </p>
              </div>
              <div>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  View Full Technical Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Prominent Risk Score and Malware Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-900/40 rounded-xl border border-white/5 p-5 flex flex-col items-center justify-center text-center">
            <p className="text-gray-400 text-sm mb-1">Risk Assessment</p>
            <div
              className={`text-4xl font-bold mb-1 ${
                scanResults.riskScore > 0.7
                  ? "text-red-400"
                  : scanResults.riskScore > 0.3
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {(scanResults.riskScore * 100).toFixed(0)}%
            </div>
            <div className="w-3/4 h-3 bg-gray-700 rounded-full mb-2">
              <div
                className={`h-full rounded-full ${
                  scanResults.riskScore > 0.7
                    ? "bg-red-500"
                    : scanResults.riskScore > 0.3
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{
                  width: `${scanResults.riskScore * 100}%`,
                }}
              ></div>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <FaBrain className="text-purple-400" />
              <span className="text-white text-sm font-medium">
                {scanResults.status}
              </span>
              <span className="text-xs text-gray-400">
                ({scanResults.classifierInfo?.evaluationMetric}:{" "}
                {(scanResults.classifierInfo?.confidenceScore || 0) * 100}%)
              </span>
            </div>
          </div>

          <div className="bg-gray-900/40 rounded-xl border border-white/5 p-5 flex flex-col items-center justify-center text-center">
            <p className="text-gray-400 text-sm mb-1">Threat Classification</p>
            <div className="text-2xl text-white font-bold mb-2">
              {scanResults.malwareType}
            </div>
            <div className="flex items-center gap-2 bg-red-900/30 px-3 py-1.5 rounded-full">
              <FaExclamation className="text-red-400" />
              <span className="text-red-300 text-sm">High Severity Threat</span>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <p className="text-gray-400">File Name</p>
              <p className="text-white font-medium">{scanResults.fileName}</p>
            </div>
            <div>
              <p className="text-gray-400">Scan Time</p>
              <p className="text-white font-medium">
                {new Date(scanResults.timestamp).toLocaleString()}
              </p>
            </div>

            {/* Risk Score Breakdown */}
            <div>
              <p className="text-gray-400 mb-2">Risk Score Breakdown</p>
              <div className="space-y-3 bg-black/20 p-3 rounded-lg">
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-white text-sm">
                      <FaEnvelope className="inline-block mr-2 text-white" />
                      Email Body
                    </p>
                    <p className="text-white text-sm">
                      {(scanResults.bodyRiskScore * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        scanResults.bodyRiskScore > 0.7
                          ? "bg-red-500"
                          : scanResults.bodyRiskScore > 0.3
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${scanResults.bodyRiskScore * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-white text-sm">
                      <FaPaperclip className="inline-block mr-2 text-white" />
                      Attachment
                    </p>
                    <p className="text-white text-sm">
                      {(scanResults.attachmentRiskScore * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        scanResults.attachmentRiskScore > 0.7
                          ? "bg-red-500"
                          : scanResults.attachmentRiskScore > 0.3
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${scanResults.attachmentRiskScore * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
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
                {scanResults.details.attachments.map((attachment, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm"
                  >
                    {attachment}
                  </span>
                ))}
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

        {/* Detailed content - only shown when not minimized */}
        {!minimized && (
          <>
            {/* Detailed Indicators, grouped by source */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  <FaEnvelope className="inline-block mr-2 text-purple-400" />{" "}
                  Body Threat Indicators
                </h4>
                <ul className="space-y-2">
                  {scanResults.details.bodyIndicators.map(
                    (indicator, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaExclamationTriangle className="text-red-400 mt-1" />
                        <span className="text-gray-300">{indicator}</span>
                      </li>
                    )
                  )}
                </ul>

                <h4 className="text-lg font-semibold text-white mb-3 mt-6">
                  <FaPaperclip className="inline-block mr-2 text-purple-400" />{" "}
                  Attachment Threat Indicators
                </h4>
                <ul className="space-y-2">
                  {scanResults.details.attachmentIndicators.map(
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
                  <FaInfoCircle className="inline-block mr-2 text-purple-400" />{" "}
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {scanResults.details.recommendations.map(
                    (recommendation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-400 mt-1" />
                        <span className="text-gray-300">{recommendation}</span>
                      </li>
                    )
                  )}
                </ul>

                {/* Admin-specific network indicators */}
                {isAdmin && (
                  <>
                    <h4 className="text-lg font-semibold text-white mb-3 mt-6">
                      <FaNetworkWired className="inline-block mr-2 text-purple-400" />{" "}
                      Network Indicators
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <FaVirus className="text-red-400 mt-1" />
                        <span className="text-gray-300">
                          Command & Control communication to 185.142.xx.xx
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaVirus className="text-red-400 mt-1" />
                        <span className="text-gray-300">
                          DNS requests for malicious-domain.xyz
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaVirus className="text-red-400 mt-1" />
                        <span className="text-gray-300">
                          Attempts to modify system registry
                        </span>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Model Details (Optional, for advanced users) */}
            {scanResults.classifierInfo && (
              <div className="mt-6 bg-black/20 p-4 rounded-lg border border-white/5">
                <h4 className="text-md font-semibold text-white mb-3">
                  <FaBrain className="inline-block mr-2 text-purple-400" />{" "}
                  Advanced ML Details
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Body Classifier</p>
                    <p className="text-white">
                      {scanResults.classifierInfo.bodyClassifier}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Attachment Classifier</p>
                    <p className="text-white">
                      {scanResults.classifierInfo.attachmentClassifier}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Malware Type Classifier</p>
                    <p className="text-white">
                      {scanResults.classifierInfo.malwareTypeClassifier}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Admin Actions */}
            {isAdmin && adminActions && (
              <div className="mt-8 bg-gray-900/50 p-5 rounded-xl border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-3">
                  <FaLock className="inline-block mr-2 text-purple-400" />
                  Admin Actions
                </h4>
                {adminActions}
              </div>
            )}
          </>
        )}

        {/* Expand button if minimized */}
        {minimized && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setMinimized(false)}
              className="text-purple-400 flex items-center gap-2 hover:underline"
            >
              <FaChevronDown />
              <span>Show full scan details</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanResultsDisplay;
