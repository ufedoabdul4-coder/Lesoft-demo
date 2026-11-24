const imageProjection = `{
  "url": asset->url,
  "alt": coalesce(alt, "")
}`;

const singletonOrder = '| order(_updatedAt desc, _createdAt desc, _id asc)';
const singletonMetadata = '_id, _createdAt, _updatedAt,';

export const homepageQuery = `*[
  _type == "homepage"
  && defined(heading)
  && defined(subtitle)
  && defined(description)
  && defined(heroImage.asset)
  && defined(heroImage.alt)
  && defined(ctaText)
  && defined(ctaLink)
] ${singletonOrder} {
  ${singletonMetadata}
  heading,
  subtitle,
  description,
  "heroImage": heroImage ${imageProjection},
  ctaText,
  ctaLink
}`;

export const aboutQuery = `*[
  _type == "about"
  && defined(introduction)
  && defined(mission)
  && defined(vision)
  && defined(image.asset)
  && defined(image.alt)
] ${singletonOrder} {
  ${singletonMetadata}
  introduction,
  mission,
  vision,
  "image": image ${imageProjection}
}`;

export const commoditiesQuery = `*[_type == "commodity"] | order(orderRank asc, name asc){
  "id": _id,
  name,
  description,
  category,
  "image": image ${imageProjection}
}`;

export const equipmentQuery = `*[_type == "equipment"] | order(orderRank asc, name asc){
  "id": _id,
  name,
  description,
  "image": image ${imageProjection}
}`;

export const projectsQuery = `*[_type == "project"] | order(orderRank asc, title asc){
  "id": _id,
  title,
  description,
  serviceCategory,
  "image": image ${imageProjection}
}`;

export const partnersQuery = `*[
  _type == "partners"
  && defined(introduction)
  && count(benefits) > 0
  && defined(enquiryCtaText)
  && defined(enquiryCtaLink)
] ${singletonOrder} {
  ${singletonMetadata}
  introduction,
  benefits,
  enquiryCtaText,
  enquiryCtaLink
}`;

export const contactQuery = `*[
  _type == "contactInfo"
  && defined(email)
  && defined(phone)
  && defined(address)
  && defined(contactDescription)
] ${singletonOrder} {
  ${singletonMetadata}
  email,
  phone,
  address,
  contactDescription
}`;
