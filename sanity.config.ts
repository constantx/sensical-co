'use client';
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/(sanity)/studio/[[...tool]]/page.tsx` route
 */
import { visionTool } from '@sanity/vision';
import { PluginOptions, defineConfig } from 'sanity';
import {
  unsplashImageAsset,
} from 'sanity-plugin-asset-source-unsplash';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import {
  dashboardTool,
  projectUsersWidget,
  projectInfoWidget,
} from '@sanity/dashboard';

import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
} from '@/sanity/lib/api';
import { locate } from '@/sanity/plugins/locate';
import {
  pageStructure,
  singletonPlugin,
} from '@/sanity/plugins/settings';
import { assistWithPresets } from '@/sanity/plugins/assist';

import settings from '@/sanity/schemas/singletons/settings';
import page from '@/sanity/schemas/documents/page';
import author from '@/sanity/schemas/documents/author';
import post from '@/sanity/schemas/documents/post';
import story from '@/sanity/schemas/documents/story';
import category from '@/sanity/schemas/documents/category';
import tag from '@/sanity/schemas/documents/tag';

// import autodraft from '@/sanity/schemas/documents/autodraft/topic';
import section from '@/sanity/schemas/documents/section';
import hero from '@/sanity/schemas/documents/section-item/hero';
import pricing from '@/sanity/schemas/documents/section-item/pricing';
import testimony from '@/sanity/schemas/documents/section-item/testimony';
import usp from '@/sanity/schemas/documents/section-item/usp';
import waitlist from '@/sanity/schemas/documents/section-item/waitlist';
import interaction from '@/sanity/schemas/documents/section-item/interaction';
import faq from '@/sanity/schemas/documents/section-item/faq';


export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  schema: {
    types: [
      // Singletons
      settings,
      // Documents
      page,
      section,
      author,
      category,
      tag,
      story,
      
      // section-item
      faq,
      hero,
      pricing,
      testimony,
      usp,
      waitlist,
      interaction,
    ], 
  },
  /* document: {
    // ? https://www.sanity.io/docs/document-actions-api
    actions: (prev, context) => 
      // Only add the action for documents of type "movie"
      context.schemaType === 'topic'
        ? [...prev, ExampleAction]
        : prev,
    // ? https://www.sanity.io/docs/document-badges-api
  }, */
  plugins: [
    structureTool({ structure: pageStructure([settings]) }),
    
    // https://www.sanity.io/docs/configuring-the-presentation-tool
    presentationTool({
      locate,
      previewUrl: { previewMode: { enable: '/api/draft' } },
    }),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    process.env.NODE_ENV === 'development' &&
    visionTool({ defaultApiVersion: apiVersion }),

    // https://www.sanity.io/docs/dashboard
    dashboardTool({
      widgets: [
        projectInfoWidget({ layout: { width: 'small' } }),
        projectUsersWidget({ layout: { width: 'small' } }),
      ],
    }),
    
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([settings.name]),
    // Add an image asset source for Unsplash
    // https://www.sanity.io/plugins/sanity-plugin-asset-source-unsplash
    unsplashImageAsset(),
    // Sets up AI Assist with preset prompts
    // https://www.sanity.io/docs/ai-assist
    assistWithPresets(),
  ].filter(Boolean) as PluginOptions[],
});
