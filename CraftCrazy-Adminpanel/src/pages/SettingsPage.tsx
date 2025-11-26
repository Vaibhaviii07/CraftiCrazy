import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Key,
  Save,
  X,
  Eye,
  EyeOff,
  Upload,
  CreditCard,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const SettingsPage: React.FC = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "Sanika",
    email: "sanika@crafticrazy.com",
    phone: "+91 9876543210",
    role: "Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=crafticrazy",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [payment, setPayment] = useState({
    upi: "sanika@upi",
    razorpay: "rzp_live_12345",
    stripe: "acct_67890",
    bank: "State Bank of India - 123456789",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile({ ...profile, avatar: url });
      toast.success("✅ Profile image updated!");
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    toast.success("✅ Profile updated successfully!");
  };

  const handlePasswordChange = async () => {
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("⚠️ Please fill all password fields!");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("❌ Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/admin/change-password", passwordData);
      toast.success("✅ Password changed successfully!");
      setShowPasswordModal(false);
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      toast.error("❌ Error updating password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="p-6 sm:p-10 bg-gradient-to-br from-[#faf7ff] via-[#fff8f5] to-[#f7f1ff] min-h-screen text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* HEADER */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-semibold text-[#2a0a4b] tracking-tight">
          ⚙️ Settings Overview
        </h1>
        <button
          onClick={handleSave}
          className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-2.5 bg-[#C45A36] text-white rounded-xl hover:bg-[#a34929] transition-all shadow-md hover:shadow-lg"
        >
          <Save className="w-4 h-4" /> Save All Changes
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* PROFILE SECTION */}
        <motion.section
          className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-lg border border-gray-200 p-6 transition-all hover:shadow-xl"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-[#2a0a4b]">
            <User className="w-5 h-5 text-[#C45A36]" /> Profile Information
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="relative group">
              <img
                src={profile.avatar}
                alt="Avatar"
                className="w-28 h-28 rounded-full object-cover border-2 border-[#C45A36] shadow-md"
              />
              <label className="absolute bottom-0 right-0 bg-[#C45A36] p-2 rounded-full cursor-pointer hover:bg-[#a34929] transition">
                <Upload size={16} className="text-white" />
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 flex-1 w-full">
              <InputField label="Full Name" name="name" value={profile.name} onChange={handleProfileChange} />
              <InputField label="Email" name="email" type="email" value={profile.email} onChange={handleProfileChange} />
              <InputField label="Phone Number" name="phone" value={profile.phone} onChange={handleProfileChange} />
              <InputField label="Role" name="role" value={profile.role} readOnly />
            </div>
          </div>
        </motion.section>

        {/* PAYMENT SECTION */}
        <motion.section
          className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-lg border border-gray-200 p-6 transition-all hover:shadow-xl"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-[#2a0a4b]">
            <CreditCard className="w-5 h-5 text-[#C45A36]" /> Payment Details
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.entries(payment).map(([key, value]) => (
              <InputField
                key={key}
                label={
                  key === "upi"
                    ? "UPI ID"
                    : key === "razorpay"
                    ? "Razorpay ID"
                    : key === "stripe"
                    ? "Stripe ID"
                    : "Bank Details"
                }
                name={key}
                value={value}
                onChange={handlePaymentChange}
              />
            ))}
          </div>
        </motion.section>

        {/* SECURITY SECTION */}
        <motion.section
          className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-lg border border-gray-200 p-6 transition-all hover:shadow-xl xl:col-span-2"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-[#2a0a4b]">
            <Key className="w-5 h-5 text-[#C45A36]" /> Security
          </h2>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="text-[#C45A36] font-medium hover:underline flex items-center gap-2"
          >
            <Key size={18} /> Change Password
          </button>
        </motion.section>
      </div>

      {/* PASSWORD MODAL */}
      <AnimatePresence>
        {showPasswordModal && (
          <PasswordModal
            setShowPasswordModal={setShowPasswordModal}
            passwordData={passwordData}
            setPasswordData={setPasswordData}
            showOld={showOld}
            setShowOld={setShowOld}
            showNew={showNew}
            setShowNew={setShowNew}
            showConfirm={showConfirm}
            setShowConfirm={setShowConfirm}
            handlePasswordChange={handlePasswordChange}
            loading={loading}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 🌟 INPUT COMPONENT
const InputField = ({ label, name, type = "text", value, onChange, readOnly = false }: any) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`w-full mt-1 border ${
        readOnly ? "bg-gray-100 text-gray-500" : "border-gray-300"
      } rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#C45A36] outline-none transition-all`}
    />
  </div>
);

// 🔐 PASSWORD MODAL
const PasswordModal = ({
  setShowPasswordModal,
  passwordData,
  setPasswordData,
  showOld,
  setShowOld,
  showNew,
  setShowNew,
  showConfirm,
  setShowConfirm,
  handlePasswordChange,
  loading,
}: any) => (
  <motion.div
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-[90%] sm:w-[400px] relative border border-gray-200"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.9 }}
    >
      <button
        onClick={() => setShowPasswordModal(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-[#C45A36]"
      >
        <X className="w-5 h-5" />
      </button>
      <h2 className="text-lg font-semibold mb-4 text-[#2a0a4b] flex items-center gap-2">
        <Key className="w-5 h-5 text-[#C45A36]" /> Change Password
      </h2>

      {["oldPassword", "newPassword", "confirmPassword"].map((key) => (
        <div key={key} className="mb-3">
          <label className="text-sm font-medium capitalize">
            {key.replace("Password", " Password")}
          </label>
          <div className="relative">
            <input
              type={
                key === "oldPassword"
                  ? showOld
                    ? "text"
                    : "password"
                  : key === "newPassword"
                  ? showNew
                    ? "text"
                    : "password"
                  : showConfirm
                  ? "text"
                  : "password"
              }
              value={passwordData[key]}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  [key]: e.target.value,
                })
              }
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#C45A36] outline-none"
            />
            <button
              type="button"
              onClick={() =>
                key === "oldPassword"
                  ? setShowOld(!showOld)
                  : key === "newPassword"
                  ? setShowNew(!showNew)
                  : setShowConfirm(!showConfirm)
              }
              className="absolute right-3 top-3 text-gray-500 hover:text-[#C45A36]"
            >
              {key === "oldPassword"
                ? showOld
                  ? <EyeOff size={18} />
                  : <Eye size={18} />
                : key === "newPassword"
                ? showNew
                  ? <EyeOff size={18} />
                  : <Eye size={18} />
                : showConfirm
                ? <EyeOff size={18} />
                : <Eye size={18} />}
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setShowPasswordModal(false)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handlePasswordChange}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#C45A36] text-white rounded-lg hover:bg-[#a34929] transition-all shadow"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default SettingsPage;
