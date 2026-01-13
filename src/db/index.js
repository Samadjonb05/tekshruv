import mongoose from "mongoose";

export async function connectDB(MY_URL) {
  try {
    mongoose.connect(MY_URL);
    console.log("db on");
  } catch (err) {
    console.log("db ga ulanishda muvofaqayatsizlik", err);
  }
}
