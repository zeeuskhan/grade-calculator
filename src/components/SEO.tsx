import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  schema?: any;
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonical, ogImage, schema }) => {
  const baseUrl = 'https://calculatorofgrades.vercel.app';
  
  // Clean canonical logic:
  let canonicalUrl = '';
  if (canonical) {
    canonicalUrl = canonical.startsWith('http') ? canonical : `${baseUrl}${canonical}`;
  } else {
    let pathname = window.location.pathname;
    // Lowercase and remove trailing slash for consistency (except root)
    if (pathname.length > 1 && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }
    canonicalUrl = `${baseUrl}${pathname.toLowerCase()}`;
  }

  const finalOgImage = ogImage || `${baseUrl}/og-image.jpg`;

  return (
    <Helmet>
      {/* Primary Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={finalOgImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalOgImage} />
      
      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {typeof schema === 'string' ? schema : JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
