import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    // if no users are found
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found. Create users" });
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (error: any) {
    // Check if error is a duplicate key error - user email already exist
    if (error.code === 11000) {
      res.status(400).json({ message: `The email already exists.` });
    } else {
      next(error);
    }
  }
};
