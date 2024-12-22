import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditProfile from "D:/pj3/frontend/src/components/EditIn4.jsx";  // Import component EditProfile

function HomeManager() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);  // State để kiểm tra việc chỉnh sửa
  const navigate = useNavigate();

  // Kiểm tra thông tin người dùng khi tải lại trang
  useEffect(() => {
    const accountData = JSON.parse(localStorage.getItem("account"));
    if (!accountData || accountData.role !== "manager") {
      navigate("/login");
    } else {
      setProfile(accountData); // Lưu thông tin người dùng vào state
    }
  }, [navigate]);

  // Hàm xử lý logout
  const handleLogout = () => {
    localStorage.removeItem("account"); // Xóa thông tin người dùng khỏi localStorage
    setProfile(null); // Reset state profile
    navigate("/login"); // Điều hướng về trang login
  };

  // Hàm xử lý lưu thông tin sau khi chỉnh sửa
  const handleSave = (updatedProfile) => {
    setProfile(updatedProfile); // Cập nhật state với thông tin đã chỉnh sửa
    localStorage.setItem("account", JSON.stringify(updatedProfile)); // Lưu thông tin mới vào localStorage
    setIsEditing(false);  // Đóng form chỉnh sửa
  };

  // Hàm hủy chỉnh sửa
  const handleCancel = () => {
    setIsEditing(false);  // Đóng form chỉnh sửa
  };

  if (!profile) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {/* Nếu không phải chế độ chỉnh sửa, hiển thị thông tin người dùng và nút chỉnh sửa */}
      {!isEditing ? (
        <>
          <h2>Home Manager</h2>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>

          {/* Nút chỉnh sửa */}
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>

          {/* Nút đăng xuất */}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        // Nếu đang ở chế độ chỉnh sửa, chỉ hiển thị form chỉnh sửa
        <EditProfile
          profile={profile}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default HomeManager;
