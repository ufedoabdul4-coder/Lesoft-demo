export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();
export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || '2025-02-01';
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3000';

export function isSanityConfigured(): boolean {
  return Boolean(sanityProjectId && sanityDataset);
}
