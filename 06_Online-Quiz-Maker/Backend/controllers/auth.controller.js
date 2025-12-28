import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

/* REGISTER USER*/
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Check empty fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // 3️⃣ Strong password validation
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      });
    }

    // 4️⃣ Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // 5️⃣ Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // 6️⃣ Generate token
    generateToken(res, user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};


/* LOGIN USER */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Empty check
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    // 2️⃣ User not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3️⃣ Account locked check
    if (user.lockUntil && user.lockUntil > Date.now()) {
      const minutesLeft = Math.ceil(
        (user.lockUntil - Date.now()) / 60000
      );

      return res.status(423).json({
        success: false,
        message: `Account locked. Try again in ${minutesLeft} minutes`,
      });
    }

    // 4️⃣ Password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      user.loginAttempts += 1;

      // Lock account after 5 failures
      if (user.loginAttempts >= 5) {
        user.lockUntil = Date.now() + 15 * 60 * 1000; // 15 minutes
        user.loginAttempts = 0; // reset counter
      }

      await user.save();

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 5️⃣ Success → reset attempts
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    // 6️⃣ Generate token
    generateToken(res, user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};


/*LOGOUT USER*/
export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};


export const checkAuth = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
}
