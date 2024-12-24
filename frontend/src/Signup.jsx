import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/signup", {
        phone,
        password,
        name,
        email,
      });

      toast.success("Successfully");
      navigate("/login");
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
      <h2>Đăng Ký</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Họ và tên</label>
        <input
          type="text"
          id="name"
          placeholder="Nhập họ và tên"
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Nhập email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="phone">Số điện thoại</label>
        <input
          type="tel"
          id="phone"
          placeholder="Nhập số điện thoại"
          autoComplete="off"
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          placeholder="Nhập mật khẩu"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Đăng ký</button>
      </form>
      <p>Bạn đã có tài khoản?</p>
      <Link to="/login">Đăng nhập</Link>
    </div>
  );
};

export default Signup;
