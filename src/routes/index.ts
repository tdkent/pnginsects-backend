import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { param } from "express-validator";
import cloudinary from "cloudinary";

import fetchImages from "../controllers/fetch-images";
import { AcceptedParams, Errors } from "../models";

const router = Router();

router.get(
  "/:name",
  param("name", Errors.requestError).isIn(Object.values(AcceptedParams)),
  fetchImages
);

export default router;
