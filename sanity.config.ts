import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemas } from "./app/lib/sanity/schemas";

const config = defineConfig({
  projectId: "n6m20cm5",
  dataset: "production",
  title: "My Personal Website",
  apiVersion: "2023-03-09",
  basePath: "/sanity",
  plugins: [structureTool()],
  schema: { types: schemas },
});

export default config;
