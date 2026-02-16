import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Follow our development journey at Jagaco Games. Get behind-the-scenes insights, technical deep dives, and learn about our process of creating indie games.',
  openGraph: {
    title: 'Blog | Jagaco Games',
    description: 'Development insights, technical articles, and the story behind our indie games',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
