import "./commands/upload-memes";
import "./commands/delete-memes";
import "./commands/find-image";
import "./commands/create-schema";
import { program } from "./program";

program.parse(process.argv);
