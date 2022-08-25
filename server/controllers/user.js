import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";

/* 
    All controllers
    for urls that starts with/user/*
 */

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    if (error.message) {
      res.status(409).send({ message: error.message });
    } else {
      res.status(409).send({ message: "Connection fail" });
    }
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id: ${id}`);
    const user = await UserModel.findById(id);
    res.json(user);
  } catch (error) {
    if (error.message) {
      res.status(409).send({ message: error.message });
    } else {
      res.status(409).send({ message: "Connection fail" });
    }
  }
};

export const updateUserByIdAdmin = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).send(`No user with id: ${id}`);

    const updateUser = { ...user._doc, role };

    const userUpdated = await UserModel.findByIdAndUpdate(id, updateUser, {
      new: true,
    });
    userUpdated.password = undefined;
    res.json(userUpdated);
  } catch (error) {
    console.log(error);
    if (error.message) {
      res.status(409).send({ message: error.message });
    } else {
      res.status(409).send({ message: "Connection fail" });
    }
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phoneNumber,
    bio,
    picture,
  } = req.body;
  console.log(id);
  console.log(req.body);

  try {
    const userData = await UserModel.findById(id);

    if (!userData) return res.status(404).send(`No user with id: ${id}`);

    //Auth update
    let hashedPassword = "";
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        return res.status(404).send(`Passwords don't match`);
      }
      hashedPassword = await bcrypt.hash(password, 12);
    } else {
      hashedPassword = userData.hashedPassword;
    }
    const updateAuth = { email: email.toLowerCase(), password: hashedPassword };

    if (updateAuth.email === "") updateAuth.email = userAuth.email;

    const updateUser = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      bio,
      picture: picture ? picture : userData.picture,
    };

    for (let prop in updateUser) if (!updateUser[prop]) delete updateUser[prop];

    const userDataUpdated = await UserModel.findByIdAndUpdate(id, updateUser, {
      new: true,
    });

    res.json(userDataUpdated);
  } catch (error) {
    console.log(error);
    if (error.message) {
      res.status(409).send({ message: error.message });
    } else {
      res.status(409).send({ message: "Connection fail" });
    }
  }
};

export const getUserFullById = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id: ${id}`);
    const user = await UserModel.findById(id);
    delete user._doc.password;
    res.json(user);
  } catch (error) {
    if (error.message) {
      res.status(409).send({ message: error.message });
    } else {
      res.status(409).send({ message: "Connection fail" });
    }
  }
};
