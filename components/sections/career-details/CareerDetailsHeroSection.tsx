import { Briefcase, MapPin, Wallet } from "lucide-react";
import PageHero from "@/components/sections/shared/PageHero";

type CareerDetailsHeroSectionProps = {
  title: string;
  type?: string;
  location?: string;
  salary?: string;
};

const CareerDetailsHeroSection = ({ title, type, location, salary }: CareerDetailsHeroSectionProps) => {
  const meta = [
    { icon: Briefcase, value: type, color: "#0878d1" },
    { icon: MapPin, value: location, color: "#d99a19" },
    { icon: Wallet, value: salary, color: "#9a5b08" },
  ].filter((m) => m.value);
  return (
    <PageHero eyebrow="Open role" title={title}>
      {meta.length ? (
        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {meta.map(({ icon: Icon, value, color }) => (
            <li key={value} className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-fg shadow-[var(--shadow-card)]">
              <Icon aria-hidden className="h-4 w-4" style={{ color }} />
              {value}
            </li>
          ))}
        </ul>
      ) : null}
    </PageHero>
  );
};

export default CareerDetailsHeroSection;
