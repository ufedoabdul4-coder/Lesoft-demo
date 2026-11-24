import { createClient } from 'next-sanity';

import {
  isSanityConfigured,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from '@/lib/env';

let client: ReturnType<typeof createClient> | undefined;

export function getConfiguredClient() {
  if (!isSanityConfigured()) {
    throw new Error('Sanity is not configured. Add the public project ID and dataset to .env.local.');
  }

  if (!client) {
    client = createClient({
      projectId: sanityProjectId as string,
      dataset: sanityDataset as string,
      apiVersion: sanityApiVersion,
      useCdn: false,
    });
  }

  return client;
}
