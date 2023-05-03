import { readFile, writeFile } from "fs/promises";
import { createWeaviateClient } from "../create-client";
import { program } from "../program";
import path from "path";

program
  .command("find-image")
  .option("-i, --input-image <inputImagePath>", "input image path")
  .option("-o, --out-dir <outImagesDir>", "output images directory")
  .option("-d, --distance <distance>", "distance", "0.1")
  .description("Put found images into './found' directory")
  .action(async (options) => {
    const path = options.inputImage;
    try {
      const outDirPath = options.outDir;
      if (typeof outDirPath !== "string")
        throw new Error("No output path defined");

      await findImageAndSave(path, outDirPath, Number(options.distance));
      console.log("Image finding successfully");
    } catch (error) {
      console.error("Error finding image:", error);
    }
  });

async function findImageAndSave(
  imagePath: string,
  outImagePath: string,
  distance: number
) {
  const image = Buffer.from(await readFile(imagePath)).toString("base64");

  const client = createWeaviateClient();
  const resImage = await client.graphql
    .get()
    .withClassName("Meme")
    .withFields("image text")
    .withNearImage({ image, distance: distance })
    .withLimit(5)
    .do();

  for (const meme of resImage.data.Get.Meme) {
    await writeFile(path.join(outImagePath, meme.text), meme.image, "base64");
  }
}
