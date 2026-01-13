import express from "express";
import { env } from "./src/config/index.js";
import { connectDB } from "./src/db/index.js";
import Approuter from "./src/index.js";
const app = express();
app.use(express.json());
app.use(Approuter);

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
