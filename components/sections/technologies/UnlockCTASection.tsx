import CtaBand from "@/components/sections/shared/CtaBand";

type UnlockCTASectionProps = {
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

const UnlockCTASection = ({ title = "Ready to build with the right technology?", buttonLabel = "Connect With Us", buttonHref = "/contact-us" }: UnlockCTASectionProps) => (
  <CtaBand compact eyebrow={null} title={title} primary={{ label: buttonLabel, href: buttonHref }} secondary={{ label: "Explore our services", href: "/our-expertise" }} />
);

export default UnlockCTASection;
