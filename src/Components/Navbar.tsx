import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  User,
  ShoppingCart,
  Gift,
  Sparkles,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useCart } from "../AuthContext/CartContext";
import { useAuth } from "../AuthContext/AuthContext";
import { allProducts } from "../Data/AllProduct";

// ----------------------
// Interface Definitions
// ----------------------
interface SubLink {
  name: string;
  href: string;
}

interface NavLink {
  name: string;
  href?: string;
  submenu?: SubLink[];
}

interface Product {
  name: string;
  href: string;
}

interface NavbarProps {
  setCartOpen: (open: boolean) => void;
}

// ----------------------
// Navbar Component
// ----------------------
const Navbar: React.FC<NavbarProps> = ({ setCartOpen }) => {
  // ---------- State ----------
  const [open, setOpen] = useState(false); // mobile menu toggle
  const [dropdown, setDropdown] = useState<number | null>(null); // desktop submenu
  const [mobileDropdown, setMobileDropdown] = useState<number | null>(null); // mobile submenu
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // hover delay for submenu
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Product[]>([]);
  const [userDropdown, setUserDropdown] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);

  // ---------- Hooks ----------
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // ---------- Fetch Logged-In User ----------
  useEffect(() => {
    // Decode or get user info from context
    if (user) {
      setUserData({ name: user.name, email: user.email });
    }
  }, [user]);

  // ---------- Logout Handler ----------
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove auth token
    setUserData(null); // clear state
    navigate("/login"); // redirect
  };

  // ---------- Search Handler ----------
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.trim() === "") {
      setResult([]);
      return;
    }

    const filtered = allProducts.filter((p) =>
      p.name.toLowerCase().includes(value)
    );
    setResult(filtered);
  };

  // ---------- Dropdown Hover Logic ----------
  const handleMouseEnter = (idx: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdown(idx);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdown(null), 250);
  };

  // ---------- Nav Links ----------
  const links: NavLink[] = [
    { name: "New & Best Sellers", href: "/newarrivals" },
    {
      name: "Customized Hampers",
      submenu: [
        { name: "Birthday Hampers", href: "/BirthdayHamper" },
        { name: "Wedding Hampers", href: "/wedding" },
        { name: "Corporate Hampers", href: "/corporate" },
      ],
    },
    {
      name: "Photo Frames",
      submenu: [
        { name: "Wooden Frames", href: "/wooden" },
        { name: "Glass Frames", href: "/glass" },
        { name: "Resin Photo Frames", href: "/resin" },
      ],
    },
    {
      name: "Accessories",
      submenu: [
        { name: "Women Accessories", href: "/womenAss" },
        { name: "Keychains", href: "/keychain" },
        { name: "Leather Wallet", href: "/wallet" },
        { name: "Handmade Bracelet", href: "/bracelet" },
        { name: "Stylish Tote Bag", href: "/tote" },
      ],
    },
    {
      name: "Resin Art",
      submenu: [
        { name: "Resin Jewelry", href: "/resinJwell" },
        { name: "Resin Keychains", href: "/resinKeychain" },
        { name: "Resin Wall Clocks", href: "/resinclock" },
        { name: "Resin Name Plates", href: "/resinNameplate" },
        { name: "Resin Photo Frames", href: "/resinframe" },
        { name: "Resin Coasters Set", href: "/resincoasters" },
        { name: "Resin Pooja Thale", href: "/resinthale" },
      ],
    },
    {
      name: "Wedding special",
      submenu: [
        { name: "Engagement Tray", href: "/Tray" },
        { name: "Haldi Platter", href: "/HaldiPlatter" },
        { name: "Varmala Preservation", href: "/varmala" },
      ],
    },
    {
      name: "Festival",
      submenu: [
        { name: "Diwali Hampers", href: "/diwali" },
        { name: "Christmas Specials", href: "/christmas" },
        { name: "Holi Kits", href: "/Holi" },
        { name: "Rakhi", href: "/rakhi" },
      ],
    },
    { name: "Customized", href: "/customerdemand" },
    { name: "About", href: "/aboutus" },
    { name: "Contact", href: "/contactus" },
  ];

  // ----------------------
  // JSX Return
  // ----------------------
  return (
    <header className="sticky top-0 z-50 bg-[#faf7f0] shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-4">
        {/* ------------------ Logo ------------------ */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer relative">
          <div className="relative flex items-center justify-center">
            <Gift className="w-8 h-8 text-[#432818]" />
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500 animate-ping" />
          </div>
          <span className="font-bold text-3xl text-[#432818] tracking-wide hover:text-[#7f5539] transition-colors">
            CraftiCrazy
          </span>
        </Link>

        {/* ------------------ Search ------------------ */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search for gifts..."
              className="w-full rounded-full py-2.5 pl-5 pr-14 border border-gray-700 text-[#432818] placeholder-gray-400 shadow-lg backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            />
            {result.length > 0 && (
              <div className="absolute mt-2 w-full bg-white shadow-lg rounded-xl max-h-60 overflow-y-auto z-50">
                {result.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.href}
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                    onClick={() => {
                      setQuery("");
                      setResult([]);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
            <button
              aria-label="Search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#432818] rounded-full p-2 shadow-md transition"
            >
              <Search className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>

        {/* ------------------ Desktop Icons ------------------ */}
        <div className="hidden md:flex items-center gap-6 relative">
          {/* ----- User Dropdown ----- */}
          {userData ? (
            <div className="relative">
              <button onClick={() => setUserDropdown(!userDropdown)}>
                <User size={22} className="text-[#432818] cursor-pointer" />
              </button>

              {userDropdown && (
                <div className="absolute right-0 mt-3 bg-white shadow-lg rounded-lg w-52 border">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold text-gray-800">{userData.name}</p>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login"  className="flex items-center gap-2 text-[#432818] hover:text-yellow-600 transition" aria-label="Login">
              <User size={16} /> <span>Login</span>
            </Link>
          )}

          {/* ----- Cart Icon ----- */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative"
            aria-label="Cart"
          >
            <ShoppingCart size={22} className="text-[#432818] hover:text-yellow-600 transition cursor-pointer" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-yellow-400 text-black font-bold rounded-full px-1">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* ------------------ Mobile Section ------------------ */}
        <div className="flex md:hidden items-center gap-4">
          <Link to="/login" aria-label="Login">
            <User size={26} className="text-[#432818]" />
          </Link>
          <button onClick={() => setCartOpen(true)} className="relative" aria-label="Cart">
            <ShoppingCart size={26} className="text-[#432818]" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-yellow-400 text-black font-bold rounded-full px-1">
                {cart.length}
              </span>
            )}
          </button>
          <button className="text-[#432818]" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ------------------ Desktop Nav Links ------------------ */}
      <nav className="hidden md:flex justify-center gap-8 text-[#432818] font-medium text-base py-3 bg-[#fbfaf8]">
        {links.map((link, idx) => (
          <div
            key={idx}
            className="relative group"
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to={link.href ?? "#"}
              className="flex items-center gap-1 relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
              {link.submenu && <ChevronDown size={16} />}
            </Link>
            {link.submenu && dropdown === idx && (
              <div className="absolute top-full left-0 bg-white/95 shadow-lg rounded-xl mt-2 py-3 w-56 z-50 border border-gray-100">
                {link.submenu.map((sublink, subIdx) => (
                  <Link
                    key={subIdx}
                    to={sublink.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-[#b7b7a4]/20 hover:text-[#6b705c] transition rounded-md"
                  >
                    {sublink.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* ------------------ Mobile Nav Links ------------------ */}
      {open && (
        <nav className="md:hidden bg-[#fbfaf8] px-6 py-4 shadow-md space-y-2">
          {links.map((link, idx) => (
            <div key={idx} className="flex flex-col">
              {link.submenu ? (
                <>
                  <button
                    onClick={() =>
                      setMobileDropdown(mobileDropdown === idx ? null : idx)
                    }
                    className="flex justify-between items-center w-full py-2 text-[#432818] font-medium border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <span>{link.name}</span>
                    <ChevronDown size={16} />
                  </button>
                  {mobileDropdown === idx && (
                    <div className="flex flex-col pl-4 mt-2 space-y-1">
                      {link.submenu.map((sublink, subIdx) => (
                        <Link
                          key={subIdx}
                          to={sublink.href}
                          className="py-1 text-gray-700 hover:text-[#6b705c] transition"
                          onClick={() => setOpen(false)}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={link.href ?? "#"}
                  className="py-2 text-[#432818] font-medium border-b border-gray-200 hover:bg-gray-50 transition"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
