import axios from "axios";

export async function sendSMS(phone, message) {
  const token = process.env.ESKIZ_TOKEN;
  // console.log("Eskiz token:", process.env.ESKIZ_TOKEN);

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
}
