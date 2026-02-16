import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
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
  const ogImageUrl = `${siteUrl}/og/${post.slug}.png`;

  return {
    title: `${post.title}`,
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
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: 'Jagaco Games',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
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
    <div className="min-h-screen bg-white">
      {/* Hero Header with Featured Image */}
      <header className="relative h-[350px] md:h-[400px] overflow-hidden">
        {/* Background Image */}
        {post.featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            {/* Overlay with blur and darken effect */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          </div>
        )}

        {/* Fallback gradient if no image */}
        {!post.featuredImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#E91E63] via-[#FDB614] to-[#E91E63]"></div>
        )}

        {/* Content */}
        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end py-12 pt-24">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-white/90">
              <li>
                <Link href="/" className="hover:text-[#FDB614] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#FDB614] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-white font-semibold truncate max-w-[200px] md:max-w-none">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Title and Meta */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight line-clamp-2">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <time dateTime={post.date} className="font-medium">
                {formatDate(post.date)}
              </time>
              <span>•</span>
              <span className="font-medium">{post.author}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/20 backdrop-blur-md text-white text-sm rounded-full font-semibold border border-white/30"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ ...props }) => (
                <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-4" {...props} />
              ),
              h2: ({ ...props }) => (
                <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4" {...props} />
              ),
              h3: ({ ...props }) => (
                <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3" {...props} />
              ),
              h4: ({ ...props }) => (
                <h4 className="text-xl font-bold text-gray-900 mt-4 mb-2" {...props} />
              ),
              p: ({ ...props }) => (
                <p className="text-gray-700 mb-4 leading-relaxed" {...props} />
              ),
              a: ({ ...props }) => (
                <a className="text-[#E91E63] hover:text-[#C2185B] transition-colors underline" {...props} />
              ),
              ul: ({ ...props }) => (
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2" {...props} />
              ),
              ol: ({ ...props }) => (
                <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2" {...props} />
              ),
              li: ({ ...props }) => (
                <li className="text-gray-700" {...props} />
              ),
              blockquote: ({ ...props }) => (
                <blockquote className="border-l-4 border-[#FDB614] pl-4 italic text-gray-600 my-4 bg-[#E8E8E8] py-2" {...props} />
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="bg-[#E8E8E8] text-[#E91E63] px-1.5 py-0.5 rounded text-sm font-semibold" {...props}>
                    {children}
                  </code>
                ) : (
                  <code className="block bg-[#E8E8E8] text-gray-800 p-4 rounded-lg overflow-x-auto text-sm" {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({ ...props }) => (
                <pre className="bg-[#E8E8E8] rounded-lg overflow-x-auto mb-4" {...props} />
              ),
              hr: ({ ...props }) => (
                <hr className="border-gray-300 my-8" {...props} />
              ),
              strong: ({ ...props }) => (
                <strong className="text-gray-900 font-bold" {...props} />
              ),
              em: ({ ...props }) => (
                <em className="text-gray-700 italic" {...props} />
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
                    className="rounded-lg my-6 max-w-full h-auto mx-auto block"
                    {...props}
                  />
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-300">
          <Link
            href="/blog"
            className="inline-flex items-center text-[#E91E63] hover:text-[#C2185B] transition-colors font-semibold"
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
