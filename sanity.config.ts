import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemas } from "@/lib/sanity/schemas";

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "my-project-id",
  dataset: "production",
  title: "My Personal Website",
  apiVersion: "2023-03-09",
  basePath: "/sanity",
  plugins: [structureTool()],
  schema: { types: schemas },
});

export default config;
