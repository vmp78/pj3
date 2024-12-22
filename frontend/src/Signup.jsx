import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'D:/pj3/frontend/src/styles/Sinup.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName]= useState()
  const [email, setEmail]= useState()
  const [phone, setPhone]= useState()
  const [password, setPassword]= useState()
  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/signup',{name,email,phone,password})
    .then(result => {console.log(result),
      navigate('/login')
    })
    .catch(err=> console.log(err))
}

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
