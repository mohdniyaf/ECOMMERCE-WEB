import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileInfo.css';
import { useAuth } from '../../context/store';

function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  });

  const { token } = useAuth();

  useEffect(() => {
    // Fetch user data when component loads
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/userData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/updateUser`,
        profile, // Send updated profile data
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Profile updated successfully:', response.data);
      setProfile(response.data); // Update state with new profile data
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <div className="productCard-border">
        <h3 className="san-font">Profile</h3>
        <hr className="w-100" />
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-4 col-6">
            <h5 className="san-font m-1">First Name</h5>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 col-6">
            <input
              type="text"
              className="m-1"
              name="firstname"
              value={profile.firstname}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4 col-6">
            <h5 className="san-font m-1">Last Name</h5>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 col-6">
            <input
              type="text"
              className="m-1"
              name="lastname"
              value={profile.lastname}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4 col-6">
            <h5 className="san-font m-1">Email</h5>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 col-6">
            <input
              type="email"
              className="m-1"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4 col-6">
            <h5 className="san-font m-1">Phone</h5>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 col-6">
            <input
              type="text"
              className="m-1"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="col-12 mt-1">
            <p className="san-font">Change Password <span className="san-font text-danger cursor-p">Click here</span></p>
          </div>
          <div className="col-12 ">
            {isEditing ? (
              <button className="btn btn-success m-1 shadow-none" onClick={handleSave}>Save</button>
            ) : (
              <button className="btn btn-outline-primary m-1 shadow-none" onClick={toggleEdit}>Edit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
