'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { sanityApiVersion, sanityDataset, sanityProjectId } from '@/lib/env';
import { schemaTypes } from '@/sanity/schema-types';

export default defineConfig({
  name: 'leseft-website',
  title: 'LESEFT CMS',
  projectId: sanityProjectId || '',
  dataset: sanityDataset || 'production',
  basePath: '/studio',
  apiVersion: sanityApiVersion,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
