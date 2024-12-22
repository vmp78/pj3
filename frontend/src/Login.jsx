import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Trạng thái cho lỗi
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios
      .post("http://localhost:3001/login", { phone, password })
      .then((result) => {
        const account = result.data;
        console.log(account);
  
        if (account.message === "Success") {
          localStorage.setItem("account", JSON.stringify(account));  // Lưu thông tin vào localStorage
  
          // Điều hướng dựa trên vai trò
          if (account.role === "user") {
            navigate("/home-user");
          } else if (account.role === "manager") {
            navigate("/home-manager");
          } else if (account.role === "employee") {
            navigate("/home-employee");
          }
        } else {
          // Hiển thị thông báo lỗi từ server
          setError(account.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Đã xảy ra lỗi, vui lòng thử lại!");
      });
  };
  
  return (
    <div className="signup-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="phone">Số điện thoại</label>
        <input
          type="tel"
          id="phone"
          placeholder="Nhập số điện thoại"
          autoComplete="off"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          placeholder="Nhập mật khẩu"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Đăng nhập</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Bạn chưa có tài khoản?</p>
      <Link to="/signup">Đăng ký</Link>
    </div>
  );
}

export default Login;
