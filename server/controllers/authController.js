const EmployeeModel = require("../models/Employee");

//login
const login = (req, res) => {
  const { phone, password } = req.body;

  EmployeeModel.findOne({ phone: phone })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          if (user.role === "manager") {
            res.json({
              message: "Success",
              userId: user._id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              role: user.role,
            });
          }
        } else {
          res.json({ message: "The password is incorrect" });
        }
      } else {
        res.json({ message: "No record existed" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

//signup
const signup = (req, res) => {
  const { name, email, phone, password } = req.body;

  const newUser = new EmployeeModel({
    name,
    email,
    phone,
    password,
    role: "user",
  });

  newUser
    .save()
    .then((employee) => res.json(employee))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

const editProfile = async (userId, name, email, phone) => {
  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const employee = await EmployeeModel.findById(userId);
    if (!employee) {
      throw new Error("User not found");
    }

    // Cập nhật thông tin người dùng
    employee.name = name;
    employee.email = email;
    employee.phone = phone;

    // Lưu thông tin đã cập nhật vào cơ sở dữ liệu
    await employee.save();

    // Trả về kết quả thành công
    return { success: true, user: employee };
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error(error);
    return { success: false, message: error.message };
  }
};

// API handler sử dụng hàm editProfile
const editprofile = async (req, res) => {
  const { userId, name, email, phone } = req.body;

  const result = await editProfile(userId, name, email, phone);

  if (result.success) {
    return res
      .status(200)
      .json({ message: "Profile updated successfully", user: result.user });
  } else {
    return res.status(500).json({ message: result.message });
  }
};

module.exports = { login, signup, editprofile };
