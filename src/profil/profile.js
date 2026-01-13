import { user } from "../model/user.js";

export async function profile(req, res, next) {
  try {
    const foundUser = await user.findById(req.user.id).select("-password");

    if (!foundUser) {
      return res.status(404).json({ message: "User topilmadi" });
    }

    res.status(200).json(foundUser);
  } catch (err) {
    next(err);
  }
}
