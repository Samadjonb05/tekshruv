import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  jshshir: { type: String, required: true },
  phone: { type: Number, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
});

export const user = mongoose.model("user", userSchema);

//, select: false
