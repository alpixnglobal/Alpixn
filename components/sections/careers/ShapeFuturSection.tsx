import CtaBand from "@/components/sections/shared/CtaBand";

type ShapeFuturSectionProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

const ShapeFuturSection = ({ title = "Shape the Future With Us", description = "Join a team building AI, robotics and software products. Explore open roles and start your journey today.", buttonLabel = "Apply Now", buttonHref = "/resources/careers" }: ShapeFuturSectionProps) => (
  <CtaBand eyebrow="Join ALPIXN" title={title} description={description} primary={{ label: buttonLabel, href: buttonHref }} secondary={{ label: "Meet the team", href: "/resources/our-team" }} />
);

export default ShapeFuturSection;
