import { useState, useEffect } from "react";
import PropTypes from "prop-types";  // Import PropTypes
import axios from "axios";  // Import axios
import 'D:/pj3/frontend/src/styles/EditIn4.css'; // Import CSS

function EditProfile({ profile, onSave, onCancel }) {
  const [updatedProfile, setUpdatedProfile] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  });

  useEffect(() => {
    setUpdatedProfile({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    });
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Hàm lưu thông tin đã chỉnh sửa và gọi API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Gọi API để cập nhật thông tin người dùng
      const response = await axios.put("http://localhost:3001/edit-profile", {
        userId: profile.userId,  // Dùng userId từ profile
        name: updatedProfile.name,
        email: updatedProfile.email,
        phone: updatedProfile.phone,
      });

      // Kiểm tra nếu API trả về thành công
      if (response.status === 200) {
        console.log("Profile updated successfully:", response.data);
        onSave(updatedProfile); 
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Xử lý lỗi nếu có
    }
  };

  return (
    <div className="signup-container">
      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={updatedProfile.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={updatedProfile.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={updatedProfile.phone}
          onChange={handleChange}
        />
        <button type="submit">Save Changes</button>
        <button type="button" className="cancel" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

EditProfile.propTypes = {
  profile: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditProfile;
