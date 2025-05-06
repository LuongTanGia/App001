import { print, OutputType } from "../helpers/print.js";
export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password";
  static WRONG_DB_SERVERNAME = "Wrong server name/connection string";
  static WRONG_DB_CANNOT_CONNECT = "Cannot connect to Mongoose";
  static USER_EXIST = "User already exists";
  static USER_NOT_EXIST = "User not exists";

  static CANNOT_REGISTER_USER = "Cannot register user";
  static WRONG_EMAIL_PASSWORD = "Wrong email or password";

  constructor(message, validationErrors = {}) {
    super(message);
    print(message, OutputType.ERROR);
    this.validationErrors = validationErrors;
  }
}
