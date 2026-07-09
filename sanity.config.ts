import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'

// @sanity/vision is an optional dev-only plugin for running GROQ queries in
// the Studio.  Install it with:
//   npm install --save-dev @sanity/vision
// Then uncomment the two lines below.
// import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: 'wethink-bharat',
  title: 'WeThink Bharat CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    // visionTool(),   // ← uncomment after installing @sanity/vision
  ],
  schema: {
    types: schemaTypes,
  },
})
