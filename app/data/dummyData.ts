// =============================================================================
// DASHBOARD DATA
// =============================================================================
export const dashboardData = {
  stats: {
    totalFiles: 1234,
    totalFilesChange: "+12% from last month",
    cleanFiles: 1123,
    cleanRate: "91% clean rate",
    modelAccuracy: 98.5,
    modelAccuracyChange: "+0.5% from last week",
  },
  recentActivity: [
    {
      id: 1,
      type: "fileUpload",
      fileName: "example.eml",
      timestamp: "2 hours ago",
      status: "Clean",
    },
    {
      id: 2,
      type: "modelUpdate",
      modelName: "Email Classifier v2.1",
      timestamp: "6 hours ago",
      performance: "+1.2% accuracy",
    },
    {
      id: 3,
      type: "fileUpload",
      fileName: "invoice.eml",
      timestamp: "1 day ago",
      status: "Malicious",
    },
    {
      id: 4,
      type: "systemAlert",
      alertTitle: "Unusual traffic detected",
      timestamp: "2 days ago",
      severity: "Medium",
    },
  ],
};

// =============================================================================
// ML ENGINEERING DATA
// =============================================================================
export const mlEngineeringData = {
  models: [
    {
      id: 1,
      name: "Email Body Classifier",
      type: "binary",
      description: "Detects malware in email content",
      status: "Active",
      accuracy: 98.5,
      precision: 97.8,
      recall: 96.4,
      f1Score: 97.1,
      falsePositives: 2.2,
      falseNegatives: 3.6,
      lastTrained: "2 days ago",
      inputFeatures: ["Header analysis", "Body content", "Link analysis", "Sender reputation", "Language patterns"],
      technology: "TF-IDF + Logistic Regression",
      trainingData: {
        totalSamples: 15400,
        maliciousSamples: 5900,
        cleanSamples: 9500,
        lastUpdated: "2 days ago"
      },
      config: {
        learningRate: 0.01,
        maxIterations: 1000,
        regularization: "L2",
        regularizationStrength: 0.1,
        trainTestSplit: 0.2,
        crossValidation: true,
        kFolds: 5,
        featureSelection: ["TF-IDF", "N-grams", "Custom patterns"]
      }
    },
    {
      id: 2,
      name: "Attachment Classifier",
      type: "binary",
      description: "Detects malware in email attachments",
      status: "Active",
      accuracy: 97.2,
      precision: 98.5,
      recall: 93.8,
      f1Score: 96.1,
      falsePositives: 1.5,
      falseNegatives: 6.2,
      lastTrained: "5 days ago",
      inputFeatures: ["File signature", "Content heuristics", "Behavior analysis", "Entropy analysis", "Header structure"],
      technology: "XGBoost",
      trainingData: {
        totalSamples: 12800,
        maliciousSamples: 4900,
        cleanSamples: 7900,
        lastUpdated: "5 days ago"
      },
      config: {
        learningRate: 0.1,
        numEstimators: 300,
        maxDepth: 6,
        subsample: 0.8,
        colsampleByTree: 0.8,
        trainTestSplit: 0.25,
        crossValidation: true,
        kFolds: 3,
        featureSelection: ["Content signatures", "Structural patterns", "Statistical measures"]
      }
    },
    {
      id: 3,
      name: "Malware Type Classifier",
      type: "multi-class",
      description: "Classifies detected threats by type",
      status: "In Development",
      accuracy: 94.8,
      precision: 92.3,
      recall: 91.5,
      f1Score: 91.9,
      falsePositives: 7.7,
      falseNegatives: 8.5,
      lastTrained: "1 week ago",
      inputFeatures: ["Threat patterns", "Behavior signatures", "Content analysis", "Distribution patterns"],
      technology: "Random Forest",
      trainingData: {
        totalSamples: 9800,
        classDistribution: {
          "Phishing": 3200,
          "Trojan": 2100,
          "Ransomware": 1500,
          "Spyware": 1800,
          "Other": 1200
        },
        lastUpdated: "1 week ago"
      },
      config: {
        numEstimators: 500,
        maxDepth: 10,
        minSamplesLeaf: 2,
        minSamplesSplit: 5,
        trainTestSplit: 0.3,
        crossValidation: false,
        kFolds: 0,
        featureSelection: ["Behavior analysis", "Content patterns", "Distribution vectors"]
      }
    }
  ],
  systemPerformance: {
    accuracy: 96.8,
    precision: 96.2,
    recall: 93.9,
    f1Score: 95.0,
    falsePositives: 3.8,
    falseNegatives: 6.1,
    lastEvaluated: "1 day ago",
    evaluationSet: "Production validation dataset (n=5000)"
  },
  recentTraining: [
    {
      modelId: 1,
      event: "Model Retrained",
      timestamp: "2 days ago",
      performance: "+0.5% accuracy",
      details: "Added 500 new samples to training data"
    },
    {
      modelId: 2,
      event: "Hyperparameter Tuning",
      timestamp: "5 days ago",
      performance: "+1.2% precision",
      details: "Optimized max_depth and learning_rate"
    },
    {
      modelId: 3,
      event: "Feature Selection Update",
      timestamp: "1 week ago",
      performance: "+0.8% F1 score",
      details: "Added new behavior analysis features"
    }
  ]
};

