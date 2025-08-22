import { useState, useEffect } from "react";
import { Menu, X, Gift, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id) => {
    setActive(id);
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { id: "#home", label: "Home" },
    { id: "#about", label: "About Us" },
    { id: "#categories", label: "Categories" },
    { id: "#custom", label: "Custom Orders" },
    { id: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4 lg:p-4 ">
       
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="relative ml-2">
            <Gift className="w-10 h-10 text-pink-500 animate-bounce" />
            <Sparkles className="absolute -top-2 -right-2 w-4 h-7 text-yellow-600 animate-pulse" />
          </div>
          <span className="font-extrabold text-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
            CraftiCrazy
          </span>
        </div>

        <div className="hidden md:flex space-x-9 text-gray-700 font-poppins tracking-wide text-[17px] mr-6">
  {navLinks.map((link) => (
    <a
      key={link.id}
      href={link.id}
      onClick={() => handleClick(link.id)}
      className={`transition-all relative ${
        active === link.id
          ? "text-pink-500 border-b-2 border-pink-500 pb-1 font-semibold"
          : "hover:text-pink-500 font-medium"
      }`}
    >
      {link.label}
      <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-pink-500 scale-x-0 transition-transform origin-left hover:scale-x-100"></span>
    </a>
  ))}
</div>


        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 space-y-4 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.id}
              onClick={() => handleClick(link.id)}
              className={`block transition cursor-pointer ${
                active === link.id
                  ? "text-pink-500 font-semibold"
                  : "hover:text-pink-500"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
