import fs from "fs";
import path from "path";
import weaviate from "weaviate-ts-client";
import { MemeSchema } from "../schemas/meme-schema";
import { createWeaviateClient } from "../create-client";
import { program } from "../program";

program
  .command("delete-memes")
  .description("Delete memes")
  .action(async () => {
    console.log(`Deleting ${MemeSchema.class}...`);
    await deleteMemeClass();
  });

async function deleteMemeClass() {
  const client = createWeaviateClient();

  if (!MemeSchema.class) throw new Error("No class name defined in schema");

  await client.schema.classDeleter().withClassName(MemeSchema.class).do();
}
