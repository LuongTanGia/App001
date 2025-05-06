import mongoose from "mongoose";
import { print, OutputType } from "../helpers/print.js";
import Exception from "../errors/Exception.js";

mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    let connection = await mongoose.connect(process.env.MONG_URI);
    print("Connect mongoose successfully", OutputType.SUCCESS);
    return connection;
  } catch (error) {
    const { code } = error;
    if (error.code == 800) {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    } else if (code == "ENOTFOUND") {
      throw new Exception(Exception.WRONG_DB_SERVERNAME);
    }
    throw new Exception(Exception.WRONG_DB_CANNOT_CONNECT);
  }
};
export default connect;
