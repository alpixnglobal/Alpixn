import { ProductPageSections } from "@/components/sections/product/ProductPageSections";
import { getProductSettings, getPublishedProductBySlug } from "@/lib/content-service";
import { notFound } from "next/navigation";
import { pageMetadata, toDescription } from "@/lib/seo";
import { withSeo } from "@/lib/seo-store";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  const [productData, settings] = await Promise.all([getPublishedProductBySlug(slug), getProductSettings()]);

  if (!productData) {
    notFound();
  }

  return <ProductPageSections hero={productData} settings={settings} />;
}

async function baseMetadata({ params }: PageProps) {
  const { slug } = await params;
  const productData = await getPublishedProductBySlug(slug);

  if (!productData) {
    return {
      title: "Product Not Found",
      description: "The requested product does not exist.",
    };
  }

  return pageMetadata({
    title: productData.heroTitle,
    description: toDescription(productData.heroDescription),
    path: `/products/${slug}`,
  });
}

export async function generateMetadata(props: Parameters<typeof baseMetadata>[0]) {
  const p = (await props.params) as Record<string, string>;
  return withSeo(`/products/${p.slug}`, await baseMetadata(props));
}
