import { GoldButton, Heading, Section, tone } from "@/components/ui/v4";
import { getHireStepsData } from "@/lib/offshore developer/hire-steps-data";
import type { OffshoreStepRecord } from "@/lib/content-types";

interface StepsToHireDevSectionProps {
  slug?: string;
  data?: {
    mainTitle: string;
    buttonText: string;
    buttonLink: string;
    steps: OffshoreStepRecord[];
  };
}

const defaultSteps: OffshoreStepRecord[] = [
  { stepLabel: "Step 01", title: "Schedule a Call", description: "Share your project details and developer requirements with our experts." },
  { stepLabel: "Step 02", title: "Select Your Team", description: "Interview and handpick the best developers tailored to your needs." },
  { stepLabel: "Step 03", title: "Start Your Project", description: "We handle onboarding while you focus on launching your project seamlessly." },
];

const iconPaths = [
  "M19.7084 24.8306L17.561 20.5044C17.0989 19.5801 16.5014 18.9073 15.47 19.3175L13.4353 20.0504C11.8064 20.7833 10.9948 20.0504 10.1775 18.9456L6.51395 10.8565C6.05178 9.93217 6.29414 9.06254 7.32557 8.65234L10.1719 7.54754C11.2033 7.13187 11.0399 6.26771 10.5777 5.34339L8.13719 0.935108C7.67502 0.0107908 6.72813 -0.213452 5.69669 0.196748C3.63382 1.02262 1.92603 2.31885 0.815688 4.23859C-0.537016 6.58493 0.139336 9.85013 0.409877 11.2229C0.680418 12.5957 1.62731 15.0022 2.85038 17.4689C4.07345 19.941 5.14434 21.8827 6.10814 22.982C7.0663 24.0813 9.3659 27.0895 12.2122 27.7622C14.5456 28.3091 17.065 27.8497 19.1279 27.0238C20.165 26.63 20.165 25.7604 19.7084 24.8306Z",
  "M10 8C11.0609 8 12.0783 7.57857 12.8284 6.82843C13.5786 6.07828 14 5.06087 14 4C14 2.93913 13.5786 1.92172 12.8284 1.17157C12.0783 0.421427 11.0609 0 10 0C8.93913 0 7.92172 0.421427 7.17157 1.17157C6.42143 1.92172 6 2.93913 6 4C6 5.06087 6.42143 6.07828 7.17157 6.82843C7.92172 7.57857 8.93913 8 10 8ZM3.5 11C4.16304 11 4.79893 10.7366 5.26777 10.2678C5.73661 9.79893 6 9.16304 6 8.5C6 7.83696 5.73661 7.20107 5.26777 6.73223C4.79893 6.26339 4.16304 6 3.5 6C2.83696 6 2.20107 6.26339 1.73223 6.73223C1.26339 7.20107 1 7.83696 1 8.5C1 9.16304 1.26339 9.79893 1.73223 10.2678C2.20107 10.7366 2.83696 11 3.5 11ZM19 8.5C19 9.16304 18.7366 9.79893 18.2678 10.2678C17.7989 10.7366 17.163 11 16.5 11C15.837 11 15.2011 10.7366 14.7322 10.2678C14.2634 9.79893 14 9.16304 14 8.5C14 7.83696 14.2634 7.20107 14.7322 6.73223C15.2011 6.26339 15.837 6 16.5 6C17.163 6 17.7989 6.26339 18.2678 6.73223C18.7366 7.20107 19 7.83696 19 8.5ZM10 9C11.3261 9 12.5979 9.52678 13.5355 10.4645C14.4732 11.4021 15 12.6739 15 14V20H5V14C5 12.6739 5.52678 11.4021 6.46447 10.4645C7.40215 9.52678 8.67392 9 10 9Z",
  "M9 2L17 6V10C17 14.5 13.9 18.74 10 20C6.1 18.74 3 14.5 3 10V6L10 2ZM9 14L14 9L12.59 7.58L9 11.17L7.41 9.59L6 11L9 14Z",
];


const StepsToHireDevSection = ({ slug = "default", data }: StepsToHireDevSectionProps) => {
  const fallbackData = getHireStepsData(slug);
  const { mainTitle, buttonText, buttonLink, steps } = data ?? { ...fallbackData, steps: defaultSteps };
  const resolvedSteps = steps.length > 0 ? steps : defaultSteps;
  return (
    <Section id="steps-title">
      <Heading id="steps-title" kicker="How hiring works" kickerTone="blue" title={mainTitle} center />
      <ol className="relative mt-14 grid gap-8 md:gap-5" style={{ gridTemplateColumns: `repeat(${Math.min(resolvedSteps.length, 4)}, minmax(0, 1fr))` }}>
        <span aria-hidden className="absolute left-[12%] right-[12%] top-7 hidden h-1 rounded-full bg-brand-spectrum md:block" />
        {resolvedSteps.map((step, i) => (
          <li key={`${step.stepLabel}-${i}`} className="relative flex flex-col items-center text-center">
            <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full font-display text-lg font-bold ring-8 ring-[var(--canvas)]" style={{ background: tone(i).c, color: tone(i).ink }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">{step.stepLabel}</span>
            <h3 className="mt-1 font-display text-lg font-semibold text-fg">{step.title}</h3>
            <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-fg-muted">{step.description}</p>
          </li>
        ))}
      </ol>
      {buttonText ? (
        <div className="mt-12 flex justify-center">
          <GoldButton href={buttonLink || "/contact-us"}>{buttonText}</GoldButton>
        </div>
      ) : null}
    </Section>
  );
};

export default StepsToHireDevSection;
