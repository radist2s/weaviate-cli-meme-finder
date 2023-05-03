import weaviate, { WeaviateClass } from "weaviate-ts-client";
import { MemeSchema } from "../schemas/meme-schema";
import { createWeaviateClient } from "../create-client";
import { program } from "../program";

program
  .command("create-schema")
  .description("Create Meme schema")
  .action(async () => {
    try {
      console.log(`Creating ${MemeSchema.class}...`);
      await createSchema(MemeSchema);
      console.log("Schema successfully created.");
    } catch (error) {
      console.error("Creation error", error);
    }
  });

export async function createSchema(schema: WeaviateClass) {
  const client = createWeaviateClient();
  await client.schema.classCreator().withClass(schema).do();
}
