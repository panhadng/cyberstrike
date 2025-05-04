import {
  FaCog,
  FaShieldAlt,
  FaBell,
  FaPlug,
  FaDatabase,
  FaCheck,
  FaTimes,
  FaSync,
} from "react-icons/fa";
import { systemSettingsData } from "@/app/data/dummyData";
import { useState } from "react";

const SystemSettings = () => {
  const { general, security, notifications, integrations, backups } =
    systemSettingsData;
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        System Settings
      </h2>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 mb-8 border-b border-white/10">
        <button
          className={`pb-3 px-4 font-medium transition-colors ${
            activeTab === "general"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("general")}
        >
          <div className="flex items-center gap-2">
            <FaCog />
            <span>General</span>
          </div>
        </button>
        <button
          className={`pb-3 px-4 font-medium transition-colors ${
            activeTab === "security"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("security")}
        >
          <div className="flex items-center gap-2">
            <FaShieldAlt />
            <span>Security</span>
          </div>
        </button>
        <button
          className={`pb-3 px-4 font-medium transition-colors ${
            activeTab === "notifications"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("notifications")}
        >
          <div className="flex items-center gap-2">
            <FaBell />
            <span>Notifications</span>
          </div>
        </button>
        <button
          className={`pb-3 px-4 font-medium transition-colors ${
            activeTab === "integrations"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("integrations")}
        >
          <div className="flex items-center gap-2">
            <FaPlug />
            <span>Integrations</span>
          </div>
        </button>
        <button
          className={`pb-3 px-4 font-medium transition-colors ${
            activeTab === "backups"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("backups")}
        >
          <div className="flex items-center gap-2">
            <FaDatabase />
            <span>Backups</span>
          </div>
        </button>
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="bg-black/30 rounded-2xl p-8 border border-white/10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                General Settings
              </h3>
              <p className="text-gray-400">Basic system configuration</p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">
                  System Name
                </label>
                <input
                  type="text"
                  defaultValue={general.systemName}
                  className="w-full bg-black/30 rounded-xl p-3 border border-white/10 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-2">
                  Version
                </label>
                <input
                  type="text"
                  defaultValue={general.version}
                  disabled
                  className="w-full bg-black/50 rounded-xl p-3 border border-white/10 text-gray-400 outline-none cursor-not-allowed"
                />
                <p className="text-gray-400 text-sm mt-1">
                  System version cannot be modified
                </p>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">
                  Environment
                </label>
                <select className="w-full bg-black/30 rounded-xl p-3 border border-white/10 text-white outline-none focus:border-blue-500">
                  <option value="development">Development</option>
                  <option value="staging">Staging</option>
                  <option
                    value="production"
                    selected={general.environment === "Production"}
                  >
                    Production
                  </option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-2">
                  Last Update
                </label>
                <input
                  type="text"
                  defaultValue={general.lastUpdate}
                  disabled
                  className="w-full bg-black/50 rounded-xl p-3 border border-white/10 text-gray-400 outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Settings */}
      {activeTab === "security" && (
        <div className="bg-black/30 rounded-2xl p-8 border border-white/10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Security Settings
              </h3>
              <p className="text-gray-400">
                Configure system security parameters
              </p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">
                  Failed Login Attempts
                </label>
                <select className="w-full bg-black/30 rounded-xl p-3 border border-white/10 text-white outline-none focus:border-blue-500">
                  <option value="3" selected={security.loginAttempts === "3"}>
                    3 attempts
                  </option>
                  <option value="5">5 attempts</option>
                  <option value="10">10 attempts</option>
                </select>
                <p className="text-gray-400 text-sm mt-1">
                  Before temporary account lockout
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-2">
                  Session Timeout
                </label>
                <select className="w-full bg-black/30 rounded-xl p-3 border border-white/10 text-white outline-none focus:border-blue-500">
                  <option value="15">15 minutes</option>
                  <option
                    value="30"
                    selected={security.sessionTimeout === "30 minutes"}
                  >
                    30 minutes
                  </option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">
                  Password Policy
                </label>
                <select className="w-full bg-black/30 rounded-xl p-3 border border-white/10 text-white outline-none focus:border-blue-500">
                  <option value="basic">Basic (8+ chars)</option>
                  <option value="medium">Medium (8+ chars, numbers)</option>
                  <option
                    value="strong"
                    selected={security.passwordPolicy.includes("Strong")}
                  >
                    Strong (8+ chars, special chars, numbers)
                  </option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-2">
                  Multi-Factor Authentication
                </label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mfa"
                      checked={security.mfaEnabled}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-0 focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-white">Enabled</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mfa"
                      checked={!security.mfaEnabled}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-0 focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-white">Disabled</span>
                  </label>
                </div>
                <p className="text-gray-400 text-sm mt-1">
                  Require 2FA for all users
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Settings */}
      {activeTab === "notifications" && (
        <div className="bg-black/30 rounded-2xl p-8 border border-white/10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Notification Settings
              </h3>
              <p className="text-gray-400">
                Configure how and when notifications are sent
              </p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Save Changes
            </button>
          </div>

          <div className="space-y-6">
            <div className="p-4 border border-white/10 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaBell className="text-yellow-400 text-xl" />
                  <div>
                    <h4 className="text-white font-medium">Email Alerts</h4>
                    <p className="text-gray-400">Receive alerts via email</p>
                  </div>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    defaultChecked={notifications.emailAlerts}
                    className="opacity-0 w-0 h-0"
                    id="email-toggle"
                  />
                  <label
                    htmlFor="email-toggle"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition ${
                      notifications.emailAlerts ? "bg-blue-600" : "bg-gray-700"
                    }`}
                  >
                    <span
                      className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications.emailAlerts
                          ? "translate-x-6"
                          : "translate-x-1"
                      } top-1`}
                    ></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-4 border border-white/10 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaBell className="text-blue-400 text-xl" />
                  <div>
                    <h4 className="text-white font-medium">Dashboard Alerts</h4>
                    <p className="text-gray-400">
                      Show notifications in dashboard
                    </p>
                  </div>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    defaultChecked={notifications.dashboardAlerts}
                    className="opacity-0 w-0 h-0"
                    id="dashboard-toggle"
                  />
                  <label
                    htmlFor="dashboard-toggle"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition ${
                      notifications.dashboardAlerts
                        ? "bg-blue-600"
                        : "bg-gray-700"
                    }`}
                  >
                    <span
                      className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications.dashboardAlerts
                          ? "translate-x-6"
                          : "translate-x-1"
                      } top-1`}
                    ></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-4 border border-white/10 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaSync className="text-green-400 text-xl" />
                  <div>
                    <h4 className="text-white font-medium">Activity Summary</h4>
                    <p className="text-gray-400">
                      Frequency of activity reports
                    </p>
                  </div>
                </div>
                <select className="bg-black/30 rounded-xl p-2 border border-white/10 text-white outline-none focus:border-blue-500">
                  <option value="never">Never</option>
                  <option
                    value="daily"
                    selected={notifications.activitySummary === "Daily"}
                  >
                    Daily
                  </option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integrations */}
      {activeTab === "integrations" && (
        <div className="bg-black/30 rounded-2xl p-8 border border-white/10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Integrations
              </h3>
              <p className="text-gray-400">
                Connect with external systems and services
              </p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Add Integration
            </button>
          </div>

          <div className="space-y-6">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="p-6 border border-white/10 rounded-xl"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl ${
                        integration.status === "Connected"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      <FaPlug className="text-xl" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">
                        {integration.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`${
                            integration.status === "Connected"
                              ? "text-green-400"
                              : "text-yellow-400"
                          }`}
                        >
                          {integration.status}
                        </span>
                        {integration.status === "Connected" && (
                          <>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-400">
                              Last synced: {integration.lastSynced}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {integration.status === "Connected" ? (
                      <>
                        <button className="px-3 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                          <FaSync />
                        </button>
                        <button className="px-3 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <button className="px-3 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors">
                        <FaCheck />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Backups */}
      {activeTab === "backups" && (
        <div className="bg-black/30 rounded-2xl p-8 border border-white/10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Backup Settings
              </h3>
              <p className="text-gray-400">
                Configure system backup parameters
              </p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-2">
              <FaSync className="text-sm" />
              Run Backup Now
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                <h4 className="text-white font-medium mb-6">Backup Schedule</h4>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">Frequency</label>
                  <select className="w-full bg-black/30 rounded-xl p-3 border border-white/10 text-white outline-none focus:border-blue-500">
                    <option value="hourly">Hourly</option>
                    <option
                      value="daily"
                      selected={backups.schedule === "Daily"}
                    >
                      Daily
                    </option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">
                    Retention Period
                  </label>
                  <select className="w-full bg-black/30 rounded-xl p-3 border border-white/10 text-white outline-none focus:border-blue-500">
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option
                      value="30"
                      selected={backups.retentionPeriod === "30 days"}
                    >
                      30 days
                    </option>
                    <option value="90">90 days</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                <h4 className="text-white font-medium mb-6">Backup Status</h4>
                <div className="bg-black/30 rounded-lg p-4 flex items-center gap-4 mb-4">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <FaCheck className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-white">
                      Last backup completed successfully
                    </p>
                    <p className="text-gray-400">{backups.lastBackup}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">
                    Storage Location
                  </label>
                  <input
                    type="text"
                    defaultValue={backups.storageLocation}
                    className="w-full bg-black/30 rounded-xl p-3 border border-white/10 text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemSettings;
