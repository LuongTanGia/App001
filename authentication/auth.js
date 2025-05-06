import HttpStatusCode from "../errors/HttpStatusCode.js";
import jwt from "jsonwebtoken";
const checkToken = (req, res, next) => {
  if (
    req.url.toLowerCase().trim() === "users/login".toLowerCase().trim() ||
    req.url.toLowerCase().trim() === "users/register".toLowerCase().trim()
  ) {
    next();
    return;
  }
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Token not exist",
    });
  }
  try {
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
    const isExpired = Date.now() >= jwtObject.exp * 1000;
    if (isExpired) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Token is expired",
      });
      res.end();
    } else {
      next();
    }
  } catch (exception) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: exception.message,
    });
  }
};

export default checkToken;
