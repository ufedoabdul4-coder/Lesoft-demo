import { isSanityConfigured } from '@/lib/env';
import type {
  AboutContent,
  Commodity,
  ContactContent,
  ContentResult,
  Equipment,
  HomepageContent,
  PartnersContent,
  Project,
  PublishedDocument,
} from '@/lib/types';
import { getConfiguredClient } from '@/sanity/lib/client';
import {
  aboutQuery,
  commoditiesQuery,
  contactQuery,
  equipmentQuery,
  homepageQuery,
  partnersQuery,
  projectsQuery,
} from '@/sanity/lib/queries';
import { singletonDocumentIds } from '@/sanity/lib/singletons';

const REVALIDATE_SECONDS = 60;

const legacyHomepageCopy = new Set([
  'MRS LESOFTS DEMONSTRATION',
  'A SIMPLE DEMO PROJECT',
  'A VERY GOOD DESCRIPTION OF COMPETENCE',
  'AN IMAGE DISPLAYING FOREX COMPETENCE',
  'AN IMAGE OF FOREX COMPETENCE',
  'BABA J',
]);

type FetchOptions = {
  query: string;
  tag: string;
};

type SingletonFetchOptions<T> = FetchOptions & {
  note: string;
  preferredDocumentId: string;
  validate: (value: unknown) => boolean;
};

function emptyResult<T>(note?: string): ContentResult<T> {
  return { data: null, source: 'empty', note };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function hasImage(value: unknown): boolean {
  return isRecord(value) && hasText(value.url) && hasText(value.alt);
}

function hasNonEmptyStrings(value: unknown): boolean {
  return Array.isArray(value) && value.length > 0 && value.every(hasText);
}

function isValidEmail(value: unknown): boolean {
  return hasText(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isLegacyHomepageCopy(value: Record<string, unknown>): boolean {
  const values = [value.heading, value.subtitle, value.description, value.ctaText];

  if (isRecord(value.heroImage)) {
    values.push(value.heroImage.alt);
  }

  return values.some((item) => hasText(item) && legacyHomepageCopy.has(item.trim().toUpperCase()));
}

function isValidHomepageContent(value: unknown): boolean {
  if (!isRecord(value)) {
    return false;
  }

  return (
    hasText(value.heading) &&
    hasText(value.subtitle) &&
    hasText(value.description) &&
    hasImage(value.heroImage) &&
    hasText(value.ctaText) &&
    hasText(value.ctaLink) &&
    !isLegacyHomepageCopy(value)
  );
}

function isValidAboutContent(value: unknown): boolean {
  if (!isRecord(value)) {
    return false;
  }

  return (
    hasText(value.introduction) &&
    hasText(value.mission) &&
    hasText(value.vision) &&
    hasImage(value.image)
  );
}

function isValidPartnersContent(value: unknown): boolean {
  if (!isRecord(value)) {
    return false;
  }

  return (
    hasText(value.introduction) &&
    hasNonEmptyStrings(value.benefits) &&
    hasText(value.enquiryCtaText) &&
    hasText(value.enquiryCtaLink)
  );
}

function isValidContactContent(value: unknown): boolean {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isValidEmail(value.email) &&
    hasText(value.phone) &&
    hasText(value.address) &&
    hasText(value.contactDescription)
  );
}

function stripDocumentMetadata<T>(document: PublishedDocument<T>): T {
  const content = { ...document } as Record<string, unknown>;

  delete content._id;
  delete content._createdAt;
  delete content._updatedAt;

  return content as T;
}

async function fetchSanity<T>(options: FetchOptions): Promise<{ result: T | null; errorNote?: string }> {
  if (!isSanityConfigured()) {
    return {
      result: null,
      errorNote: 'Sanity credentials are not configured in this environment.',
    };
  }

  try {
    const result = await getConfiguredClient().fetch<T>(options.query, {}, {
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ['sanity-content', options.tag],
      },
    });

    return { result: result ?? null };
  } catch (error) {
    console.error('Unable to load content from Sanity:', error);
    return { result: null, errorNote: 'Published content could not be loaded.' };
  }
}

async function fetchContent<T>(options: FetchOptions & { note: string }): Promise<ContentResult<T>> {
  const { result, errorNote } = await fetchSanity<T>(options);

  if (errorNote) {
    return emptyResult(errorNote);
  }

  if (!result || (Array.isArray(result) && result.length === 0)) {
    return emptyResult(options.note);
  }

  return { data: result, source: 'sanity' };
}

async function fetchSingletonContent<T>(options: SingletonFetchOptions<T>): Promise<ContentResult<T>> {
  const { result, errorNote } = await fetchSanity<PublishedDocument<T>[]>(options);

  if (errorNote) {
    return emptyResult(errorNote);
  }

  const documents = Array.isArray(result) ? result : [];
  const validDocuments = documents.filter(options.validate);
  const selected =
    validDocuments.find((document) => document._id === options.preferredDocumentId) ?? validDocuments[0];

  if (!selected) {
    return emptyResult(options.note);
  }

  return { data: stripDocumentMetadata(selected), source: 'sanity' };
}

export function getHomepageContent() {
  return fetchSingletonContent<HomepageContent>({
    query: homepageQuery,
    tag: 'homepage',
    note: 'Published homepage content is not available.',
    preferredDocumentId: singletonDocumentIds.homepage,
    validate: isValidHomepageContent,
  });
}

export function getAboutContent() {
  return fetchSingletonContent<AboutContent>({
    query: aboutQuery,
    tag: 'about',
    note: 'Published about content is not available.',
    preferredDocumentId: singletonDocumentIds.about,
    validate: isValidAboutContent,
  });
}

export function getCommodities() {
  return fetchContent<Commodity[]>({
    query: commoditiesQuery,
    tag: 'commodities',
    note: 'Published commodity content is not available.',
  });
}

export function getEquipment() {
  return fetchContent<Equipment[]>({
    query: equipmentQuery,
    tag: 'equipment',
    note: 'Published equipment content is not available.',
  });
}

export function getProjects() {
  return fetchContent<Project[]>({
    query: projectsQuery,
    tag: 'projects',
    note: 'Published project content is not available.',
  });
}

export function getPartnersContent() {
  return fetchSingletonContent<PartnersContent>({
    query: partnersQuery,
    tag: 'partners',
    note: 'Published partner content is not available.',
    preferredDocumentId: singletonDocumentIds.partners,
    validate: isValidPartnersContent,
  });
}

export function getContactContent() {
  return fetchSingletonContent<ContactContent>({
    query: contactQuery,
    tag: 'contact',
    note: 'Published contact content is not available.',
    preferredDocumentId: singletonDocumentIds.contactInfo,
    validate: isValidContactContent,
  });
}
