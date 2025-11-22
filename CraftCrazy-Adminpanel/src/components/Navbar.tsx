import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface AdminData {
  name: string;
  role: string;
  avatar: string;
}

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [notifications, setNotifications] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🟢 Fetch admin profile dynamically (from Settings backend)
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/profile");
        setAdmin(res.data); // expecting { name, role, avatar }
      } catch (err) {
        console.error("❌ Error fetching admin profile:", err);
        // fallback default if API fails
        setAdmin({
          name: "Admin User",
          role: "Dashboard Manager",
          avatar: "http://localhost:5173/logo.png",
        });
      }
    };
    fetchAdmin();
  }, []);

  // 🔔 Fetch notifications dynamically
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notifications");
        if (Array.isArray(res.data)) setNotifications(res.data.length);
        else if (res.data.count) setNotifications(res.data.count);
        else setNotifications(0);
      } catch (err) {
        console.error("❌ Error fetching notifications:", err);
        setNotifications(0);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // auto-refresh every 1 min
    return () => clearInterval(interval);
  }, []);

  // 🟣 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 border-b border-[#2a0a4b] shadow-md backdrop-blur-lg">
      <div className="flex justify-between items-center px-4 sm:px-6 py-3">
        {/* LEFT: Sidebar Toggle + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-[#2a0a4b] hover:bg-gray-100 transition-colors md:hidden"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* CENTER: Search */}
        <div className="hidden md:flex relative w-80">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search in dashboard..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-gray-100 text-black border border-[#2f1154] focus:ring-2 focus:ring-[#C45A36] focus:border-[#C45A36] outline-none transition-all"
          />
        </div>

        {/* RIGHT: Icons + Profile */}
        <div className="flex items-center gap-4 sm:gap-5 relative" ref={dropdownRef}>
          {/* Mobile Search */}
          <button
            className="md:hidden text-gray-600 hover:text-[#C45A36] transition-colors"
            onClick={() => setShowSearch(!showSearch)}
          >
            {showSearch ? <X size={20} /> : <Search size={20} />}
          </button>

          {/* Notifications Icon */}
          <Link to="/notification" className="relative cursor-pointer group">
            <Bell
              className={`w-6 h-6 ${
                loading ? "text-gray-300" : "text-gray-500"
              } group-hover:text-[#C45A36] transition-colors`}
            />
            {!loading && notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C45A36] text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm animate-pulse">
                {notifications}
              </span>
            )}
          </Link>
          {/* Profile Dropdown */}
          <div
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center gap-2 sm:gap-3 bg-white hover:bg-gray-200 border border-[#3d116b] rounded-full px-2 sm:px-3 py-1.5 cursor-pointer transition-all"
          >
            <img
              src={admin?.avatar || "http://localhost:5173/logo.png"}
              alt={admin?.name || "Admin"}
              className="w-8 h-8 rounded-full border border-[#C45A36] object-cover"
            />
            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-sm font-medium text-black">
                {admin?.name || "Loading..."}
              </span>
              <span className="text-xs text-gray-500">
                {admin?.role || "Admin"}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 top-14 bg-white border border-gray-200 rounded-lg shadow-xl w-44 py-2 text-sm animate-fade-in">
              <Link
                to="/setting"
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <Settings className="w-4 h-4 mr-2" /> Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      {showSearch && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-gray-100 text-black border border-[#2f1154] focus:ring-2 focus:ring-[#C45A36] focus:border-[#C45A36] outline-none transition-all"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
