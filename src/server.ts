import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";

const app = express();

import { port } from "./config/config";

// test route
app.use("/", (req: Request, res: Response) => {
  res.send({ message: "hello world" });
});

// app.use(json());

app.listen(port, () => console.log(`Server listening port ${port}`));
