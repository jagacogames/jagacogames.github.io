import type { BlogPost, Game, GameMetadata } from '@/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jagaco.com';

/**
 * Organization structured data for Jagaco Games
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Jagaco Games',
    url: SITE_URL,
    logo: `${SITE_URL}/images/Jagaco_logo_plain.svg`,
    description: 'Jagaco Games is a small indie game developer building entertainment and educational games that blend playful design with thoughtful storytelling.',
    sameAs: [
      'https://twitter.com/JagacoGames',
      'https://www.youtube.com/@jagacogames',
      'https://www.facebook.com/jagacogames',
    ],
    foundingDate: '2014',
    founders: [
      {
        '@type': 'Person',
        name: 'Vincent Broeren',
        jobTitle: 'Codin Paladin',
      },
      {
        '@type': 'Person',
        name: 'Remco Brilstra',
        jobTitle: 'Code Rogue',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NL',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'info@jagaco.com',
    },
  };
}

/**
 * WebSite structured data with search action
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Jagaco Games',
    url: SITE_URL,
    description: 'Indie game development studio creating unique and engaging gaming experiences',
    publisher: {
      '@type': 'Organization',
      name: 'Jagaco Games',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/Jagaco_logo_plain.svg`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Article structured data for blog posts
 */
export function getArticleSchema(post: BlogPost) {
  const date = new Date(post.date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const postUrl = `${SITE_URL}/${year}/${month}/${day}/${post.slug}`;
  const imageUrl = post.featuredImage
    ? (post.featuredImage.startsWith('http') ? post.featuredImage : `${SITE_URL}${post.featuredImage}`)
    : `${SITE_URL}/og/${post.slug}.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jagaco Games',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/Jagaco_logo_plain.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags.join(', '),
    articleSection: 'Game Development',
    inLanguage: 'en-US',
  };
}

/**
 * BreadcrumbList structured data for blog posts
 */
export function getBlogBreadcrumbSchema(post: BlogPost) {
  const date = new Date(post.date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/${year}/${month}/${day}/${post.slug}`,
      },
    ],
  };
}

/**
 * VideoGame/Product structured data for games
 */
export function getVideoGameSchema(game: Game) {
  const gameUrl = `${SITE_URL}/games/${game.slug}`;
  const imageUrl = game.thumbnail
    ? (game.thumbnail.startsWith('http') ? game.thumbnail : `${SITE_URL}${game.thumbnail}`)
    : `${SITE_URL}/images/og-image.png`;

  // Build offers array if store links exist
  const offers = [];
  if (game.storeLinks) {
    if (game.storeLinks.steam) {
      offers.push({
        '@type': 'Offer',
        url: game.storeLinks.steam,
        availability: 'https://schema.org/InStock',
        price: '0',
        priceCurrency: 'USD',
        seller: {
          '@type': 'Organization',
          name: 'Steam',
        },
      });
    }
    if (game.storeLinks.itch) {
      offers.push({
        '@type': 'Offer',
        url: game.storeLinks.itch,
        availability: 'https://schema.org/InStock',
        price: '0',
        priceCurrency: 'USD',
        seller: {
          '@type': 'Organization',
          name: 'Itch.io',
        },
      });
    }
    if (game.storeLinks.gog) {
      offers.push({
        '@type': 'Offer',
        url: game.storeLinks.gog,
        availability: 'https://schema.org/InStock',
        price: '0',
        priceCurrency: 'USD',
        seller: {
          '@type': 'Organization',
          name: 'GOG',
        },
      });
    }
  }

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.title,
    description: game.description,
    image: imageUrl,
    url: gameUrl,
    genre: game.genre,
    gamePlatform: game.platforms,
    datePublished: game.releaseDate,
    publisher: {
      '@type': 'Organization',
      name: 'Jagaco Games',
      url: SITE_URL,
    },
    creator: {
      '@type': 'Organization',
      name: 'Jagaco Games',
      url: SITE_URL,
    },
    inLanguage: 'en-US',
  };

  // Add offers if any exist
  if (offers.length > 0) {
    schema.offers = offers;
  }

  // Add screenshots if available
  if (game.screenshots && game.screenshots.length > 0) {
    schema.screenshot = game.screenshots.map(screenshot => ({
      '@type': 'ImageObject',
      url: screenshot.startsWith('http') ? screenshot : `${SITE_URL}${screenshot}`,
      contentUrl: screenshot.startsWith('http') ? screenshot : `${SITE_URL}${screenshot}`,
    }));
  }

  // Add features as game features
  if (game.features && game.features.length > 0) {
    schema.gameFeature = game.features;
  }

  return schema;
}

/**
 * BreadcrumbList structured data for game pages
 */
export function getGameBreadcrumbSchema(game: Game) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Games',
        item: `${SITE_URL}/games`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: game.title,
        item: `${SITE_URL}/games/${game.slug}`,
      },
    ],
  };
}

/**
 * ItemList structured data for game listing page
 */
export function getGameListSchema(games: GameMetadata[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Jagaco Games Portfolio',
    description: 'Collection of games developed by Jagaco Games',
    numberOfItems: games.length,
    itemListElement: games.map((game, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'VideoGame',
        name: game.title,
        description: game.description,
        url: `${SITE_URL}/games/${game.slug}`,
        image: game.thumbnail?.startsWith('http') ? game.thumbnail : `${SITE_URL}${game.thumbnail}`,
        genre: game.genre,
      },
    })),
  };
}

/**
 * Helper function to serialize structured data to JSON-LD string
 */
export function serializeStructuredData(data: Record<string, unknown> | Record<string, unknown>[]): string {
  return JSON.stringify(data, null, 2);
}
