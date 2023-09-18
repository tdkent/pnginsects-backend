import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import cloudinary from "cloudinary";

import { cloudinaryName, cloudinaryKey, cloudinarySecret } from "@configs";
import { extractSectionName, extractCaptions } from "@utils";
import { CloudinaryResources, CloudinaryResource } from "@models";

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
    let nextCursorStr: string = "";
    let numberOfCalls = 0;
    let resources: CloudinaryResource[] = [];

    // initial fetch request
    await cloudinary.v2.api
      .resources({
        type: "upload",
        prefix: `${name}`,
        resource_type: "image",
        max_results: 500,
      })
      .then((res: CloudinaryResources) => {
        res.next_cursor ? (nextCursorStr = res.next_cursor) : (nextCursorStr = "");
        resources = [...res.resources];
        numberOfCalls++;
        console.log(res.rate_limit_remaining);
        return res;
      });

    // if folder resources > 500, response includes next_cursor prop
    // repeat fetch request if response includes next_cursor (max 4 calls (2000 total resources))
    while (nextCursorStr !== "" && numberOfCalls <= 4) {
      await cloudinary.v2.api
        .resources({
          type: "upload",
          prefix: `${name}`,
          resource_type: "image",
          max_results: 500,
          next_cursor: nextCursorStr,
        })
        .then((res: CloudinaryResources) => {
          res.next_cursor ? (nextCursorStr = res.next_cursor) : (nextCursorStr = "");
          resources = [...resources, ...res.resources];
          numberOfCalls++;
          console.log(res.rate_limit_remaining);
          return res;
        });
    }

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
