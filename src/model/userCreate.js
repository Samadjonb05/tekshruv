import mongoose from "mongoose";

const tempAuthSchema = new mongoose.Schema({
  jshshir: { type: String, required: true },
  phone: { type: String, required: true },
  code: { type: String, required: true },
  verified: { type: Boolean, default: false },
  authToken: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: 120 }, // 120s dan keyin o'chadi
});

export const TempAuth = mongoose.model("TempAuth", tempAuthSchema);
