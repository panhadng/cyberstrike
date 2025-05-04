import { useState } from "react";
import {
  TrendingUp,
  AlertTriangle,
  FileText,
  Search,
  Filter,
  Calendar,
  Download,
  ChevronDown,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart,
} from "lucide-react";
import { analysisData } from "@/app/data/dummyData";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { BarChart, PieChart } from "@/app/components/ui/charts";

// Interfaces for our data types
interface ThreatStats {
  totalThreats: number;
  phishingAttempts: number;
  malwareAttachments: number;
  suspiciousLinks: number;
}

interface ThreatDistribution {
  name: string;
  value: number;
}

interface Detection {
  id: number;
  fileName: string;
  fileType: string;
  fileSize: string;
  detectionTime: string;
  threatType: string;
  confidence: number;
  indicators: string[];
  detectedThreats: string[];
  riskLevel: string;
  timestamp: string;
  user: string;
  detectionMethod: string;
  sourceIP: string;
  threatIndicators: string[];
}

interface MonthlyTrends {
  months: string[];
  phishing: number[];
  malware: number[];
  suspiciousLinks: number[];
}

// Modular components for analytics visualizations
interface ThreatStatsCardsProps {
  threatStats: ThreatStats;
  activeTimeframe: string;
}

const ThreatStatsCards = ({
  threatStats,
  activeTimeframe,
}: ThreatStatsCardsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <CardTitle>Total Threats</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{threatStats.totalThreats}</div>
        <CardDescription className="text-sm mt-1">
          +12% from previous {activeTimeframe}
        </CardDescription>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <Search className="h-5 w-5 text-yellow-400" />
          </div>
          <CardTitle>Phishing</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{threatStats.phishingAttempts}</div>
        <CardDescription className="text-sm mt-1">
          +8% from previous {activeTimeframe}
        </CardDescription>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-500/10 rounded-lg">
            <FileText className="h-5 w-5 text-orange-400" />
          </div>
          <CardTitle>Malware</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {threatStats.malwareAttachments}
        </div>
        <CardDescription className="text-sm mt-1">
          +15% from previous {activeTimeframe}
        </CardDescription>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-400" />
          </div>
          <CardTitle>Suspicious Links</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{threatStats.suspiciousLinks}</div>
        <CardDescription className="text-sm mt-1">
          +5% from previous {activeTimeframe}
        </CardDescription>
      </CardContent>
    </Card>
  </div>
);

interface ThreatPieChartProps {
  threatDistribution: ThreatDistribution[];
}

const ThreatPieChart = ({ threatDistribution }: ThreatPieChartProps) => {
  const total = threatDistribution.reduce(
    (sum: number, item: ThreatDistribution) => sum + item.value,
    0
  );

  const pieChartData = threatDistribution.map((item: ThreatDistribution) => ({
    name: item.name,
    value: item.value,
  }));

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Threat Distribution</CardTitle>
        <Button variant="ghost" size="sm">
          <PieChartIcon className="h-4 w-4 mr-2" />
          Details
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center pb-6">
        <PieChart
          data={pieChartData}
          colors={["#eab308", "#f97316", "#3b82f6"]}
          size={240}
          centerLabel={
            <div className="text-center">
              <div className="text-white text-lg font-bold">{total}</div>
            </div>
          }
          renderLegend={true}
          legendPosition="right"
        />
      </CardContent>
    </Card>
  );
};

interface MonthlyTrendsChartProps {
  monthlyTrends: MonthlyTrends;
}

