export type MediaImage = {
  url: string;
  alt: string;
};

export type HomepageContent = {
  heading: string;
  subtitle: string;
  description: string;
  heroImage: MediaImage;
  ctaText: string;
  ctaLink: string;
};

export type AboutContent = {
  introduction: string;
  mission: string;
  vision: string;
  image: MediaImage;
};

export type Commodity = {
  id: string;
  name: string;
  description: string;
  category: string;
  image: MediaImage;
};

export type Equipment = {
  id: string;
  name: string;
  description: string;
  image: MediaImage;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  serviceCategory: string;
  image: MediaImage;
};

export type PartnersContent = {
  introduction: string;
  benefits: string[];
  enquiryCtaText: string;
  enquiryCtaLink: string;
};

export type ContactContent = {
  email: string;
  phone: string;
  address: string;
  contactDescription: string;
};

export type PublishedDocument<T> = T & {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
};

export type ContentResult<T> = {
  data: T | null;
  source: 'sanity' | 'empty';
  note?: string;
};
