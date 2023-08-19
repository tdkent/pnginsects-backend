import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
require("dotenv").config();

const app = express();

// test route

app.use("/", (req: Request, res: Response) => {
  res.send({ message: "hello world" });
});

app.use(json());

// app.listen(process.env.PORT, () => console.log(`Server listening port ${process.env.PORT}`));
app.listen(4000, () => console.log(`Server listening port 4000`));
