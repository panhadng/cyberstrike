"use client";
import {
  FaChartBar,
  FaRobot,
  FaChartLine,
  FaDatabase,
  FaUsers,
  FaCog,
} from "react-icons/fa";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
import { useState } from "react";

// Import Admin Components
import Dashboard from "../components/admin/Dashboard";
import MLEngineering from "../components/admin/MLEngineering";
import Analytics from "../components/admin/Analytics";
import DataManagement from "../components/admin/DataManagement";
import UserManagement from "../components/admin/UserManagement";
import SystemSettings from "../components/admin/SystemSettings";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  active?: boolean;
}

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const sidebarItems: SidebarItem[] = [
    {
      icon: <FaChartBar />,
      label: "Dashboard",
      value: "dashboard",
      active: activeTab === "dashboard",
    },
    {
      icon: <FaRobot />,
      label: "ML Engineering",
      value: "ml",
      active: activeTab === "ml",
    },
    {
      icon: <FaChartLine />,
      label: "Analytics",
      value: "analytics",
      active: activeTab === "analytics",
    },
    {
      icon: <FaDatabase />,
      label: "Data Management",
      value: "data",
      active: activeTab === "data",
    },
    {
      icon: <FaUsers />,
      label: "User Management",
      value: "users",
      active: activeTab === "users",
    },
    {
      icon: <FaCog />,
      label: "System Settings",
      value: "settings",
      active: activeTab === "settings",
    },
  ];

  return (
    <Layout>
      <div className="flex h-full w-full">
        {/* Sidebar */}
        <aside className="h-full w-72 bg-black/70 backdrop-blur-xl border-r border-white/10 flex flex-col items-center py-8 z-20">
          <div className="mb-10">
            <Logo size="sm" />
          </div>
          <div className="flex flex-col gap-2 w-full px-4">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(item.value)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all w-full text-left cursor-pointer
                  ${
                    item.active
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10 min-h-full">
            {/* Dynamic content based on active tab */}
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "ml" && <MLEngineering />}
            {activeTab === "analytics" && <Analytics />}
            {activeTab === "data" && <DataManagement />}
            {activeTab === "users" && <UserManagement />}
            {activeTab === "settings" && <SystemSettings />}
          </div>
        </div>
      </div>
    </Layout>
  );
}
