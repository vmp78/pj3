const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY; // Đảm bảo đã đặt SECRET_KEY trong file .env

const verifyToken = (req, res, next) => {
  // Lấy token từ header Authorization
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided!" });
  }

  // Kiểm tra định dạng "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token format!" });
  }

  try {
    // Giải mã token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Lấy userId từ token và gắn vào req
    req.userId = decoded.userId;

    // Tiếp tục xử lý middleware/hàm tiếp theo
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Invalid or expired token!" });
  }
};

module.exports = verifyToken;
