// components/seo/Meta.js
import { NextSeo } from 'next-seo';

const Meta = ({ title, description, canonical }) => (
  <NextSeo
    title={title}
    description={description}
    canonical={canonical}
    openGraph={{
      url: canonical,
      title,
      description,
    }}
  />
);

export default Meta;
