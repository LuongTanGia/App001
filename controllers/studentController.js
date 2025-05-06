import { body, validationResult } from "express-validator";
import HttpStatusCode from "../errors/HttpStatusCode.js";
import studentRepository from "../repositories/studentRepository.js";
const getAllStudents = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  try {
    const students = await studentRepository.getAllStudents();
    res.status(HttpStatusCode.OK).json({
      message: "Get all students successfully",
      data: students,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
  // res.status(500).json({
  //   message: "Get all student error",
  //   data: [],
  // });
};
const getStudentById = async (req, res) => {};
const updateStudent = async (req, res) => {};
const insertStudent = async (req, res) => {
  try {
    const student = await studentRepository.insertStudent(req.body);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Insert student successfully ",
      data: student,
    });
  } catch (exception) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Cannot insert student: " + exception,
      validationErrors: exception.validationErrors,
    });
  }
};

export default {
  getAllStudents,
  getStudentById,
  updateStudent,
  insertStudent,
};
