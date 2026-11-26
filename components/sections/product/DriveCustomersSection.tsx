import CtaBand from "@/components/sections/shared/CtaBand";

type DriveCustomerSectionProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

const DriveCustomerSection = ({
  title = "Drive Better Customer Outcomes with ALPIXN AI Chatbot",
  description = "Experience the future of customer support with a demo or contact us to discuss your specific requirements.",
  buttonLabel = "Speak To Our Expert Team",
  buttonHref = "/contact-us",
}: DriveCustomerSectionProps) => (
  <CtaBand eyebrow="Book a demo" title={title} description={description} primary={{ label: buttonLabel, href: buttonHref }} secondary={{ label: "Explore our services", href: "/our-expertise" }} />
);

export default DriveCustomerSection;
