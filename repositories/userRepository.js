import Exception from "../errors/Exception.js";
import { print, OutputType } from "../helpers/print.js";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//action
const login = async ({ email, password }) => {
  const existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    const isMatched = await bcrypt.compare(password, existingUser.password);
    if (!!isMatched) {
      let token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "10 days",
        }
      );
      return { ...existingUser.toObject(), password: "Not show", token };
    } else {
      throw new Exception(Exception.WRONG_EMAIL_PASSWORD);
    }
  } else {
    throw new Exception(Exception.USER_NOT_EXIST);
  }
};
const register = async ({ email, password, name, phoneNumber, address }) => {
  const existingUser = await User.findOne({ email }).exec();
  if (!!existingUser) {
    throw new Exception(Exception.USER_EXIST);
  }
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    address,
  });
  return { ...newUser._doc, password: "Not show" };
};
export default {
  login,
  register,
};
