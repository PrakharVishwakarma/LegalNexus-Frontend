// src/Pages/Dashboard.jsx
import { useEffect, useState } from "react";

import axios from "axios";

import NavBarDash from "../Components/Dashboard/NavBarDash";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setFlashMessage({
          type: "error",
          text: "You are not authenticated. Please login first.",
        });
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
        setFlashMessage({
          type: "success",
          text: "Welcome back! Your dashboard is loaded.",
        });
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong.";
        setFlashMessage({ type: "error", text: errorMessage });
      }
    };

    fetchUserDetails();
  }, []);

  const handleCloseFlash = () => {
    setFlashMessage(null);
  };

  return (
    <>
      <NavBarDash />
      <div className="min-h-screen bg-gray-100 p-8">
        {flashMessage && (
          <div
            className={`flash-message ${flashMessage.type === "success" ? "bg-green-500" : "bg-red-500"
              } text-white px-6 py-3 rounded-md shadow-md flex justify-between items-center mb-6 transition-all duration-300`}
          >
            <span>{flashMessage.text}</span>
            <button
              onClick={handleCloseFlash}
              className="text-lg font-bold hover:text-gray-300"
            >
              &times;
            </button>
          </div>
        )}

        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            👤 User Profile
          </h1>

          {!user ? (
            <p className="text-gray-600 text-center">Loading user info...</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 text-gray-700 text-base">
              <p>
                <strong>Full Name:</strong> {user.firstName} {user.lastName}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Phone:</strong> {user.phoneNumber}
              </p>
              {user.userId && (
                <p>
                  <strong>User ID:</strong> {user.userId}
                </p>
              )}
              {user.employeeId && (
                <p>
                  <strong>Employee ID:</strong> {user.employeeId}
                </p>
              )}
              <p>
                <strong>Aadhar:</strong> {user.aadharNumber}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${user.isVerified ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {user.isVerified ? "Verified" : "Not Verified"}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
