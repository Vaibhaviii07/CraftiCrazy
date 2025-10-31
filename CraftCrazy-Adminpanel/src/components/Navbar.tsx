import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  Settings,
  LogOut,
} from "lucide-react";

interface AdminData {
  name: string;
  role: string;
  avatar: string;
}

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  // Default Static Data
  const [admin, setAdmin] = useState<AdminData>({
    name: "Vaibhavi Tingane",
    role: "Craft Manager",
    avatar: "https://i.pravatar.cc/40?img=8",
  });

  const [notifications, setNotifications] = useState<number>(2);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🟣 API Fetch (Commented for now — backend route not yet made)
  /*
  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const res = await fetch("/api/navbar");
        if (!res.ok) throw new Error("Failed to fetch navbar data");

        const data = await res.json();
        setAdmin({
          name: data.admin?.name || "Vaibhavi Tingane",
          role: data.admin?.role || "Craft Manager",
          avatar: data.admin?.avatar || "https://i.pravatar.cc/40?img=8",
        });
        setNotifications(data.notifications || 2);
      } catch (err) {
        console.warn("⚠️ Using default navbar data (no API found)");
      }
    };
    fetchNavbarData();
  }, []);
  */

  // 🟢 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    // Later: localStorage.clear(); navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 border-b border-[#2a0a4b] shadow-md">
      <div className="flex justify-between items-center px-5 py-3 text-black">
        
        {/* 🔹 Left Section (Sidebar Toggle Placeholder) */}
        <div className="flex items-center gap-3">
          {/* You can add a toggle button here later */}
        </div>

        {/* 🔹 Center Search */}
        <div className="hidden md:flex relative w-80">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search in dashboard..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-gray-100 text-black border border-[#2f1154] focus:ring-2 focus:ring-[#C45A36] focus:border-[#C45A36] outline-none transition-all"
          />
        </div>

        {/* 🔹 Right Section */}
        <div className="flex items-center gap-5 relative" ref={dropdownRef}>
          
          {/* Notifications */}
          <div className="relative cursor-pointer group">
            <Bell className="w-6 h-6 text-gray-500 group-hover:text-[#C45A36] transition-colors" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C45A36] text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                {notifications}
              </span>
            )}
          </div>

          {/* Settings */}
          <div className="cursor-pointer group">
            <Settings className="w-6 h-6 text-gray-500 group-hover:text-[#C45A36] transition-colors" />
          </div>

          {/* Profile Dropdown */}
          <div
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center gap-3 bg-white hover:bg-gray-200 border border-[#3d116b] rounded-full px-3 py-1.5 cursor-pointer transition-all"
          >
            <img
              src={admin.avatar}
              alt={admin.name}
              className="w-8 h-8 rounded-full border border-[#C45A36] object-cover"
            />
            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-sm font-medium text-black">
                {admin.name}
              </span>
              <span className="text-xs text-gray-500">{admin.role}</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 top-14 bg-white border border-gray-200 rounded-lg shadow-xl w-48 py-2 text-sm animate-fade-in">
              <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                <Settings className="w-4 h-4 mr-2" /> Settings
              </button>
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
    </header>
  );
};

export default Navbar;
