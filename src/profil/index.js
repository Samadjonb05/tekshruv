import { Router } from "express";
import { profile } from "./profile.js";
import { verifyToken } from "../middleware/token.js";

const profileRoute = Router();

profileRoute.get("/", verifyToken, profile);

export default profileRoute;
