import { groq } from 'next-sanity';

const pageFields = /* groq */ `
  ...,
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  coverImage{
    ...,
    "metadata": asset->metadata
  },
  pageHeading,
  pageContent,
  sections[]->{
    ...,
    coverImage{
      ...,
      "metadata": asset->metadata{
        blurHash
      }
    },
    content[]->{
      ...,
      coverImage{
        ...,
        "metadata": asset->metadata
      }
    }
  },
  "publishedAt": coalesce(publishedAt, _updatedAt)
`;

export const settingsQuery = groq`*[_type == "settings"][0]`;

export const faqsQuery = groq`*[_type == "faq"]{
  _id,
  question,
  answer,
  publishedAt,
  priority,
} | order(priority asc) | order(publishedAt desc)`;

export const pageBySlugQuery = groq`*[_type == "page" && (slug.current == $slug || _id == $slug)] [0] {
  ${pageFields}
}`;