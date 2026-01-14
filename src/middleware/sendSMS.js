import axios from "axios";
import { checkSmsLimit } from "../utils/chascSmsLimit.js";

export async function sendSMS(phone, message) {
  try {
    const token = process.env.ESKIZ_TOKEN;
    const canSend = await checkSmsLimit(phone);
    // console.log("Eskiz token:", process.env.ESKIZ_TOKEN);

    if (!canSend) {
      const err = new Error("24 soat ichida faqat 3 ta SMS mumkin");
      err.status = 429;
      throw err;
    }

    if (!token) {
      throw new Error("ESKIZ_TOKEN env da yoq");
    }

    return { data: null, statusCode: 200 };
    return await axios.post(
      "https://notify.eskiz.uz/api/message/sms/send",
      {
        mobile_phone: phone,
        message,
        from: "4546",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    const error = new Error(
      "SMS yuborishda xato: " + err.response?.data?.message || err.message
    );
    error.status = err.response?.status || 500;
    throw error;
  }
}
