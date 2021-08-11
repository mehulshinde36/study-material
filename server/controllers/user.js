import User from "../models/user.js";

export const createUser = async (req, res) => {
  const user = req.body;
  try {
    const newUser = new User(user);

    newUser.createdAt = new Date();

    let userReturnObj = await newUser.save();

    res.status(201).json(userReturnObj);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
