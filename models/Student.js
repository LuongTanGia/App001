import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const Student = mongoose.model(
  "Student",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 3,
        message: "Username must be at least 3 characters",
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => isEmail(value),
        message: "Email is incorrect format",
      },
    },
    language: {
      type: [String],
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: (phoneNumber) => phoneNumber.length > 5,
        message: "Phone number must be at least 5 characters",
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
        message: "{value} is not supported",
      },
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  })
);

export default Student;
