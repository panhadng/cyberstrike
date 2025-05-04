import Link from "next/link";
import { FaUserShield, FaUserCog } from "react-icons/fa";
import Logo from "./components/Logo";
import Layout from "./components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex items-center justify-center w-full h-full">
        <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-12 flex flex-col items-center gap-8 w-full max-w-md border border-white/10">
          <Logo size="lg" className="mb-4" />
          <p className="text-center text-gray-400 mb-8 text-lg">
            Next-gen malware detection prototype
          </p>
          <div className="flex flex-col gap-6 w-full">
            <Link href="/user" className="w-full group">
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xl font-semibold shadow-lg transition-all duration-300 transform group-hover:scale-[1.02] group-hover:shadow-blue-500/50 flex items-center justify-center gap-3">
                <FaUserShield className="text-2xl" />
                User Portal
              </button>
            </Link>
            <Link href="/admin" className="w-full group">
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white text-xl font-semibold shadow-lg transition-all duration-300 transform group-hover:scale-[1.02] group-hover:shadow-gray-500/50 flex items-center justify-center gap-3">
                <FaUserCog className="text-2xl" />
                Admin Portal
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
