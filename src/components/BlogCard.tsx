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
      <article className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col border border-gray-200">
        {post.featuredImage ? (
          <div className="aspect-video bg-gray-200 relative overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM13.96 12.29l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"/>
              </svg>
            </div>
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2 uppercase hover:text-[#E91E63] transition-colors">
            {post.title}
          </h3>
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <p className="text-gray-600 text-sm mb-4 flex-grow leading-relaxed">{post.excerpt}</p>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#E8E8E8] text-gray-700 text-xs rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
