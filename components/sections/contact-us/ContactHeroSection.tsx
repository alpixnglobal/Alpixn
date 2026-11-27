import PageHero from "@/components/sections/shared/PageHero";

type ContactHeroSectionProps = {
  title?: string;
  description?: string;
};

const ContactHeroSection = ({ title = "Let's Build What's Next", description = "Tell us about your product, process or idea. We reply with honest recommendations and a sensible first step." }: ContactHeroSectionProps) => <PageHero eyebrow="Contact us" title={title} description={description} />;

export default ContactHeroSection;
