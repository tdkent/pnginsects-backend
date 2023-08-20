import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { param } from "express-validator";
import cloudinary from "cloudinary";

import { cloudinaryName, cloudinaryKey, cloudinarySecret } from "../config/config";
import fetchImages from "../controllers/fetch-images";
import { AcceptedParams } from "../models";

const router = Router();

cloudinary.v2.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret,
  secure: true,
});

router.get(
  "/:name",
  param("name", "Default error message").isIn(Object.values(AcceptedParams)),
  fetchImages
);

// router.get("/:name", async (req: Request, res: Response, next: NextFunction) => {
//   const { name } = req.params;
//   console.log("🚀 ~ file: index.ts:18 ~ router.get ~ name:", name);
//   try {
//     if (!acceptedParams.includes(name)) {
//       return next({ message: "Invalid search parameter received." });
//     }
//     const images = await cloudinary.v2.api
//       .resources({
//         type: "upload",
//         prefix: `${name}`,
//         resource_type: "image",
//         max_results: 2,
//       })
//       .then((res) => res);
//     res.json(images);
//   } catch (error) {
//     console.log(error);
//     res.status(500);
//     return next({
//       message: "An internal server error has occurred.",
//     });
//   }
// });

export default router;
