import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  serya: { type: String, required: true },
  ID: { type: String, required: true },
  kun: { type: String, required: true },
  oy: { type: String, required: true },
  yil: { type: String, required: true },
  code: { type: String, required: true },
  phone: { type: Number, required: true },
  authToken: { type: String, required: true },
  verified: { type: String, required: true },
});

export const userID = mongoose.model("userID", userSchema);
