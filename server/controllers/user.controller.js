import pkg from "validator";
const { isStrongPassword } = pkg;
import userModel from "../models/user.model.js";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email  || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, and Password are required",
      });
    }

    if (!isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address",
      });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Enter a strong password",
      });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email ID",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email,
    
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: userExists._id }, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
        maxAge: 2 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Login successful",
        user: {
          id: userExists._id,
          email: userExists.email,
          name: userExists.name,
        },
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const UserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId).select("-password");

    

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("UserProfile error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const Logout = async (req, res) => {
  try {
   res.clearCookie("token", {
     httpOnly: true,
     secure: process.env.NODE_ENV === "production",
     sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
     path: "/", 
   });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const UpdateUserName = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.userId;

    const newUser = await UserModel.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    ).select("-password");



    return res.status(200).json({
      success: true,
      message: "Updated User Name Successfully",
      user: newUser, 
    });
  } catch (error) {
    console.log("Update error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
