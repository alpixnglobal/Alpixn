import { ProductShowcase } from "@/components/hero/HeroPanels";
import PageHero from "@/components/sections/shared/PageHero";

interface ProductHeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  features?: string[];
}

const ProductHeroSection = ({
  title = "AI Chatbot",
  subtitle = "Faster answers for customers, less repetitive work for your team",
  description = "An AI assistant that answers common questions from your own content, hands complex cases to people and fits into the channels your customers already use.",
  buttonLabel = "Book Your Demo",
  buttonHref = "/contact-us",
  features = ["Answers from your own content", "Hands over to a person", "Works on web and WhatsApp"],
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
    aside={<ProductShowcase image="/portfolio/askdesk-ai-assistant/desktop.webp" features={features} />}
  />
);

export default ProductHeroSection;