const MonthlyTrendsChart = ({ monthlyTrends }: MonthlyTrendsChartProps) => {
  // Get current month (0-based index)
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11 for Jan-Dec

  // Complete full year with placeholder zero values if needed
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Determine which months to display based on the data we have
  const availableMonths = monthlyTrends.months;

  // Create arrays for all months with zero values for missing months
  const fullYearPhishing = Array(12).fill(0);
  const fullYearMalware = Array(12).fill(0);
  const fullYearSuspiciousLinks = Array(12).fill(0);

  // Fill in the actual data
  availableMonths.forEach((month: string, index: number) => {
    const monthIndex = allMonths.indexOf(month);
    if (monthIndex !== -1) {
      fullYearPhishing[monthIndex] = monthlyTrends.phishing[index];
      fullYearMalware[monthIndex] = monthlyTrends.malware[index];
      fullYearSuspiciousLinks[monthIndex] =
        monthlyTrends.suspiciousLinks[index];
    }
  });

  // Prepare chart data
  // Map month names to abbreviated form for display
  const monthLabels = allMonths.map((month) => month.substring(0, 3));

  // Override with randomized data for all months
  const randomizedData = [
    // Phishing - more randomized pattern
    [18, 28, 35, 25, 42, 31, 22, 39, 33, 27, 24, 37],
    // Malware - different pattern
    [24, 19, 29, 33, 26, 39, 17, 27, 31, 23, 35, 22],
    // Suspicious Links - another pattern
    [15, 22, 19, 27, 33, 24, 29, 18, 25, 34, 21, 26],
  ];

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Yearly Trends</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="h-8 px-3 gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Bar</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-3 gap-1">
            <LineChart className="h-4 w-4" />
            <span>Line</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-3">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Date Range</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col pt-6 justify-end">
        <div className="h-[140px] mt-auto">
          <BarChart
            data={randomizedData}
            height={120}
            barWidth={14}
            spacing={0}
            barColors={["#eab308", "#f97316", "#3b82f6"]}
            labels={monthLabels}
            currentMonth={currentMonth}
            showTooltip={true}
          />
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 -mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
            <span className="text-gray-400 text-sm">Phishing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
            <span className="text-gray-400 text-sm">Malware</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <span className="text-gray-400 text-sm">Suspicious Links</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface RecentDetectionsProps {
  recentDetections: Detection[];
  expanded: string | null;
  setExpanded: (id: string | null) => void;
}

const RecentDetections = ({
  recentDetections,
  expanded,
  setExpanded,
}: RecentDetectionsProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-4">
      <CardTitle>Recent Detections</CardTitle>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search detections..."
            className="pl-9 pr-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
    </CardHeader>
    <CardContent className="p-0">
      <div className="divide-y divide-white/10">
        {recentDetections.map((detection, index) => (
          <div key={index} className="p-4">
            <div
              className="flex justify-between items-start cursor-pointer"
              onClick={() =>
                setExpanded(
                  expanded === `detection-${index}`
                    ? null
                    : `detection-${index}`
                )
              }
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-lg ${
                    detection.riskLevel === "High"
                      ? "bg-red-500/20"
                      : detection.riskLevel === "Medium"
                      ? "bg-yellow-500/20"
                      : "bg-green-500/20"
                  }`}
                >
                  <AlertTriangle
                    className={`h-5 w-5 ${
                      detection.riskLevel === "High"
                        ? "text-red-500"
                        : detection.riskLevel === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-medium">
                      {detection.fileName}
                    </h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        detection.riskLevel === "High"
                          ? "bg-red-500/20 text-red-400"
                          : detection.riskLevel === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {detection.riskLevel} Risk
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {detection.detectedThreats.join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-gray-400 text-sm">{detection.timestamp}</p>
                  <p className="text-gray-500 text-xs">{detection.user}</p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    expanded === `detection-${index}` ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {expanded === `detection-${index}` && (
              <div className="mt-4 pl-12 text-sm">
                <Card className="bg-black/50 border-white/5">
                  <CardContent className="p-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400">Detection Method:</p>
                      <p className="text-white">{detection.detectionMethod}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">File Type:</p>
                      <p className="text-white">{detection.fileType}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">File Size:</p>
                      <p className="text-white">{detection.fileSize}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Source IP:</p>
                      <p className="text-white">{detection.sourceIP}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-400 mb-1">Threat Indicators:</p>
                      <ul className="text-white list-disc list-inside space-y-1">
                        {detection.threatIndicators.map((indicator, i) => (
                          <li key={i}>{indicator}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter className="border-t border-white/10 py-3 px-6">
      <Button variant="outline" size="sm" className="ml-auto">
        View All Detections
      </Button>
    </CardFooter>
  </Card>
);

const Analytics = () => {
  const { threatStats, threatDistribution, recentDetections, monthlyTrends } =
    analysisData;

  const [activeTimeframe, setActiveTimeframe] = useState("month");
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Threat Analytics
        </h2>
        <div className="flex items-center gap-3">
          <Tabs
            defaultValue="month"
            className="w-auto"
            onValueChange={setActiveTimeframe}
          >
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button variant="outline" size="sm" className="h-10">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>

          <Button variant="outline" size="sm" className="h-10">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Threat Stats */}
      <ThreatStatsCards
        threatStats={threatStats}
        activeTimeframe={activeTimeframe}
      />

      {/* Charts - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Threat Distribution - Pie Chart */}
        <ThreatPieChart threatDistribution={threatDistribution} />

        {/* Trends Charts - Bar & Line */}
        <MonthlyTrendsChart monthlyTrends={monthlyTrends} />
      </div>

      {/* Recent Detections */}
      <RecentDetections
        recentDetections={recentDetections}
        expanded={expanded}
        setExpanded={setExpanded}
      />
    </div>
  );
};

export default Analytics;
