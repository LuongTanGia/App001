import express from "express";
import * as dotenv from "dotenv";
import { studentsRouter, usersRouter } from "./routers/index.js";
import connect from "./database/database.js";
import checkToken from "./authentication/auth.js";
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/users", usersRouter);
app.use(checkToken);
app.use("/students", studentsRouter);

app.get("/", async (req, res) => {
  res.send("hello haha");
});

app.listen(port, async () => {
  await connect();
  console.log(`listen on port: ${port}`);
});
