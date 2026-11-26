import HeroBrandPanel from "@/components/sections/shared/HeroBrandPanel";
import PageHero from "@/components/sections/shared/PageHero";

interface ProductHeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

const ProductHeroSection = ({
  title = "AI Chatbot",
  subtitle = "Faster answers for customers, less repetitive work for your team",
  description = "An AI assistant that answers common questions from your own content, hands complex cases to people and fits into the channels your customers already use.",
  buttonLabel = "Book Your Demo",
  buttonHref = "/contact-us",
}: ProductHeroSectionProps) => (
  <PageHero
    eyebrow="Product"
    title={title}
    description={
      <>
        {subtitle ? <span className="mb-2 block font-semibold text-fg">{subtitle}</span> : null}
        {description}
      </>
    }
    primary={{ label: buttonLabel, href: buttonHref }}
    secondary={{ label: "Talk to an expert", href: "/contact-us" }}
    aside={<HeroBrandPanel />}
  />
);

export default ProductHeroSection;
