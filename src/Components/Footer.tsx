import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" text-black py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">

        {/* About */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-[#432818]">CraftiCrazy</h3>
          <p className="text-gray-900 italic leading-relaxed">
            Handcrafted gifts that celebrate your moments. Elegance, thoughtfulness, and uniqueness in every creation.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#432818]">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-yellow-400 transition-colors duration-300">Home</a>
            </li>
            <li>
              <a href="/AboutUs" className="hover:text-yellow-400 transition-colors duration-300">About Us</a>
            </li>
            <li>
              <a href="/collections" className="hover:text-yellow-400 transition-colors duration-300">Gift Collections</a>
            </li>
            <li>
              <a href="/contactus" className="hover:text-yellow-400 transition-colors duration-300">Contact</a>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#432818]">Connect With Us</h3>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/crafticrazy_710" className="hover:text-pink-400 transition-colors duration-300">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-300">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-sky-400 transition-colors duration-300">
              <Twitter size={24} />
            </a>
          </div>
          <p className="flex items-center gap-2 text-black">
            <Mail size={18} /> crafticrazy@gmail.com
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-[#432818] text-sm">
        &copy; {new Date().getFullYear()} CraftiCrazy. Crafted with ❤️ and creativity.
      </div>
    </footer>
  );
};

export default Footer;
