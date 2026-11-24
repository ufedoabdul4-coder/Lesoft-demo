'use client';

import { defineConfig } from 'sanity';
import { structureTool, type StructureBuilder } from 'sanity/structure';

import { sanityApiVersion, sanityDataset, sanityProjectId } from '@/lib/env';
import { schemaTypes } from '@/sanity/schema-types';
import { singletonDocumentIds } from '@/sanity/lib/singletons';

function singletonListItem(S: StructureBuilder, id: string, title: string, schemaType: string) {
  return S.listItem()
    .id(id)
    .title(title)
    .child(S.document().schemaType(schemaType).documentId(id).title(title));
}

function studioStructure(S: StructureBuilder) {
  const singletonIds = new Set<string>(Object.values(singletonDocumentIds));

  return S.list()
    .title('Content')
    .items([
      singletonListItem(S, singletonDocumentIds.homepage, 'Homepage', 'homepage'),
      singletonListItem(S, singletonDocumentIds.about, 'About', 'about'),
      singletonListItem(S, singletonDocumentIds.partners, 'For partners', 'partners'),
      singletonListItem(S, singletonDocumentIds.contactInfo, 'Contact information', 'contactInfo'),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return typeof id !== 'string' || !singletonIds.has(id);
      }),
    ]);
}

export default defineConfig({
  name: 'leseft-website',
  title: 'LESEFT CMS',
  projectId: sanityProjectId || '',
  dataset: sanityDataset || 'production',
  basePath: '/studio',
  apiVersion: sanityApiVersion,
  plugins: [structureTool({ structure: studioStructure })],
  schema: { types: schemaTypes },
});
