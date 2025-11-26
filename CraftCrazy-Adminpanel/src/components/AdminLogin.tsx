import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const storedHash = "$2a$12$ITgJgABE20Kq6WO/017eK.JYAwKiTytbcNBICCuOZeSW/yA8BlvJ2";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isMatch = await bcrypt.compare(password, storedHash);

    if (isMatch) {
      login();
      navigate("/dashboard", { replace: true });
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-50 flex items-center justify-center">
      <div className="backdrop-blur-lg bg-white/40 shadow-2xl rounded-3xl p-10 w-[380px] border border-white/30">
        
        {/* Brand */}
        <h1 className="text-3xl font-semibold text-gray-900 tracking-wide mb-2 text-center">
          Crafti<span className="text-[#6b1bf3] font-bold">Crazy</span>
        </h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Secure Admin Access
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="password"
            placeholder="Enter Admin Password"
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-[#6b1bf3] outline-none transition shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#6b1bf3] hover:bg-[#4a0ccf] transition-all text-white py-3 rounded-xl font-semibold shadow-md"
          >
            Log In
          </button>
        </form>

        <p className="text-[11px] text-gray-500 text-center mt-6">
          © {new Date().getFullYear()} CraftiCrazy Admin • All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
