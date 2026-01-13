import { userID } from "../model/id_pasport.js";
import { user } from "../model/user.js";
import { generateToken } from "../utils/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendSMS } from "../middleware/sendSMS.js";
// pasport is orqali royhattdan utish
export async function PasportID(req, res, next) {
  try {
    const { serya, ID, yil, oy, kun, phone } = req.body;

    const inspect_jshshir = await user.findOne({ ID });

    const inspect_phone = await user.findOne({ phone: phone });
    // if ( inspect_phone)
    //   return res.send({ message: "Royhattdan utgan" }), next();

    const code = Math.floor(1000 + Math.random() * 9000).toString();

    const authToken = generateToken(10);
    await userID.findOneAndUpdate(
      { ID },
      {
        serya,
        ID,
        kun,
        oy,
        yil,
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
  } catch (err) {
    next(err);
  }
}

export async function pasportIDCode(req, res, next) {
  try {
    const { authToken, code } = req.body;
    const tempAuthDos = await userID.findOne({ authToken });

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
export async function registerPasportId(req, res, next) {
  try {
    const { login, pasword, authToken } = req.body;
    const tempAuthDos = await userID.findOne({ authToken });
    console.log(tempAuthDos);
    if (!tempAuthDos || !tempAuthDos.verified) {
      return res.send({ message: "Avval sms tasdiqlashdna uting" });
    }
    // console.log(tempAuthDos);
    const inspect_login = await user.findOne({ login });
    if (inspect_login)
      return res.send({
        message:
          "bu logindan avval royhatdan utilgan iltmos boshqa login kiriting",
      });
    const hashedPassword = await bcrypt.hash(pasword, 10);
    // const newUser = await user.create({
    //   login,
    //   password: hashedPassword,
    //   phone: tempAuthDos.phone,
    //   jshshir: tempAuthDos.jshshir,
    // });
    await userID.findOneAndDelete({ authToken });

    // const token_is = jwt.sign(
    //   { id: newUser._id.toString() },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "30d" }
    // );

    res.send({ message: "login muvaffaqiyatli" /*newUser, token_is*/ });
  } catch (err) {
    next(err);
  }
}
//http://127.0.0.1:5500/src/auth/controller.js
