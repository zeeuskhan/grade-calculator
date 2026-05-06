import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: any;
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonical, schema }) => {
  const siteName = 'CalculatorOfGrades.com';
  const baseUrl = 'https://calculatorofgrades.vercel.app';
  const fullTitle = `${title} | ${siteName}`;
  const canonicalUrl = canonical || `${baseUrl}${window.location.pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      
      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
