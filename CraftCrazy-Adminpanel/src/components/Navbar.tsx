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

interface AdminData {
  name: string;
  role: string;
  avatar: string;
}

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [admin, setAdmin] = useState<AdminData>({
    name: "Sanika",
    role: "Craft Manager",
    avatar: "http://localhost:5173/logo.png",
  });

  const [notifications, setNotifications] = useState<number>(2);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    // TODO: localStorage.clear(); navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 border-b border-[#2a0a4b] shadow-md backdrop-blur-lg">
      <div className="flex justify-between items-center px-4 sm:px-6 py-3">
        {/* 🔹 LEFT: Sidebar Toggle + Logo */}
        <div className="flex items-center gap-3">
          {/* Sidebar toggle (mobile) */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-[#2a0a4b] hover:bg-gray-100 transition-colors md:hidden"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <h1 className="hidden sm:block text-lg font-semibold bg-gradient-to-r from-[#845EF7] to-[#B197FC] bg-clip-text text-transparent">
            Crafti<span className="text-[#2a0a4b]">Crazy</span>
          </h1>
        </div>

        {/* 🔸 CENTER: Search (Desktop) */}
        <div className="hidden md:flex relative w-80">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search in dashboard..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-gray-100 text-black border border-[#2f1154] focus:ring-2 focus:ring-[#C45A36] focus:border-[#C45A36] outline-none transition-all"
          />
        </div>

        {/* 🔸 RIGHT: Icons + Profile */}
        <div className="flex items-center gap-4 sm:gap-5 relative" ref={dropdownRef}>
          {/* Mobile Search Icon */}
          <button
            className="md:hidden text-gray-600 hover:text-[#C45A36] transition-colors"
            onClick={() => setShowSearch(!showSearch)}
          >
            {showSearch ? <X size={20} /> : <Search size={20} />}
          </button>

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
          <div className="hidden sm:block cursor-pointer group">
            <Settings className="w-6 h-6 text-gray-500 group-hover:text-[#C45A36] transition-colors" />
          </div>

          {/* Profile Dropdown */}
          <div
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center gap-2 sm:gap-3 bg-white hover:bg-gray-200 border border-[#3d116b] rounded-full px-2 sm:px-3 py-1.5 cursor-pointer transition-all"
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
            <div className="absolute right-0 top-14 bg-white border border-gray-200 rounded-lg shadow-xl w-44 py-2 text-sm animate-fade-in">
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

      {/* 🔻 Mobile Search Dropdown */}
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
