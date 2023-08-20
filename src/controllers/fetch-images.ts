import { RequestHandler } from "express";
import { validationResult } from "express-validator";

const fetchImages: RequestHandler<{ name: string }> = (req, res, next) => {
  const { name } = req.params;
  console.log("🚀 ~ file: fetch-images.ts:6 ~ name:", name);
  try {
    const errors = validationResult(req);
    console.log("🚀 ~ file: fetch-images.ts:8 ~ errors:", errors);
    // if (!errors.isEmpty()) {
    //   return res.status(422).json({ errors: errors.array() });
    // }
    res.json({ message: "hello world" });
  } catch (error) {}
};

export default fetchImages;
