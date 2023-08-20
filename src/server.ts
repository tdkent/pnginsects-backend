import express, { Request, Response, NextFunction } from "express";

import { port } from "./config/config";
import route from "./routes";
import { Errors } from "./models";

const app = express();

app.use("/", route);

// error handling
app.use((req, res, next) => {
  res.status(404).json({ message: Errors.notfoundError });
});

app.use((error: { message: string }, req: Request, res: Response, next: NextFunction) => {
  res.status ? res.status : res.status(500);
  res.json({ message: error.message });
});

app.listen(port, () => console.log(`Server listening port ${port}`));