// =============================================================================
// ANALYSIS DATA
// =============================================================================
export const analysisData = {
  threatStats: {
    totalThreats: 111,
    phishingAttempts: 48,
    malwareAttachments: 37,
    suspiciousLinks: 26,
  },
  threatDistribution: [
    { name: "Phishing", value: 43 },
    { name: "Malware", value: 33 },
    { name: "Suspicious Links", value: 24 },
  ],
  recentDetections: [
    {
      id: 1,
      fileName: "invoice.eml",
      detectionTime: "2 hours ago",
      threatType: "Phishing",
      confidence: 98.2,
      indicators: ["Suspicious sender", "Urgent language", "Credential request"],
    },
    {
      id: 2,
      fileName: "report.docx",
      detectionTime: "5 hours ago",
      threatType: "Malware",
      confidence: 99.5,
      indicators: ["Embedded macros", "Known signature", "Suspicious behavior"],
    },
    {
      id: 3,
      fileName: "notification.eml",
      detectionTime: "1 day ago",
      threatType: "Suspicious Links",
      confidence: 94.8,
      indicators: ["Mismatched URL text", "Recently registered domain", "Abnormal path"],
    },
  ],
  monthlyTrends: {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    phishing: [12, 19, 15, 23, 28, 48],
    malware: [8, 12, 15, 19, 22, 37],
    suspiciousLinks: [5, 8, 12, 15, 18, 26],
  },
};

// =============================================================================
// DATA MANAGEMENT
// =============================================================================
export const dataManagementData = {
  uploadedFiles: [
    {
      id: 1,
      fileName: "invoice.eml",
      fileSize: "45 KB",
      uploadDate: "2 hours ago",
      status: "Malicious",
      riskScore: 0.85,
      owner: "user@example.com",
    },
    {
      id: 2,
      fileName: "report.pdf",
      fileSize: "1.2 MB",
      uploadDate: "5 hours ago",
      status: "Clean",
      riskScore: 0.12,
      owner: "user@example.com",
    },
    {
      id: 3,
      fileName: "contract.eml",
      fileSize: "78 KB",
      uploadDate: "1 day ago",
      status: "Clean",
      riskScore: 0.08,
      owner: "admin@example.com",
    },
    {
      id: 4,
      fileName: "presentation.pptx",
      fileSize: "3.4 MB",
      uploadDate: "2 days ago",
      status: "Malicious",
      riskScore: 0.92,
      owner: "user@example.com",
    },
    {
      id: 5,
      fileName: "meeting_notes.eml",
      fileSize: "56 KB",
      uploadDate: "3 days ago",
      status: "Clean",
      riskScore: 0.15,
      owner: "admin@example.com",
    },
  ],
  datasets: [
    {
      id: 1,
      name: "Email Training Set v2",
      type: "Training Data",
      samples: 15000,
      lastUpdated: "1 week ago",
      status: "Active",
    },
    {
      id: 2,
      name: "Phishing Examples",
      type: "Training Data",
      samples: 5000,
      lastUpdated: "2 weeks ago",
      status: "Active",
    },
    {
      id: 3,
      name: "Validation Set",
      type: "Validation Data",
      samples: 2500,
      lastUpdated: "1 week ago",
      status: "Active",
    },
  ],
  storage: {
    total: "10 GB",
    used: "3.2 GB",
    available: "6.8 GB",
  },
};

