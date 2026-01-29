import Link from 'next/link';
import { BlogPostMetadata } from '@/types';

interface BlogCardProps {
  post: BlogPostMetadata;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Generate URL with date structure: /YYYY/MM/DD/slug
  const getPostUrl = (post: BlogPostMetadata) => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `/${year}/${month}/${day}/${post.slug}`;
  };

  return (
    <Link href={getPostUrl(post)}>
      <article className="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-cyan-400 transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
        {post.featuredImage ? (
          <div className="aspect-video bg-gray-700 relative overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video bg-gray-700 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM13.96 12.29l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"/>
              </svg>
            </div>
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center text-sm text-gray-400 mb-3">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 flex-grow">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-700 text-cyan-400 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
