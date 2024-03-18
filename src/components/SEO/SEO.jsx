import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, imageUrl, url }) => {
  const baseUrl = process.env.REACT_APP_PUBLIC_URL;
  const fullUrl = baseUrl + (url || '');

  return (
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={baseUrl + imageUrl} />}
      {url && <meta property="og:url" content={fullUrl} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={baseUrl + imageUrl} />}
    </Helmet>
  );
};

export default SEO;
