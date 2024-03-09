// User repository file to communicate with database
import ErrorHandler from "../../../utils/ErrorHandler.js";
import User from "./users.schema.js";

export const createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw new ErrorHandler(400, "Error creating user");
  }
};

export const findUserByUsername = async (username) => {
  try {
    return await User.findOne({ username });
  } catch (error) {
    throw new ErrorHandler(400, "Error finding user by username");
  }
};
