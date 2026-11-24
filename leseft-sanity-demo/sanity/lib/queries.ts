const imageProjection = `{
  "url": asset->url,
  "alt": coalesce(alt, "")
}`;

export const homepageQuery = `*[_type == "homepage"][0]{
  heading,
  subtitle,
  description,
  "heroImage": heroImage ${imageProjection},
  ctaText,
  ctaLink
}`;

export const aboutQuery = `*[_type == "about"][0]{
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

export const partnersQuery = `*[_type == "partners"][0]{
  introduction,
  benefits,
  enquiryCtaText,
  enquiryCtaLink
}`;

export const contactQuery = `*[_type == "contactInfo"][0]{
  email,
  phone,
  address,
  contactDescription
}`;
