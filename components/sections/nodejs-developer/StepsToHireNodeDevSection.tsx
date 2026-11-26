import Image from "next/image";
import Link from "next/link";
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

function StepIcon({ index }: { index: number }) {
  const path = iconPaths[index % iconPaths.length];
  const viewBox = index % iconPaths.length === 0 ? "0 0 20 28" : "0 0 20 20";

  return (
    <div
      className="flex items-center justify-center rounded-full z-10 w-[48px] h-[48px] lg:w-[67px] lg:h-[67px]"
      style={{
        background: "linear-gradient(249.67deg, rgba(56, 158, 255, 0.35) 0%, rgba(24, 24, 24, 0) 49.04%, rgba(56, 158, 255, 0.35) 100%)",
        boxShadow: "0px 0px 23px 0px #4275AA",
        position: "relative",
      }}
    >
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(180deg, #4275AA 0%, #FFFFFF 100%)",
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <svg width="20" height="20" viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 lg:w-5 lg:max-h-7 relative z-10">
        <path d={path} fill="white" fillRule={index % iconPaths.length === 2 ? "evenodd" : undefined} clipRule={index % iconPaths.length === 2 ? "evenodd" : undefined} />
      </svg>
    </div>
  );
}

const StepsToHireDevSection = ({ slug = "default", data }: StepsToHireDevSectionProps) => {
  const fallbackData = getHireStepsData(slug);
  const { mainTitle, buttonText, buttonLink, steps } = data ?? { ...fallbackData, steps: defaultSteps };
  const resolvedSteps = steps.length > 0 ? steps : defaultSteps;

  return (
    <section className="sectionDefault">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, #00070E 35%, #002348 100%)" }} />

      <div className="relative w-full max-w-[1047px] gap-[50px] flex flex-col items-center mx-auto px-4 lg:px-0">
        <h2 className="title heading-gradient text-left lg:text-center">{mainTitle}</h2>

        <div className="relative w-full flex flex-col lg:flex-row lg:justify-between items-center gap-[60px] lg:gap-0">
          {resolvedSteps.map((step, index) => (
            <div key={`${step.stepLabel}-${index}`} className="relative flex flex-col items-center justify-center w-full max-w-[299px]">
              <div className="py-2.5 px-[25px] text-xs border rounded-full bg-[#389EFF0D] border-[#389EFF73] mb-[35px]">
                {step.stepLabel}
              </div>

              <StepIcon index={index} />

              {index < resolvedSteps.length - 1 ? (
                <div className="hidden lg:block absolute left-[61%] top-[44%]" style={{ width: "307px", height: "1px", background: "#FFFFFF33" }} />
              ) : null}

              <h5 className="text-white font-medium text-base lg:text-xl text-center mt-[15px]">{step.title}</h5>
              <p className="text-xs lg:text-base text-white/80 text-center mt-[15px]">{step.description}</p>
            </div>
          ))}
        </div>

        <Link
          href={buttonLink}
          className="px-6.25 py-2.5 text-white text-sm lg:text-base font-medium rounded-10 flex items-center justify-center cursor-pointer"
          style={{
            background: "linear-gradient(360deg, #002348 0%, #00141F 100%)",
            border: "1.5px solid transparent",
            backgroundImage:
              "linear-gradient(360deg, #002348 0%, #00141F 100%), linear-gradient(166.72deg, #389DFE -20.31%, #FFFFFF 92.69%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
};

export default StepsToHireDevSection;
