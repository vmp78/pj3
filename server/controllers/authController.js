const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const EmployeeModel = require("../models/Employee");

const SECRET_KEY = process.env.SECRET_KEY;

//login
const login = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: "Fill all require field!" });
  }

  try {
    const user = await EmployeeModel.findOne({ phone: phone });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password  incorrect!" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.log("[auth-controller]", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

//signup
const signup = async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "Fill all require field!" });
  }

  try {
    const existingUser = await EmployeeModel.findOne({ phone: phone });

    if (existingUser) {
      return res.status(401).json({ message: "Phone already existed!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new EmployeeModel({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const employee = await newUser.save();

    return res.status(200).json(employee);
  } catch (error) {
    console.error("[signup]", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const editProfile = async (req, res) => {
  const { name, email, phone } = req.body;

  const { userId } = req;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Fill all require field!" });
  }

  try {
    const existingPhone = await EmployeeModel.findOne({ phone });
    const existingEmail = await EmployeeModel.findOne({ email: email });

    if (existingPhone || existingEmail) {
      return res
        .status(400)
        .json({ message: "Phone or email already in use!" });
    }

    // Tìm người dùng trong cơ sở dữ liệu
    const employee = await EmployeeModel.findById(userId);
    if (!employee) {
      return res.status(404).json("User not found");
    }

    // Cập nhật thông tin người dùng
    employee.name = name;
    employee.email = email;
    employee.phone = phone;

    // Lưu thông tin đã cập nhật vào cơ sở dữ liệu
    await employee.save();

    // Trả về kết quả thành công
    return res.status(200).json({ message: "User is updated!" });
  } catch (error) {
    console.error("[edit-profile]", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { login, signup, editProfile };
