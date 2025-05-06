import Exception from "../errors/Exception.js";
import { Student } from "../models/index.js";

const getAllStudents = async () => {
  try {
    const students = await Student.find({}).exec();
    return students;
  } catch (exception) {
    if (!!exception.errors) {
      throw new Exception("Input Error", exception.errors);
    }
  }
};
const insertStudent = async ({
  name,
  email,
  languages,
  phoneNumber,
  gender,
  address,
  language,
}) => {
  try {
    const student = await Student.create({
      name,
      email,
      languages,
      phoneNumber,
      gender,
      address,
      language,
    });
    return student;
  } catch (exception) {
    if (!!exception.errors) {
      throw new Exception("Input Error", exception.errors);
    }
  }
};
// const getStudentById = async (req, res) => {};
// const updateStudent = async (req, res) => {};
export default {
  getAllStudents,
  insertStudent,
};
