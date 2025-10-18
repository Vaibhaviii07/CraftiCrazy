import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  onClose: () => void;
};

const LoginPromptModal = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-orange-100 text-orange-600 flex items-center justify-center rounded-full text-2xl shadow">
            🎁
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-gray-800 text-center">
          Welcome to <span className="text-orange-500">CraftiCrazy</span>
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-center mt-2 text-sm">
          Please login or sign up to continue exploring personalized gifts & hampers.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Link
            to="/login"
            onClick={onClose}  
            className="px-5 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={onClose}  
            className="px-5 py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition"
          >
            Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPromptModal;
