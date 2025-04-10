import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";

function UserProfile({ onClose }) { 
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(false); // State to manage modal visibility

  // Function to manipulate the image URL by adding base URL and folder
  const manipulateImageUrl = (imageUrl, baseUrl, folder) => {
    return `${baseUrl}${folder}/${imageUrl.split('/').pop()}`;
  };

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get("http://localhost:8000/combined-detail");
        console.log("Response:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, []);

  // Function to handle modal toggle
  const toggleModal = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`user-profile-modal ${isActive ? "active" : ""}`}>
      <button onClick={onClose}></button>

      <div className="user-info-container">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {userData.user && (
          <div className="userinfo">
            <div className="photo">
              <h2>Photo</h2>
              {userData.more_info.photo && (
                <img
                  src={manipulateImageUrl(
                    userData.more_info.photo,
                    "http://localhost:8000",
                    "/media/user_photos"
                  )}
                  alt="User Photo"
                />
              )}
            </div>

            <div className="name">
              <h2>Name</h2>
              <p>First Name: {userData.user.first_name || "N/A"}</p>
              <p>Last Name: {userData.user.last_name || "N/A"}</p>
            </div>

            <div className="contact-info">
              <h2>Contact Information</h2>
              <p>Mobile No: {userData.more_info.mobile_no || "N/A"}</p>
              <p>Email: {userData.more_info.email || "N/A"}</p>
              <p>Aadhar No: {userData.more_info.aadhar_no || "N/A"}</p>
            </div>

            <div className="aadhar-photo">
              <h2>Aadhar Photo</h2>
              {userData.more_info.aadhar_photo && (
                <img
                  src={manipulateImageUrl(
                    userData.more_info.aadhar_photo,
                    "http://localhost:8000",
                    "/media/aadhar_photos"
                  )}
                  alt="Aadhar Photo"
                />
              )}
            </div>

            <div className="address">
              <h2>Address</h2>
              <p>{userData.more_info.address || "N/A"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
