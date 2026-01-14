import express from "express";
import { env } from "./src/config/index.js";
import { connectDB } from "./src/db/index.js";
import Approuter from "./src/index.js";
const app = express();
app.use(express.json());
app.use(Approuter);
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Endpoint topilmadi",
  });
});

// ------------------------
// GLOBAL ERROR HANDLER
// ------------------------
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Serverda nomalum xato yuz berdi",
  });
});
async function runServer() {
  try {
    await connectDB(env.MY_URL);
    const PORT = Number(env.PORT);
    const HOST = env.HOST;
    app.listen(PORT, HOST, () => {
      console.log(`server run on post http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.log("db ga ulanishda nosozlik");
  }
}

runServer();
