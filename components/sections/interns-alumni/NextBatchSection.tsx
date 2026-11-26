import CtaBand from "@/components/sections/shared/CtaBand";

type NextBatchSectionProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

const NextBatchSection = ({ title = "Want To Be Part Of The Next Batch?", description = "Join our growing team and gain real-world experience through hands-on projects and mentorship.", buttonLabel = "Apply for Internship", buttonHref = "/resources/careers" }: NextBatchSectionProps) => (
  <CtaBand eyebrow="Internships" title={title} description={description} primary={{ label: buttonLabel, href: buttonHref }} secondary={{ label: "Meet the team", href: "/resources/our-team" }} />
);

export default NextBatchSection;
