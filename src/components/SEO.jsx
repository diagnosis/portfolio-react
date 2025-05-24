import { useEffect } from 'react';

export function SEO({ title, description, keywords }) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const metaTags = {
      description: description,
      keywords: keywords,
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      if (content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = name;
          document.head.appendChild(meta);
        }
        meta.content = content;
      }
    });

    // Cleanup
    return () => {
      document.title = 'Safa Demirkan | Sr. Software Engineer in Test';
    };
  }, [title, description, keywords]);

  return null;
}