import cliProgress from "cli-progress";
import fs from "fs";
import path from "path";
import weaviate from "weaviate-ts-client";
import { MemeSchema } from "../schemas/meme-schema";
import { createWeaviateClient } from "../create-client";
import { program } from "../program";

program
  .command("upload-memes")
  .argument("<directory>", "directory with images")
  .description("Upload images as memes")
  .action(async (directory) => {
    if (directory) {
      await uploadImages(directory);
    } else {
      console.error(
        "Error: Please provide a directory with images using the --dir option."
      );
      process.exit(1);
    }
  });

async function uploadImages(dir: string) {
  const files = fs.readdirSync(dir);

  const client = createWeaviateClient();

  const bar1 = new cliProgress.SingleBar(
    {
      format: " {bar} | {filename} | {value}/{total}",
    },
    cliProgress.Presets.shades_classic
  );

  bar1.start(files.length, 0);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const ext = path.extname(fullPath).toLowerCase();

    if ([".jpg", ".jpeg", ".png", ".gif"].includes(ext)) {
      const img = fs.readFileSync(fullPath);
      const b64 = Buffer.from(img).toString("base64");
      if (!MemeSchema.class) throw new Error("No class name defined in schema");

      bar1.update(files.indexOf(file) + 1, {
        filename: `Uploading ${file}...`,
      });

      await client.data
        .creator()
        .withClassName(MemeSchema.class)
        .withProperties({
          image: b64,
          text: file,
        })
        .do();
    }
  }
}

const filter = {
  _and: [
    {
      _or: [
        {
          invoice: {
            counterpart_id: {
              _eq: "zxcdfg-b255-46da-b8dc-a01219539ec8",
            },
          },
        },
        {
          invoice: {
            counterpart_id: {
              _eq: "qweasd-b255-46da-b8dc-a01219539ec9",
            },
          },
        },
      ],
    },
    {
      invoice: {
        amount: {
          _gt: 300,
        },
      },
    },
    {
      invoice: {
        amount: {
          _lt: 6000,
        },
      },
    },
  ],
};
