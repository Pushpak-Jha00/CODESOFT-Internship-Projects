import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, token missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(401);
    next(new Error("Not authorized"));
  }
};
