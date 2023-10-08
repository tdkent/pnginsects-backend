import { CaptionedResource, CloudinaryResource } from "@models";

export const extractSectionName = (folder: string) => folder.split("/")[1];

export const extractCaptions = (resources: CloudinaryResource[]) => {
  return resources.map((img) => {
    const fragment = img.public_id.split("/")[2];
    let filteredString = "";

    // italicize species names
    // ' (apostrophe) indicates word should be italicized
    if (fragment[0] === "'") {
      for (let i = 0; i < fragment.length; i++) {
        const char = fragment[i];
        if (char === "'") {
          if (i === 0 || fragment[i - 1] === " ") filteredString += "<i>";
          else filteredString += "</i>";
        } else filteredString += char;
      }

      // remove auto-generated duplicate naming
      // ex: (2) or (3)
      // check if character is '(' and following char is a number
      const regex = /[(]+[0-9]/g;
      // if so, remove the last 4 characters from the string
      // if the copy number is 9 or less, this will remove ' (x)'
      // if the copy number is 10 or greater, this will remove '(xx)'
      // in this case we can use trim() to remove the trailing space
      if (filteredString.match(regex))
        filteredString = filteredString.slice(0, -4);
      // add line break tag if caption includes a common name
      const commonNameHyphen = " - ";
      if (filteredString.includes(commonNameHyphen)) {
        filteredString =
          filteredString.split(commonNameHyphen)[0] +
          "<br />" +
          filteredString.split(commonNameHyphen)[1];
      }
    }
    return { ...img, caption: filteredString.trim() };
  });
};

export const sortImages = (resources: CaptionedResource[]) => {
  const sortCaptionedImages = resources
    .filter((img) => img.caption)
    .sort((a, b) => a.caption.localeCompare(b.caption));
  const sortOtherImages = resources
    .filter((img) => !img.caption)
    .sort((a, b) => a.caption.localeCompare(b.caption));
  return sortCaptionedImages.concat(sortOtherImages);
};
