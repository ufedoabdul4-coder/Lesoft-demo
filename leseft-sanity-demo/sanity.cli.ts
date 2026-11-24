import { defineCliConfig } from 'sanity/cli';

import { sanityDataset, sanityProjectId } from '@/lib/env';

export default defineCliConfig({
  api: {
    projectId: sanityProjectId ?? '',
    dataset: sanityDataset || 'production',
  },
});
