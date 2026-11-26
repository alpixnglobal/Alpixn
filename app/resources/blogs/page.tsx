import BlackbarBg from "@/components/sections/blog/BlackbarBg";
import BlogHeroSection from "@/components/sections/blog/BlogHeroSection";
import ExploreArticlesSection from "@/components/sections/blog/ExploreArticlesSection";
import LatestArticles from "@/components/sections/blog/LatestArticles";
import ContactExpert from "@/components/sections/nodejs-developer/ContactExpert";
import { getCachedBlogCategories, getCachedPublishedBlogPosts, getCachedPublishedFeaturedBlogPost, getCachedSiteSettings, getResourceUiSettings } from "@/lib/content-service";

const BlogsPage = async () => {
  const [posts, categories, featuredPost, siteSettings, uiSettings] = await Promise.all([
    getCachedPublishedBlogPosts(),
    getCachedBlogCategories(),
    getCachedPublishedFeaturedBlogPost(),
    getCachedSiteSettings(),
    getResourceUiSettings(),
  ]);
  const pageCopy = siteSettings.pageContent.blogs;

  return (
    <>
      <BlogHeroSection featuredPost={featuredPost} readButtonLabel={uiSettings.blogs.heroReadButtonLabel} />
      <ExploreArticlesSection posts={posts} categories={categories} title={pageCopy.sectionTitle} searchPlaceholder={uiSettings.blogs.searchPlaceholder} allCategoriesLabel={uiSettings.blogs.allCategoriesLabel} articlesFoundSuffix={uiSettings.blogs.articlesFoundSuffix} emptyMessage={uiSettings.blogs.emptyExploreMessage} />
      <LatestArticles posts={posts.filter((post) => featuredPost?._id !== post._id)} categories={categories} title={uiSettings.blogs.latestTitle} categoriesTitle={uiSettings.blogs.categoriesTitle} emptyMessage={uiSettings.blogs.latestEmptyMessage} />
      <ContactExpert
        slug="default"
        overrideTitle={pageCopy.ctaTitle}
        overrideButtonText={pageCopy.ctaButtonLabel}
        overrideButtonLink={pageCopy.ctaButtonHref}
      />
      <BlackbarBg />
    </>
  );
};

export default BlogsPage;
