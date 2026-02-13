import { getAllBlogPosts } from '@/lib/markdown';
import BlogList from '@/components/BlogList';

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#FDB614] via-[#FDB614] to-[#E91E63] pt-32 pb-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full animate-float" />
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-white rounded-full animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 uppercase tracking-tight">
              BLOG
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Follow our development journey, get behind-the-scenes insights, and learn about our
              process of creating indie games.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <BlogList posts={posts} />
          )}
        </div>
      </div>
    </>
  );
}
