import { Command } from "commander";

export const program = new Command();

program
  .name("Weaviate CLI")
  .description("Weaviate CLI for creating schemas and data")
  .version("1.0.0")

  .option("--host <host>", "Weaviate host", "localhost:8080")
  .option("--scheme <host>", "Weaviate scheme", "http");
