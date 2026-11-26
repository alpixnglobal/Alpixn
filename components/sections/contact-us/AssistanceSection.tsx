import CtaBand from "@/components/sections/shared/CtaBand";

type AssistanceSectionProps = {
  title?: string;
  description?: string;
  emailButtonText?: string;
  callButtonText?: string;
  emailButtonHref?: string;
  callButtonHref?: string;
};

const AssistanceSection = ({
  title = "Need Immediate Assistance?",
  description = "For urgent enquiries, email or call us and we will get back to you as soon as possible.",
  emailButtonText = "Email Us",
  callButtonText = "Call Now",
  emailButtonHref = "/contact-us",
  callButtonHref = "/contact-us",
}: AssistanceSectionProps) => (
  <CtaBand
    compact
    eyebrow="Quick help"
    title={title}
    description={description}
    primary={{ label: emailButtonText, href: emailButtonHref || "/contact-us" }}
    secondary={{ label: callButtonText, href: callButtonHref || "/contact-us" }}
  />
);

export default AssistanceSection;
