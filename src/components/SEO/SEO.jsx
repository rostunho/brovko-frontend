import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, imageUrl, url }) => {
  const baseUrl = process.env.REACT_APP_PUBLIC_URL;
  const fullUrl = baseUrl + (url || '');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={baseUrl + imageUrl} />}
      {url && <meta property="og:url" content={fullUrl} />}
    </Helmet>
  );
};

export default SEO;
