import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT as string;
export const cloudinaryName = process.env.CLOUDINARY_NAME as string;
export const cloudinaryKey = process.env.CLOUDINARY_API_KEY as string;
export const cloudinarySecret = process.env.CLOUDINARY_API_SECRET as string;
