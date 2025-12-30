import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
<<<<<<< HEAD
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
=======
>>>>>>> 2627244c9b7167b082e6c49c4abe9fca988ece30
    secure: true,        // ✅ REQUIRED for HTTPS
    sameSite: "None",    // ✅ REQUIRED for cross-site cookies
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};


export default generateToken;
