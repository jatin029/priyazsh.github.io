import { BlogPost } from './posts';

export function generatePersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Priyansh Prajapat',
    alternateName: 'oyepriyansh',
    description: '21-year-old self-taught full stack developer from India',
    url: 'https://oyepriyansh.github.io',
    image: 'https://oyepriyansh.github.io/oyepriyansh.webp',
    sameAs: [
      'https://github.com/oyepriyansh',
      'https://twitter.com/oyepriyansh',
      'https://linkedin.com/in/priyanshprajapat',
      'https://instagram.com/oyepriyansh'
    ],
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    },
    nationality: {
      '@type': 'Country',
      name: 'India'
    },
    knowsAbout: [
      'JavaScript',
      'Next.js',
      'React',
      'Java',
      'Web Development',
      'Frontend Development',
      'Backend Development'
    ],
    email: 'priyanshprajapat@duck.com'
  };
}

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Priyansh Prajapat',
    description: 'Portfolio and blog of Priyansh Prajapat, a full stack developer from India',
    url: 'https://oyepriyansh.github.io',
    author: {
      '@type': 'Person',
      name: 'Priyansh Prajapat'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://oyepriyansh.github.io/blog?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateBlogJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Priyansh Prajapat Blog',
    description: 'Thoughts on development, technology, and my journey as a self-taught programmer',
    url: 'https://oyepriyansh.github.io/blog',
    author: {
      '@type': 'Person',
      name: 'Priyansh Prajapat',
      url: 'https://oyepriyansh.github.io'
    },
    publisher: {
      '@type': 'Person',
      name: 'Priyansh Prajapat',
      url: 'https://oyepriyansh.github.io'
    }
  };
}

export function generateArticleJsonLd(post: BlogPost, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: 'https://oyepriyansh.github.io/oyepriyansh.webp',
    author: {
      '@type': 'Person',
      name: 'Priyansh Prajapat',
      url: 'https://oyepriyansh.github.io'
    },
    publisher: {
      '@type': 'Person',
      name: 'Priyansh Prajapat',
      url: 'https://oyepriyansh.github.io'
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://oyepriyansh.github.io/blog/${slug}`
    },
    keywords: post.tags.join(', '),
    articleSection: 'Technology',
    inLanguage: 'en-US',
    url: `https://oyepriyansh.github.io/blog/${slug}`
  };
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}