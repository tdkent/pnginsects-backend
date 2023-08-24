import { Router } from "express";
import { param } from "express-validator";

import fetchImages from "@controllers";
import { AcceptedParams, Errors } from "@models";

const router = Router();

router.get(
  "/:name",
  param("name", Errors.requestError).isIn(Object.values(AcceptedParams)),
  fetchImages
);

export default router;
