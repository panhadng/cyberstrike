import React, { useState } from "react";
import { FaUpload, FaEnvelopeOpenText } from "react-icons/fa";
import { FaMicroscope } from "react-icons/fa";
import ScanResultsDisplay, { ScanResults } from "../ScanResults";

// Interfaces no longer needed as they're imported from ScanResults component

const FileScanner = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scanResults, setScanResults] = useState<ScanResults | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [restrictToEml, setRestrictToEml] = useState(false);
  const [selectedOption, setSelectedOption] = useState("standard");
  const [addToDatabase, setAddToDatabase] = useState(true);

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
        // Admin-specific extended info
        adminInfo: {
          modelVersion: "Email Classifier v2.1.3",
          addedToDatabase: addToDatabase,
          threatSignatureId: addToDatabase ? "TS-2023-05-0892" : undefined,
          falsePositiveRisk: 0.07, // 7% chance this is a false positive
          processingTime: "125ms",
          similarSamples: 14,
        },
      });
      setIsScanning(false);
    }, 2000);
  };

  // Admin actions UI that will be passed to ScanResultsDisplay
  const adminActionsUI = (
    <div className="flex flex-wrap gap-3">
      <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
        Add to Blocklist
      </button>
      <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
        Create Signature
      </button>
      <button className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
        Add to Training Data
      </button>
      <button className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors">
        Mark as False Positive
      </button>
      <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
        Isolate Sample
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Admin File Scanner
        </h2>
      </div>

      {/* File Upload Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FaUpload className="text-2xl text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Upload File</h3>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-gray-400">Restrict to .eml files</label>
              <input
                type="checkbox"
                checked={restrictToEml}
                onChange={(e) => setRestrictToEml(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-400">Add to threat database</label>
              <input
                type="checkbox"
                checked={addToDatabase}
                onChange={(e) => setAddToDatabase(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
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
              id="admin-file-upload"
            />

            {/* Scan Options */}
            <div className="flex flex-wrap justify-center gap-4 mb-4 mt-2">
              <button
                onClick={() => setSelectedOption("standard")}
                className={`px-4 py-2 rounded-lg text-sm ${
                  selectedOption === "standard"
                    ? "bg-blue-500/30 text-blue-400 border border-blue-500/50"
                    : "bg-black/20 text-gray-400 border border-white/10 hover:bg-black/40"
                }`}
              >
                Standard Scan
              </button>
              <button
                onClick={() => setSelectedOption("deep")}
                className={`px-4 py-2 rounded-lg text-sm ${
                  selectedOption === "deep"
                    ? "bg-purple-500/30 text-purple-400 border border-purple-500/50"
                    : "bg-black/20 text-gray-400 border border-white/10 hover:bg-black/40"
                }`}
              >
                Deep Analysis
              </button>
              <button
                onClick={() => setSelectedOption("sandbox")}
                className={`px-4 py-2 rounded-lg text-sm ${
                  selectedOption === "sandbox"
                    ? "bg-green-500/30 text-green-400 border border-green-500/50"
                    : "bg-black/20 text-gray-400 border border-white/10 hover:bg-black/40"
                }`}
              >
                Sandbox Execution
              </button>
            </div>

            <div className="flex flex-row gap-4">
              <label
                htmlFor="admin-file-upload"
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

      {/* Scan Results - Using the new reusable component */}
      {scanResults && (
        <ScanResultsDisplay
          scanResults={scanResults}
          isAdmin={true}
          onExport={() => alert("Exporting report...")}
          adminActions={adminActionsUI}
        />
      )}
    </div>
  );
};

export default FileScanner;
