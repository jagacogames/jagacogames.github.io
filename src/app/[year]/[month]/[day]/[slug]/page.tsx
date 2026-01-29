import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Metadata } from 'next';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/markdown';

interface PageProps {
  params: Promise<{
    year: string;
    month: string;
    day: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => {
    const date = new Date(post.date);
    return {
      year: date.getFullYear().toString(),
      month: String(date.getMonth() + 1).padStart(2, '0'),
      day: String(date.getDate()).padStart(2, '0'),
      slug: post.slug,
    };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jagaco.com';
  const date = new Date(post.date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const postUrl = `${siteUrl}/${year}/${month}/${day}/${post.slug}`;
  const imageUrl = post.featuredImage
    ? `${siteUrl}${post.featuredImage}`
    : `${siteUrl}/images/default-og.png`;

  return {
    title: `${post.title} | Jagaco Studios`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: postUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: 'Jagaco Studios',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
      creator: '@JagacoGames',
    },
    alternates: {
      canonical: postUrl,
    },
    keywords: post.tags.join(', '),
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{post.author}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-800 text-cyan-400 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ ...props }) => (
                <h1 className="text-4xl font-bold text-white mt-8 mb-4" {...props} />
              ),
              h2: ({ ...props }) => (
                <h2 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />
              ),
              h3: ({ ...props }) => (
                <h3 className="text-2xl font-bold text-white mt-6 mb-3" {...props} />
              ),
              h4: ({ ...props }) => (
                <h4 className="text-xl font-bold text-white mt-4 mb-2" {...props} />
              ),
              p: ({ ...props }) => (
                <p className="text-gray-300 mb-4 leading-relaxed" {...props} />
              ),
              a: ({ ...props }) => (
                <a className="text-cyan-400 hover:text-cyan-300 transition-colors underline" {...props} />
              ),
              ul: ({ ...props }) => (
                <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2" {...props} />
              ),
              ol: ({ ...props }) => (
                <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2" {...props} />
              ),
              li: ({ ...props }) => (
                <li className="text-gray-300" {...props} />
              ),
              blockquote: ({ ...props }) => (
                <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-gray-400 my-4" {...props} />
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="bg-gray-800 text-cyan-400 px-1.5 py-0.5 rounded text-sm" {...props}>
                    {children}
                  </code>
                ) : (
                  <code className="block bg-gray-800 text-cyan-400 p-4 rounded-lg overflow-x-auto text-sm" {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({ ...props }) => (
                <pre className="bg-gray-800 rounded-lg overflow-x-auto mb-4" {...props} />
              ),
              hr: ({ ...props }) => (
                <hr className="border-gray-700 my-8" {...props} />
              ),
              strong: ({ ...props }) => (
                <strong className="text-white font-semibold" {...props} />
              ),
              em: ({ ...props }) => (
                <em className="text-gray-300 italic" {...props} />
              ),
              img: ({ src, alt, ...props }) => {
                // Transform relative image paths to absolute paths
                let imageSrc = typeof src === 'string' ? src : '';

                if (imageSrc && !imageSrc.startsWith('http')) {
                  // Handle editor-friendly paths: ../../public/blog/slug/image.jpg -> /blog/slug/image.jpg
                  if (imageSrc.includes('../../public/')) {
                    imageSrc = '/' + imageSrc.split('../../public/')[1];
                  }
                  // Handle simple relative paths: ./image.jpg or image.jpg -> /blog/slug/image.jpg
                  else if (!imageSrc.startsWith('/')) {
                    imageSrc = imageSrc.replace(/^\.\//, '');
                    imageSrc = `/blog/${slug}/${imageSrc}`;
                  }
                }

                return (
                  <img
                    src={imageSrc}
                    alt={alt || ''}
                    className="rounded-lg my-6 max-w-full h-auto"
                    {...props}
                  />
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-800">
          <Link
            href="/blog"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </footer>
      </article>
    </div>
  );
}
