import mongoose from "mongoose";

const smsLimitSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  firstAttemptAt: { type: Date, default: Date.now },
});

export const SmsLimit = mongoose.model("SmsLimit", smsLimitSchema);
