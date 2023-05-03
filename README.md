# Weaviate Memer CLI
A basic utility for uploading images and conducting similarity searches in the Weaviate database, serving as a practical example of its use.

## Installation
```bash
yarn && yarn build
```

### Running Weaviate DB
```bash
docker-compose up
```

### Upload memes
```bash
yarn upload-memes
```

## Scripts

Here's a brief explanation of the scripts defined in the `package.json`:

- `dev`: This script watches for changes in the `src/main.ts` and builds it without creating source maps. It cleans the build directory before starting the build.

- `build`: This script builds the production version of the application. It cleans the build directory, compiles the `src/main.ts` into JavaScript, minifies the result, and stores it in the `dist` directory.

- `clean`: This script removes the `dist` directory using `rimraf`.

- `memmer`: This script runs the main script of the application using `ts-node`.

- `upload-memes`: This script uploads memes from the `./fixtures` directory.

- `find-image`: This script deletes the `found` directory, creates a new one, and runs the `find-image` command which stores its result in the `found` directory. Example: `yarn find-image ./path`

## Usage

`yarn memer [options] [command]`

Weaviate CLI for creating schemas and data.

## Options

- `-V, --version` - output the version number
- `--host <host>` - Weaviate host (default: "localhost:8080")
- `--scheme <host>` - Weaviate scheme (default: "http")
- `-h, --help` - display help for command

## Commands

- `upload-memes <directory>` - Upload images as memes
- `delete-memes` - Delete memes
- `find-image [options]` - Put found images into './found' directory
- `create-schema` - Create Meme schema
- `help [command]` - display help for command

## Links
* [Weaviate Tutorials](https://weaviate.io/developers/weaviate/tutorials)
* [YouTube Fireship Weaviate Tutorial](https://www.youtube.com/watch?v=Q4XKuJHQGxU)