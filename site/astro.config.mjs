// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://wmeints.github.io/effective-llm-applications-workshop",
  base: "/effective-llm-applications-workshop",
  integrations: [
    starlight({
      title: "Building Effective LLM-based applications with Semantic Kernel",
      social: {
        github:
          "https://github.com/wmeints/effective-llm-applications-workshop",
      },
      sidebar: [
        {
          label: "Modules",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Fundamentals & environment setup", slug: "guides/01-fundamentals" },
            { label: "Document processing and embeddings", slug: "guides/02-document-processing-and-embeddings" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
