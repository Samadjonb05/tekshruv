import { Router } from "express";
import { authUser, deleteUser, register, verifyCode } from "./controller.js";
import { forgot_password, forgotCode, regstrater_forgot } from "./forgot.js";
import { login } from "./login.js";
import {
  validate,
  userValidate,
  userValidateCode,
  userValidateCodeToken,
  userPasportID,
} from "./validate.js";
import { PasportID, pasportIDCode, registerPasportId } from "./pasportID.js";
const authRoute = Router();

authRoute.post("/send-code", validate(userValidate), authUser);
authRoute.post("/verify-code", validate(userValidateCode), verifyCode);
authRoute.post("/register", validate(userValidateCodeToken), register);
authRoute.delete("/delete", deleteUser);

authRoute.post("/ID", validate(userPasportID), PasportID);
authRoute.post("/ID_code", validate(userValidateCode), pasportIDCode);
authRoute.post(
  "/register_ID",
  validate(userValidateCodeToken),
  registerPasportId
);

authRoute.post("/forgot-password", validate(userValidate), forgot_password);
authRoute.post("/forgot-code", validate(userValidateCode), forgotCode);
authRoute.post(
  "/forgot-regstrater",
  validate(userValidateCodeToken),
  regstrater_forgot
);

authRoute.post("/login", login);

export default authRoute;
