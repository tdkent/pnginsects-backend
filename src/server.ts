import express, { Request, Response, NextFunction } from "express";
// import { json } from "body-parser";

const app = express();

import { port } from "./config/config";
import route from "./routes";

app.use("/test", route);

// error handling
app.use((req, res, next) => {
  res.status(404).json({ message: "That route does not exist." });
});

app.use((error: { message: string }, req: Request, res: Response, next: NextFunction) => {
  res.status ? res.status : res.status(500);
  res.json({ message: error.message });
});

// app.use(json());

app.listen(port, () => console.log(`Server listening port ${port}`));
