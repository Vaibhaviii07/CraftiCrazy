import { useState, useEffect, useRef } from "react";
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
  const [passwordMatch, setPasswordMatch] = useState(true);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      setPasswordMatch(
        e.target.name === "password"
          ? e.target.value === formData.confirmPassword
          : formData.password === e.target.value
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordMatch) {
      alert("Passwords do not match!");
      return;
    }
    console.log("SignUp Data:", formData);
    alert("Account created successfully!");
    setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm sm:max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-xl"
      >
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img
            src="/Logo.jpeg"
            alt="CraftiCrazy Logo"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-contain shadow-md border-2 border-amber-400"
          />
        </div>

        {/* Title */}
        <div className="text-center mb-5">
          <h1 className="text-xl sm:text-2xl font-bold text-amber-600 flex items-center justify-center gap-2">
            <UserPlus className="w-6 h-6 sm:w-7 sm:h-7" /> Sign Up
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Join <span className="font-semibold text-amber-700">CraftiCrazy</span> today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            ref={nameRef}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl text-sm sm:text-base focus:ring-2 ${
              passwordMatch ? "focus:ring-amber-500" : "focus:ring-red-500"
            } focus:outline-none`}
          />
          {!passwordMatch && (
            <p className="text-red-500 text-xs sm:text-sm">Passwords do not match!</p>
          )}

          <button
            type="submit"
            disabled={!passwordMatch}
            className={`w-full py-2 sm:py-3 bg-amber-600 text-white rounded-xl font-semibold shadow-md hover:bg-amber-700 transition text-sm sm:text-base ${
              !passwordMatch ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs sm:text-sm text-center text-gray-600 mt-5">
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
