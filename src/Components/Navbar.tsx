import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  User,
  ShoppingCart,
  Gift,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useCart } from "../AuthContext/CartContext";
import { allProducts } from "../Data/AllProduct";


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

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Product[]>([]);

  // ✅ useCart hook
  const { cart } = useCart();

  // ✅ Delay opening/closing of submenu
  const handleMouseEnter = (idx: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdown(idx);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdown(null);
    }, 250);
  };

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

  const links: NavLink[] = [
    { name: "New & Best Sellers", href: "/NewArrivals" },
    {
      name: "Customized Hampers",
       href: "/hamper",
      submenu: [
        { name: "Birthday Hampers", href: "/BirthdayHamper" },
        { name: "Wedding Hampers", href: "/wedding" },
        { name: "Corporate Hampers", href: "/corporate" },
      ],
    },
    {
      name: "Photo Frames",
      href: "/frames",
      submenu: [
        { name: "Wooden Frames", href: "/wooden" },
        { name: "Glass Frames", href: "/glass" },
        { name: "Resin Photo Frames", href: "/resin" },
      ],
    },
    {
      name: "Accessories",
      href: "/accessories",
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
      href: "/resin",
      submenu: [
        { name: "Resin Jewelry", href: "/resinJwell" },
        { name: "Resin Keychains", href: "/resinKeychain" },
        { name: "Resin Wall Clocks", href: "/resinclock" },
        { name: "Resin Name Plates", href: "/resinNameplate" },
        { name: "Resin Photo Frames", href: "/resinframe" },
        { name: "Resin Coasters Set", href: "/resincoasters" },
        { name: "Resin Pooja Thale", href: "/resinthale"}
      ],
    },
    {
      name: "Festival",
      href: "/festival",
      submenu: [
        { name: "Diwali Hampers", href: "/diwali" },
        { name: "Christmas Specials", href: "/festival/christmas" },
        { name: "Holi Kits", href: "/festival/holi" },
        { name: "Rakhi", href: "/festival/rakhi" },
      ],
    },
    { name: "Customized", href: "/CustomerDemand" },
    { name: "About", href: "/AboutUs" },
    { name: "Contact", href: "/contactus" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#faf7f0] shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer relative">
  {/* Icon with sparkle */}
  <div className="relative flex items-center justify-center">
    <Gift className="w-8 h-8 text-[#432818]" />
    <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500 animate-ping" />
  </div>

  {/* Brand Name */}
  <span className="font-bold text-3xl text-[#432818] tracking-wide hover:text-[#7f5539] transition-colors">
    CraftiCrazy
  </span>
</Link>


        {/* Search Bar (Desktop Only) */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search for gifts..."
              className="w-full rounded-full py-2.5 pl-5 pr-14 
                        border border-gray-700 
                        text-[#432818] placeholder-gray-400
                        shadow-lg backdrop-blur-md
                        focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            />
            {result.length > 0 && (
              <div className="absolute mt-2 w-full bg-white shadow-lg rounded-xl max-h-60 overflow-y-auto z-50">
                {result.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.href}
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
            {/* Search Button */}
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#432818] 
                               rounded-full p-2 shadow-md transition">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/login"
            className="text-[#432818] hover:text-yellow-200 transition transform hover:scale-110"
          >
            <User size={22} />
          </Link>
          <Link
            to="/cart"
            className="text-[#432818] hover:text-yellow-200 transition relative transform hover:scale-110"
          >
            <ShoppingCart size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-yellow-400 text-black font-bold rounded-full px-1">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Cart + Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          {/* Cart Icon in Mobile */}
          <Link to="/cart" className="text-[#432818] hover:text-yellow-200 relative">
            <ShoppingCart size={26} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-yellow-400 text-black font-bold rounded-full px-1">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Hamburger Button */}
          <button
            className="text-[#432818]"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Desktop Nav */}
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

            {/* Dropdown */}
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

      {/* Mobile Nav */}
      {open && (
        <nav className="md:hidden bg-[#fbfaf8] px-6 py-4 space-y-4 shadow-md">
          {links.map((link, idx) => (
            <div key={idx}>
              <Link
                to={link.href ?? "#"}
                className="block py-2 text-[#432818] font-medium border-b border-gray-200"
                onClick={() => setOpen(false)} // close menu on click
              >
                {link.name}
              </Link>

              {/* Submenu for mobile */}
              {link.submenu && (
                <div className="pl-4 space-y-2">
                  {link.submenu.map((sublink, subIdx) => (
                    <Link
                      key={subIdx}
                      to={sublink.href}
                      className="block py-1 text-gray-700 hover:text-[#6b705c]"
                      onClick={() => setOpen(false)}
                    >
                      {sublink.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
