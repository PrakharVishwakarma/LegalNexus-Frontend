import { useEffect, useState } from "react";
import axios from "axios";

const UserDesc = () => {
  const [user, setUser] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
        setFlashMessage({ type: "error", text: "Failed to fetch user details." });
        setFlashMessage({ type: "error", text: "Failed to load user details." });
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">👤 User Overview</h2>
      {flashMessage && (
        <div className={`flash-message ${flashMessage.type}`}>
          {flashMessage.text}
        </div>
      )}
      {user ? (
        <div className="space-y-3 text-gray-700">
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Phone:</strong> {user.phoneNumber}</p>
          {user.userId && <p><strong>User ID:</strong> {user.userId}</p>}
          {user.employeeId && <p><strong>Employee ID:</strong> {user.employeeId}</p>}
          <p><strong>Aadhar Number:</strong> {user.aadharNumber}</p>

          {/* 🪙 Wallet Section */}
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-1">🔐 Wallet Info</h3>
            {user.walletAddress ? (
              <div className="text-green-600 font-semibold">
                Connected Wallet: <span className="break-all">{user.walletAddress}</span>
              </div>
            ) : (
              <p className="text-red-500">No wallet connected.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserDesc;
