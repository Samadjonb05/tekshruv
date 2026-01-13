import { user } from "../model/user.js";
import { generateToken } from "../utils/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { forgetAuth } from "../model/forget.js";
import { sendSMS } from "../middleware/sendSMS.js";

export async function forgot_password(req, res, next) {
  try {
    const { jshshir, phone } = req.body;
    const inspect_forgot = await user.findOne({ jshshir });
    // if (!inspect_forgot) {
    //   return res.send({
    //     message: "bu raqamdan royhatdan utilgan",
    //   });
    // }

    if (inspect_forgot.jshshir !== jshshir) {
      return res.send({
        message: "jshshir notogri tekshrib qatadan urinib koring",
      });
    }
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const authToken = generateToken(10);
    await forgetAuth.findOneAndUpdate(
      { jshshir },
      {
        jshshir,
        phone,
        code,
        authToken,
        verified: false,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
    await sendSMS(phone, "Bu Eskiz dan test");
    console.log("code: %d", code);

    res.status(200).json({
      message: `${phone}, raqamiga kod jonatildi `,

      authToken: authToken,
    });
    // console.log(inspect_forgot);
  } catch (err) {
    next(err);
  }
}

export async function forgotCode(req, res, next) {
  try {
    const { authToken, code } = req.body;
    const tempAuthDos = await forgetAuth.findOne({ authToken });

    if (!tempAuthDos || tempAuthDos.code.toString() !== code.toString()) {
      const err = new Error("kod notogri yoki eskirgan");
      err.status = 400;
      throw err;
    }

    tempAuthDos.verified = true;
    await tempAuthDos.save();

    res
      .status(200)
      .json({ message: `yangi login vs pasword ni kiritishingiz mumkin` });
  } catch (err) {
    next(err);
  }
}

export async function regstrater_forgot(req, res, next) {
  try {
    const { login, pasword, authToken } = req.body;
    const tempAuthDos = await forgetAuth.findOne({ authToken });
    if (!tempAuthDos || !tempAuthDos.verified) {
      return res.send({ message: "Avval sms tasdiqlashdna uting" });
    }
    const inspect_login = await user.findOne({ login });
    if (inspect_login)
      return res.send({
        message:
          "bu logindan avval royhatdan utilgan iltmos boshqa login kiriting",
      });
    // console.log(inspect_login);
    const userId = tempAuthDos.jshshir;
    const inspectUser = await user.findOne({ jshshir: userId });
    if (!inspectUser) {
      return res.send({ message: "Foydalanuvchi topilmadi" });
    }
    const hashedPassword = await bcrypt.hash(pasword, 10);
    const newUser = await user.findOneAndUpdate(
      { jshshir: userId },
      { login: login, password: hashedPassword },
      { new: true }
    );
    await forgetAuth.findOneAndDelete({ authToken });
    const token_is = jwt.sign(
      { id: newUser._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.send({ message: "Parol muvaffaqiyatli yangilandi", newUser, token_is });
  } catch (err) {
    next(err);
  }
}

/**
 * 1. auth --> jshshr, phone ==> token and code           [x]
 * 2. token check --> authToken, code ==> true            []   --> gerante authToken uniqueness
 * 3. register --> login, parol, authToken ==> token
 *
 * 1. login  --> login, parol  ==> token
 *
 * 1.
 *
 */
