import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/login", {
        phone,
        password,
      });

      const token = res.data.token;
      const role = res.data.role;

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("role", JSON.stringify(role));

      if (role === "user") {
        navigate("/home-user");
      } else if (role === "manager") {
        navigate("/home-manager");
      } else if (role === "employee") {
        navigate("/home-employee");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const message =
            error.response.data?.message || "Something went wrong!";
          toast.error(message);
        } else if (error.request) {
          // Lỗi khi không nhận được phản hồi từ server
          toast.error("No response received from server.");
          console.error("Error request:", error.request);
        }
      } else {
        toast.error("Something went wrong!");
      }
    }
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
      <p>Bạn chưa có tài khoản?</p>
      <Link to="/signup">Đăng ký</Link>
    </div>
  );
}

export default Login;
