import dotenv from "dotenv";

export const { parsed, error } = dotenv.config();

if (error) {
  console.log("env file no", error);
  process.exit(1);
}

export const env = parsed;
