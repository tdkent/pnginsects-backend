import { CloudinaryResource } from "@models";

export const extractSectionName = (folder: string) => folder.split("/")[1];

export const extractCaptions = (resources: CloudinaryResource[]) => {
  return resources.map((img) => {
    const fragment = img.public_id.split("/")[2];
    return fragment[0] === "'" ? { ...img, caption: fragment } : { ...img, caption: null };
  });
};
