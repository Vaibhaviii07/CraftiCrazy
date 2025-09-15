import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SignUp Data:", formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center  px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/Logo.jpeg" 
            alt="CraftiCrazy Logo"
            className="w-27 h-27 rounded-full object-contain shadow-md"
          />
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-amber-600 flex items-center justify-center gap-2">
            <UserPlus className="w-7 h-7" /> Sign Up
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Join <span className="font-semibold text-amber-700">CraftiCrazy</span> today 
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-amber-600 text-white rounded-xl font-semibold shadow-md hover:bg-amber-700 transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-amber-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
