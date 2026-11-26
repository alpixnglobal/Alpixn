import { ProductPageSections } from "@/components/sections/product/ProductPageSections";
import { getProductSettings, getPublishedProductBySlug } from "@/lib/content-service";
import { notFound } from "next/navigation";

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

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const productData = await getPublishedProductBySlug(slug);

  if (!productData) {
    return {
      title: "Product Not Found",
      description: "The requested product does not exist.",
    };
  }

  return {
    title: `${productData.heroTitle} | Products`,
    description: productData.heroDescription,
  };
}
