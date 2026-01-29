import { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/markdown';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Follow our development journey at Jagaco Studios. Get behind-the-scenes insights, technical deep dives, and learn about our process of creating indie games like Quinn\'s Quest.',
  openGraph: {
    title: 'Blog | Jagaco Studios',
    description: 'Development insights, technical articles, and the story behind our indie games',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-gray-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Follow our development journey, get behind-the-scenes insights, and learn about our
            process of creating indie games.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
