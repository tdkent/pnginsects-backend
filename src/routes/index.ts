import { Router, Request, Response, NextFunction } from "express";
import cloudinary from "cloudinary";

import { cloudinaryName, cloudinaryKey, cloudinarySecret } from "../config/config";

const router = Router();

cloudinary.v2.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret,
  secure: true,
});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const images = await cloudinary.v2.api
      .resources({
        type: "upload",
        prefix: "home",
        resource_type: "image",
        max_results: 2,
      })
      .then((res) => res);
    res.json(images);
  } catch (error) {
    console.log(error);
    res.status(500);
    return next({
      message: "An internal server error has occurred.",
    });
  }
});

export default router;
