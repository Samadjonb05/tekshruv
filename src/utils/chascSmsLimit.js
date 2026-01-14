import { SmsLimit } from "../model/smsLimit.js";

const LIMIT = 3;
const WINDOW = 24 * 60 * 60 * 1000;

export async function checkSmsLimit(phone) {
  const now = Date.now();

  let record = await SmsLimit.findOne({ phone });

  if (!record) {
    await SmsLimit.create({
      phone,
      count: 1,
      firstAttemptAt: new Date(),
    });
    return true;
  }

  const passed = now - record.firstAttemptAt.getTime();

  if (passed >= WINDOW) {
    record.count = 1;
    record.firstAttemptAt = new Date();
    await record.save();
    return true;
  }

  if (record.count >= LIMIT) {
    const hoursLeft = Math.ceil((WINDOW - passed) / (1000 * 60 * 60));

    const err = new Error(
      `Limit tugadi. ${hoursLeft} soatdan keyin qayta urinib ko‘ring.`
    );
    err.status = 429;
    throw err;
  }

  record.count += 1;
  await record.save();
  return true;
}
