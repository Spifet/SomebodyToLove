import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/user.js";
import TransactionModel from "../models/transaction.js";
import { ROLE } from "../constants/roles.js";
import petModel from "../models/petModel.js";

dotenv.config();

export const isLoginOnRefresh = async (req, res) => {
  if (!req.userInfo) {
    res.status(200).json({ result: null });
    return;
  }
  try {
    const user = await UserModel.findById(req.userInfo._id);
    res.status(200).json({ result: user });
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, phoneNumber } =
    req.body;
  const emailToLowerCase = email.toLowerCase();
  try {
    const existingUser = await UserModel.findOne({ email: emailToLowerCase });
    if (existingUser)
      return res.status(404).send({ email: "User already exists." });
    if (password !== confirmPassword)
      return res.status(404).send({ password: "Password don't match." });

    const hashedPassword = await bcrypt.hash(password, 5);

    const resultUser = await UserModel.create({
      email: emailToLowerCase,
      firstName,
      lastName,
      phoneNumber,
      bio: "",
      hashedPassword,
      listOfPetsAdopted: [],
      listOfPetsSaved: [],
      listOfPetsFostered: [],
      role: ROLE.USER,
      lastConnection: new Date(),
      ip: req.ip,
      signUpDate: new Date(),
    });

    await TransactionModel.create({
      timestamp: new Date(),
      ip: req.ip,
      action: "signUp",
    });

    const token = jwt.sign({ user: resultUser }, "123456", {
      expiresIn: 60 * 24,
    });

    //need to delete hashed password from resultUser
    resultUser.hashedPassword = "";
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ result: resultUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const emailToLowerCase = email.toLowerCase();

  try {
    const existingUser = await UserModel.find({ email: emailToLowerCase });
    if (!existingUser.length) {
      return res
        .status(404)
        .send({ email: "User doesn't exist or already signedUp with Google" });
    }

    const { hashedPassword } = existingUser[0];

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordCorrect)
      return res.status(404).send({ email: "Invalid credentials" });
    existingUser.password = undefined;

    const dataUser = await UserModel.findOneAndUpdate(
      { email },
      { lastConnection: new Date(), ip: req.ip },
      { new: true }
    );

    const token = jwt.sign({ user: dataUser }, "123456", {
      expiresIn: 60 * 40,
    });

    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ result: dataUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const logOut = async (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
};
