import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import cloudinary from "cloudinary";

import { cloudinaryName, cloudinaryKey, cloudinarySecret } from "@configs";
import { extractSectionName, extractCaptions } from "@utils";
import { CloudinaryResources } from "@models";

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
    // validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // cloudinary admin api
    const { resources, rate_limit_remaining }: CloudinaryResources = await cloudinary.v2.api
      .resources({
        type: "upload",
        prefix: `${name}`,
        resource_type: "image",
        max_results: 100,
      })
      .then((res) => res);

    console.log("rate limit remaining: ", rate_limit_remaining);

    // extract unique section names
    const folders = resources.map(({ folder }) => extractSectionName(folder));
    const sections: string[] = [...new Set(folders)];

    // extract sections
    const addCaptions = extractCaptions(resources);

    // create data array
    const filteredData = sections.map((section) => {
      return {
        sectionName: section,
        images: addCaptions.filter(({ folder }) => extractSectionName(folder) === section),
      };
    });

    res.json({
      sections,
      resources: filteredData,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    return next({
      message: Errors.serverError,
    });
  }
};

export default fetchImages;
