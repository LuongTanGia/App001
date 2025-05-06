import { validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";
import { EventEmitter } from "node:events";
import HttpStatusCode from "../errors/HttpStatusCode.js";
import Exception from "../errors/Exception.js";
import { OutputType, print } from "../helpers/print.js";

const myEvent = new EventEmitter();

myEvent.on("event.register.user", (params) => {
  console.log(params);
});

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let existingUser = await userRepository.login({ email, password });
    res.status(HttpStatusCode.OK).json({
      message: "Login user successfully",
      data: existingUser,
    });
  } catch (exception) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
  }
};
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { email, password, name, phoneNumber, address } = req.body;

  myEvent.emit("event.register.user", { email, password });
  try {
    let user = await userRepository.register({
      email,
      password,
      name,
      phoneNumber,
      address,
    });
    res
      .status(HttpStatusCode.INSERT_OK)
      .json({ message: "Register user successfully", data: user });
  } catch (exception) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
  }
};
const getDetailUser = async (req, res) => {
  res.send("Get getDetailUser");
  print("Get getDetailUser", OutputType.INFORMATION);
};

export default {
  login,
  register,
  getDetailUser,
};
