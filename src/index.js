import { Router } from "express";
import auth from "./auth/index.js";
import profileRoute from "./profil/index.js";

const Approuter = Router();

Approuter.use("/auth", auth);
Approuter.use("/profile", profileRoute);

export default Approuter;
