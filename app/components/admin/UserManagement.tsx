import {
  FaUsers,
  FaUser,
  FaUserPlus,
  FaUserCog,
  FaUserShield,
  FaHistory,
  FaEllipsisH,
} from "react-icons/fa";
import { userManagementData } from "@/app/data/dummyData";
import { useState } from "react";

const UserManagement = () => {
  const { users, roles, activityLog } = userManagementData;
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        User Management
      </h2>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 border-b border-white/10">
        <button
          className={`pb-3 px-4 font-medium transition-colors ${
            activeTab === "users"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("users")}
        >
          <div className="flex items-center gap-2">
            <FaUsers />
            <span>Users</span>
          </div>
        </button>
        <button
          className={`pb-3 px-4 font-medium transition-colors ${
            activeTab === "roles"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("roles")}
        >
          <div className="flex items-center gap-2">
            <FaUserShield />
            <span>Roles</span>
          </div>
        </button>
        <button
          className={`pb-3 px-4 font-medium transition-colors ${
            activeTab === "activity"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("activity")}
        >
          <div className="flex items-center gap-2">
            <FaHistory />
            <span>Activity Log</span>
          </div>
        </button>
      </div>

      {/* Users Tab */}
      {activeTab === "users" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="py-2 px-4 pr-10 bg-black/30 rounded-xl border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-blue-500 w-64"
              />
              <FaUser className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2">
              <FaUserPlus className="text-sm" />
              Add User
            </button>
          </div>

          <div className="bg-black/30 rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/50">
                  <tr className="text-left text-gray-400">
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Email</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Last Active</th>
                    <th className="py-4 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t border-white/5 text-white hover:bg-white/5"
                    >
                      <td className="py-4 px-6 font-medium">{user.name}</td>
                      <td className="py-4 px-6 text-gray-400">{user.email}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            user.role === "Administrator"
                              ? "bg-purple-500/20 text-purple-400"
                              : user.role === "Analyst"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            user.status === "Active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-400">
                        {user.lastActive}
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative group">
                          <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 transition-colors">
                            <FaEllipsisH />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-white/10 rounded-xl shadow-xl z-20 hidden group-hover:block">
                            <ul className="py-2">
                              <li className="px-4 py-2 hover:bg-white/10 text-white cursor-pointer flex items-center gap-2">
                                <FaUserCog className="text-blue-400" />
                                <span>Edit User</span>
                              </li>
                              <li className="px-4 py-2 hover:bg-white/10 text-white cursor-pointer flex items-center gap-2">
                                <FaUserShield className="text-purple-400" />
                                <span>Change Role</span>
                              </li>
                              <li className="px-4 py-2 hover:bg-white/10 text-red-400 cursor-pointer flex items-center gap-2">
                                <FaUser className="text-red-400" />
                                <span>Deactivate</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Roles Tab */}
      {activeTab === "roles" && (
        <div>
          <div className="flex justify-end mb-6">
            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2">
              <FaUserShield className="text-sm" />
              Add Role
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div
                key={role.id}
                className="bg-black/30 rounded-2xl p-6 border border-white/10"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-xl ${
                        role.name === "Administrator"
                          ? "bg-purple-500/20 text-purple-400"
                          : role.name === "Analyst"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      <FaUserShield className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">
                        {role.name}
                      </h4>
                      <p className="text-gray-400">{role.userCount} users</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 transition-colors">
                    <FaEllipsisH />
                  </button>
                </div>

                <div className="mt-6">
                  <h5 className="text-white font-medium mb-3">Permissions</h5>
                  <ul className="space-y-2">
                    {role.permissions.map((permission, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span className="text-gray-400">{permission}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex gap-2">
                  <button className="flex-1 px-3 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2">
                    <FaUserCog className="text-sm" />
                    <span>Edit Role</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Log Tab */}
      {activeTab === "activity" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-medium">Recent Activity</h3>
            <button className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium">
              Download Log
            </button>
          </div>

          <div className="bg-black/30 rounded-2xl p-6 border border-white/10 space-y-6">
            {activityLog.map((log) => (
              <div
                key={log.id}
                className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 text-blue-400 p-3 rounded-xl">
                    <FaHistory className="text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{log.action}</h4>
                    <p className="text-gray-400 mt-1">{log.details}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <span className="text-blue-400">{log.user}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-400">{log.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
