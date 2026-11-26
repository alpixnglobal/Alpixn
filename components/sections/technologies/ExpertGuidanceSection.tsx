import CtaBand from "@/components/sections/shared/CtaBand";

type ExpertGuidanceSectionProps = {
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

const ExpertGuidanceSection = ({ title = "Get expert guidance for your project", buttonLabel = "Talk With Expert", buttonHref = "/contact-us" }: ExpertGuidanceSectionProps) => (
  <CtaBand compact eyebrow={null} title={title} primary={{ label: buttonLabel, href: buttonHref }} secondary={{ label: "See technologies", href: "/technologies" }} />
);

export default ExpertGuidanceSection;
