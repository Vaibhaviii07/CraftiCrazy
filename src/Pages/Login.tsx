import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password });
    // 🔗 Hook up authentication logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
        <img
            src="/Logo.jpeg"
            alt="CraftiCrazy Logo"
            className="w-27 h-27 rounded-full object-cover shadow-md border border-amber-400"
        />
       <h1 className="mt-3 text-2xl font-bold text-amber-600 tracking-wide">
            Welcome Back
            </h1>
            <p className="text-base text-gray-600 mt-1">
            Please login to continue to <span className="font-semibold text-amber-700">Crafticrazy</span>
            </p>

        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                required
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-amber-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            <LogIn size={18} />
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-amber-600 font-semibold hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
