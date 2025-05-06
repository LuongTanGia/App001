import express from "express";
import { body } from "express-validator";
import { userController } from "../controllers/index.js";

const router = express.Router();
router.use(express.json());

router.get("/:id", userController.getDetailUser);
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  userController.login
);

router.post(
  "/register",
  body("email").isEmail(),
  body("name").notEmpty(),
  body("address").notEmpty(),
  body("phoneNumber").isLength({ min: 10, max: 10 }),
  body("password").isLength({ min: 5 }),

  userController.register
);

export default router;
