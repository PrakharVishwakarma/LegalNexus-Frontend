// frontend/src/Components/userprofile/UserDesc.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import Judge_Svg from "../../assets/Judge_Svg.svg";
import Lawyer_Svg from "../../assets/Lawyer_Svg.svg";
import Police_Svg from "../../assets/Police_Svg.svg";
import Civillians_Svg from "../../assets/Civillians_Svg.svg";

import UserDescSkeleton from "./UserDecSkellaton";

const roleIcons = {
  Judge: Judge_Svg,
  Lawyer: Lawyer_Svg,
  Police: Police_Svg,
  Civilian: Civillians_Svg,
};

const roleColors = {
  Judge: "from-purple-500 to-indigo-600",
  Lawyer: "from-blue-500 to-cyan-600",
  Police: "from-red-500 to-orange-600",
  Civilian: "from-green-500 to-teal-600",
};

const UserDesc = () => {
  const [user, setUser] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setLoading(false);

      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: { Authorization: `Bearer ${token}` }, // Fixed: Added backticks
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setFlashMessage({
          type: "error",
          text: "Failed to load user details.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <UserDescSkeleton />;

  const InfoCard = ({ icon, label, value, isWallet = false }) => (
    <div className={`group relative p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-all duration-300 ${isWallet ? 'col-span-full' : ''}`}>
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600">
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          <p className={`${isWallet ? 'text-sm break-all font-mono bg-gray-100 p-2 rounded-lg' : 'text-base font-semibold text-gray-900'}`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pt-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

        {/* Header Section */}
        <div className={`relative bg-gradient-to-r ${user?.role ? roleColors[user.role] || roleColors.Civilian : 'from-gray-400 to-gray-600'} p-8 text-white`}>
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative z-10 flex items-center gap-6">
            {user?.role && (
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center border-2 border-white border-opacity-30 overflow-auto">
                  <img
                    src={roleIcons[user.role] || Civillians_Svg}
                    alt={user.role}
                    // className="w-12 h-12"
                  />
                </div>

              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {user?.firstName || 'User'} {user?.lastName || 'Profile'}
              </h1>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium backdrop-blur-sm">
                  {user?.role || 'Role'}
                </span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-white bg-opacity-10 backdrop-blur-sm"></div>
          <div className="absolute top-12 right-12 w-12 h-12 rounded-full bg-white bg-opacity-5 backdrop-blur-sm"></div>
        </div>

        {/* Flash Message */}
        {flashMessage && (
          <div className="p-4 border-b border-gray-100">
            <div
              className={`p-4 rounded-xl text-sm font-medium flex items-center gap-3 ${flashMessage.type === "error"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
                }`}
            >
              <span className="text-xl">
                {flashMessage.type === "error" ? "⚠️" : "✅"}
              </span>
              {flashMessage.text}
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-8">
          {user ? (
            <div className="space-y-8">

              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="text-2xl">👤</span>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard
                    icon="📝"
                    label="Full Name"
                    value={`${user.firstName} ${user.lastName}`} // Fixed: Added backticks
                  />
                  <InfoCard
                    icon="📱"
                    label="Phone Number"
                    value={user.phoneNumber}
                  />
                  {user.userId && (
                    <InfoCard
                      icon="🆔"
                      label="User ID"
                      value={user.userId}
                    />
                  )}
                  {user.employeeId && (
                    <InfoCard
                      icon="🏢"
                      label="Employee ID"
                      value={user.employeeId}
                    />
                  )}
                  <InfoCard
                    icon="🔢"
                    label="Aadhar Number"
                    value={user.aadharNumber}
                  />
                </div>
              </div>

              {/* Wallet Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="text-2xl">💎</span>
                  Blockchain Wallet
                </h3>

                {user.walletAddress ? (
                  <div className="relative">
                    <InfoCard
                      icon="🔗"
                      label="Wallet Address"
                      value={user.walletAddress}
                      isWallet={true}
                    />
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 font-medium">Connected</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-xl border-2 border-dashed border-red-200 bg-red-50 text-center">
                    <div className="text-4xl mb-3">🔌</div>
                    <p className="text-red-600 font-semibold mb-2">No Wallet Connected</p>
                    <p className="text-red-500 text-sm">Connect your blockchain wallet to access all features</p>
                  </div>
                )}
              </div>

              {/* Stats Section */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-xl">📊</span>
                  Account Status
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">✓</div>
                    <div className="text-sm text-gray-600">Verified</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">🛡️</div>
                    <div className="text-sm text-gray-600">Secure</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">⭐</div>
                    <div className="text-sm text-gray-600">Active</div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😕</div>
              <p className="text-gray-500 text-lg">No user details available</p>
              <p className="text-gray-400 text-sm mt-2">Please try refreshing the page</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDesc;