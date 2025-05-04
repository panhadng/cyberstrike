import {
  FaDatabase,
  FaFileAlt,
  FaTrash,
  FaDownload,
  FaEye,
  FaUpload,
  FaServer,
} from "react-icons/fa";
import { dataManagementData } from "@/app/data/dummyData";

const DataManagement = () => {
  const { uploadedFiles, datasets, storage } = dataManagementData;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Data Management
      </h2>

      {/* Storage Overview */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <FaServer className="text-2xl text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Storage Overview</h3>
        </div>
        <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <p className="text-white text-lg font-medium">Used Storage</p>
              <p className="text-3xl font-bold text-white">
                {storage.used}{" "}
                <span className="text-gray-400 text-lg">
                  of {storage.total}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2">
                <FaUpload className="text-sm" />
                Upload Files
              </button>
            </div>
          </div>

          {/* Storage Progress Bar */}
          <div className="mb-2">
            <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{
                  width: `${
                    (parseFloat(storage.used) / parseFloat(storage.total)) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            {storage.available} available
          </div>
        </div>
      </div>

      {/* Uploaded Files */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FaFileAlt className="text-2xl text-purple-400" />
            <h3 className="text-xl font-semibold text-white">Uploaded Files</h3>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search files..."
              className="py-2 px-4 pr-10 bg-black/30 rounded-xl border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
            />
            <FaEye
              className="text-gray-400 absolute right-3 top-1/2 -translate
            -y-1/2"
            />
          </div>
        </div>

        <div className="bg-black/30 rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/50">
                <tr className="text-left text-gray-400">
                  <th className="py-4 px-6">File Name</th>
                  <th className="py-4 px-6">Size</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Upload Date</th>
                  <th className="py-4 px-6">Owner</th>
                  <th className="py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadedFiles.map((file) => (
                  <tr
                    key={file.id}
                    className="border-t border-white/5 text-white hover:bg-white/5"
                  >
                    <td className="py-4 px-6 flex items-center gap-3">
                      <FaFileAlt className="text-blue-400" />
                      {file.fileName}
                    </td>
                    <td className="py-4 px-6 text-gray-400">{file.fileSize}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          file.status === "Clean"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {file.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-400">
                      {file.uploadDate}
                    </td>
                    <td className="py-4 px-6 text-gray-400">{file.owner}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <button className="p-2 rounded-lg hover:bg-white/10 text-blue-400 transition-colors">
                          <FaEye />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white/10 text-green-400 transition-colors">
                          <FaDownload />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white/10 text-red-400 transition-colors">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-black/50 py-3 px-6 flex justify-between items-center">
            <div className="text-gray-400">
              Showing {uploadedFiles.length} of {uploadedFiles.length} files
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Datasets */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FaDatabase className="text-2xl text-green-400" />
            <h3 className="text-xl font-semibold text-white">Datasets</h3>
          </div>
          <button className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-2">
            <FaUpload className="text-sm" />
            New Dataset
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {datasets.map((dataset) => (
            <div
              key={dataset.id}
              className="bg-black/30 rounded-2xl p-6 border border-white/10"
            >
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-medium text-white">
                  {dataset.name}
                </h4>
                <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                  {dataset.status}
                </span>
              </div>
              <p className="text-gray-400 mt-2">Type: {dataset.type}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-white">
                  <span className="text-2xl font-bold">
                    {dataset.samples.toLocaleString()}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">samples</span>
                </p>
                <p className="text-gray-400">Updated: {dataset.lastUpdated}</p>
              </div>
              <div className="mt-6 flex gap-2">
                <button className="flex-1 px-3 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                  View Details
                </button>
                <button className="px-3 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataManagement;
