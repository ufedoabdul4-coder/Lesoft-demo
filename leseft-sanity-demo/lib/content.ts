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

const REVALIDATE_SECONDS = 60;

type FetchOptions = {
  query: string;
  tag: string;
  note: string;
  validate?: (value: unknown) => boolean;
};

const unusableCopyPattern = /demo|demonstration|forex|meridian|sample/i;

function isValidHomepageContent(value: unknown): boolean {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const content = value as Partial<HomepageContent>;
  const fields = [
    content.heading,
    content.subtitle,
    content.description,
    content.ctaText,
    content.ctaLink,
    content.heroImage?.url,
    content.heroImage?.alt,
  ];

  return fields.every(
    (field) => typeof field === 'string' && field.trim().length > 0 && !unusableCopyPattern.test(field),
  );
}

async function fetchContent<T>(options: FetchOptions): Promise<ContentResult<T>> {
  if (!isSanityConfigured()) {
    return {
      data: null,
      source: 'empty',
      note: 'Sanity credentials are not configured in this environment.',
    };
  }

  try {
    const result = await getConfiguredClient().fetch<T>(options.query, {}, {
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ['sanity-content', options.tag],
      },
    });

    if (!result || (Array.isArray(result) && result.length === 0)) {
      return { data: null, source: 'empty', note: options.note };
    }

    if (options.validate && !options.validate(result)) {
      return {
        data: null,
        source: 'empty',
        note: 'Published content is not available.',
      };
    }

    return { data: result, source: 'sanity' };
  } catch (error) {
    console.error('Unable to load content from Sanity:', error);
    return {
      data: null,
      source: 'empty',
      note: 'Published content could not be loaded.',
    };
  }
}

export function getHomepageContent() {
  return fetchContent<HomepageContent>({
    query: homepageQuery,
    tag: 'homepage',
    note: 'Published homepage content is not available.',
    validate: isValidHomepageContent,
  });
}

export function getAboutContent() {
  return fetchContent<AboutContent>({
    query: aboutQuery,
    tag: 'about',
    note: 'Published about content is not available.',
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
  return fetchContent<PartnersContent>({
    query: partnersQuery,
    tag: 'partners',
    note: 'Published partner content is not available.',
  });
}

export function getContactContent() {
  return fetchContent<ContactContent>({
    query: contactQuery,
    tag: 'contact',
    note: 'Published contact content is not available.',
  });
}
