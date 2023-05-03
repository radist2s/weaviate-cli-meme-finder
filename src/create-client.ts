import weaviate from "weaviate-ts-client";
import { program } from "./program";

export const createWeaviateClient = () => {
  return weaviate.client({
    scheme: program.getOptionValue("scheme"),
    host: program.getOptionValue("host"),
  });
};
