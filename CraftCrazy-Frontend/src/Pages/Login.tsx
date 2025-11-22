import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../AuthContext/AuthContext";

interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse & { message?: string } = await res.json();

      if (res.ok && data.token) {
        login(data.user, data.token);

        toast.success(`Welcome Back, ${data.user.name}!`, {
          position: "top-right",
          autoClose: 3000,
        });

        navigate("/");
      } else {
        toast.error(data.message || "Invalid Credentials", {
          position: "top-right",
          autoClose: 2000,
        });

        setError(data.message || "Invalid Credentials");
        return;
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      <ToastContainer />

      <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col items-center mb-5">
          <img
            src={"/Logo.jpeg"}
            alt="CraftiCrazy Logo"
            className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-amber-400"
          />
          <h1 className="mt-3 text-2xl font-bold text-amber-600">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Login to continue to <span className="font-semibold">CraftiCrazy</span>
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-5 space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 py-2 focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                required
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 py-2 focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-lg shadow-md ${loading ? "opacity-60" : ""
              }`}
          >
            <LogIn size={18} />
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-amber-600 font-semibold hover:underline">
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
