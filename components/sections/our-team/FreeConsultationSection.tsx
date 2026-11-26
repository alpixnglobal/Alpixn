import CtaBand from "@/components/sections/shared/CtaBand";

type FreeConsultationSectionProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

const FreeConsultationSection = ({ title = "Work With Our Team", description = "Tell us what you want to build. Our engineers, designers and AI specialists will suggest a sensible first step.", buttonLabel = "Get a Free Consultation", buttonHref = "/contact-us" }: FreeConsultationSectionProps) => (
  <CtaBand eyebrow="Work with us" title={title} description={description} primary={{ label: buttonLabel, href: buttonHref }} secondary={{ label: "See open roles", href: "/resources/careers" }} />
);

export default FreeConsultationSection;