// =============================================================================
// USER MANAGEMENT
// =============================================================================
export const userManagementData = {
  users: [
    {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      role: "Administrator",
      lastActive: "1 hour ago",
      status: "Active",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      role: "Analyst",
      lastActive: "3 hours ago",
      status: "Active",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      lastActive: "1 day ago",
      status: "Active",
    },
    {
      id: 4,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "User",
      lastActive: "3 days ago",
      status: "Inactive",
    },
  ],
  roles: [
    {
      id: 1,
      name: "Administrator",
      permissions: ["Full Access", "User Management", "System Configuration"],
      userCount: 1,
    },
    {
      id: 2,
      name: "Analyst",
      permissions: ["View Dashboard", "Run Analysis", "View Reports"],
      userCount: 1,
    },
    {
      id: 3,
      name: "User",
      permissions: ["Upload Files", "View Results", "View Reports"],
      userCount: 2,
    },
  ],
  activityLog: [
    {
      id: 1,
      user: "admin@example.com",
      action: "User Creation",
      details: "Created user jane@example.com",
      timestamp: "2 days ago",
    },
    {
      id: 2,
      user: "john@example.com",
      action: "File Upload",
      details: "Uploaded invoice.eml",
      timestamp: "1 day ago",
    },
    {
      id: 3,
      user: "admin@example.com",
      action: "Role Modification",
      details: "Updated Analyst role permissions",
      timestamp: "5 hours ago",
    },
  ],
};

// =============================================================================
// SYSTEM SETTINGS
// =============================================================================
export const systemSettingsData = {
  general: {
    systemName: "CyberStrike",
    version: "1.0.0",
    lastUpdate: "2 weeks ago",
    environment: "Production",
  },
  security: {
    loginAttempts: "3",
    sessionTimeout: "30 minutes",
    passwordPolicy: "Strong (8+ chars, special chars, numbers)",
    mfaEnabled: true,
  },
  notifications: {
    emailAlerts: true,
    dashboardAlerts: true,
    activitySummary: "Daily",
  },
  integrations: [
    {
      id: 1,
      name: "Email Gateway",
      status: "Connected",
      lastSynced: "1 hour ago",
    },
    {
      id: 2,
      name: "SIEM System",
      status: "Pending",
      lastSynced: "Never",
    },
    {
      id: 3,
      name: "Threat Intelligence",
      status: "Connected",
      lastSynced: "12 hours ago",
    },
  ],
  backups: {
    schedule: "Daily",
    lastBackup: "12 hours ago",
    storageLocation: "Secure Cloud Storage",
    retentionPeriod: "30 days",
  },
};

// =============================================================================
// USER PORTAL DATA
// =============================================================================
export const userPortalData = {
  fileHistory: [
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
  ],
  scanResults: {
    fileName: "invoice.eml",
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
        "Malicious link detected"
      ],
      attachmentIndicators: [
        "Contains macro script",
        "High entropy (possible obfuscation)",
        "MIME type mismatch"
      ],
      recommendations: [
        "Do not open the attachment",
        "Delete the email",
        "Report to your IT department",
        "Update your email security settings"
      ]
    },
    classifierInfo: {
      bodyClassifier: "TF-IDF + Logistic Regression",
      attachmentClassifier: "Metadata + XGBoost",
      malwareTypeClassifier: "XGBoost (Multi-class)"
    }
  }
}; 