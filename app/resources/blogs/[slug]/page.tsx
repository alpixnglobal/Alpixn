import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlackbarBg from "@/components/sections/blog/BlackbarBg";
import BlogDetailsSection from "@/components/sections/blog/blog-details/BlogDetailsSection";
import { getPublishedBlogPostBySlug, getPublishedBlogPosts, getResourceUiSettings } from "@/lib/content-service";

interface BlogDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

const BlogDetailsPage = async ({ params }: BlogDetailsPageProps) => {
  const { slug } = await params;
  const [post, posts, uiSettings] = await Promise.all([getPublishedBlogPostBySlug(slug), getPublishedBlogPosts(), getResourceUiSettings()]);

  if (!post) {
    notFound();
  }

  const relatedPosts = posts.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <BlogDetailsSection
        post={post}
        relatedPosts={relatedPosts}
        authorSummaryTemplate={uiSettings.blogs.authorSummaryTemplate}
        detailsTitle={uiSettings.blogs.detailsTitle}
        relatedTitle={uiSettings.blogs.relatedTitle}
        noRelatedMessage={uiSettings.blogs.noRelatedMessage}
      />
      <BlackbarBg />
    </>
  );
};

export default BlogDetailsPage;
