import { user } from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function login(req, res, next) {
  try {
    const { login, password } = req.body;

    const inspect_login = await user.findOne({ login });
    if (!inspect_login)
      return res.send({
        message: "bu login mavjud emas",
      });
    // console.log(inspect_login);
    const isMatch = await bcrypt.compare(password, inspect_login.password);

    if (!isMatch) {
      return res.send({
        message: "parol hato tekshrib qaytadan urinib koring",
      });
    }

    const token_is = jwt.sign(
      { id: inspect_login._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.send({ message: "login muvaffaqiyatli", token_is });
  } catch (err) {
    next(err);
  }
}

export async function updateLogin(req, res, next) {
  try {
  } catch (err) {
    next(err);
  }
}
