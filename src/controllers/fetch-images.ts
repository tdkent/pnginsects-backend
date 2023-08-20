import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import cloudinary from "cloudinary";

import { cloudinaryName, cloudinaryKey, cloudinarySecret } from "../config/config";

import { Errors } from "../models";

cloudinary.v2.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret,
  secure: true,
});

const fetchImages: RequestHandler<{ name: string }> = async (req, res, next) => {
  const { name } = req.params;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const images = await cloudinary.v2.api
      .resources({
        type: "upload",
        prefix: `${name}`,
        resource_type: "image",
        max_results: 100,
      })
      .then((res) => res);
    res.json(images);
  } catch (error) {
    console.log(error);
    res.status(500);
    return next({
      message: Errors.serverError,
    });
  }
};

export default fetchImages;
