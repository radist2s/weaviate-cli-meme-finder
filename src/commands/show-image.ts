import { program } from "../program";
import { readFile } from "fs/promises";
import cv from "@u4/opencv4nodejs";

program
  .command("show-image")
  .argument("<path>", "image path")
  .description("Displays an image using node-image-prompt")
  .action(async (path) => {
    try {
      showImage(await readFile(path));
      console.log("Image displayed successfully");
    } catch (error) {
      console.error("Error displaying image:", error);
    }
  });

export const showImage = async (buffer: Buffer) => {
  const img = cv.imdecode(buffer);
  cv.imshow("Image", img);
  cv.waitKey();
};
