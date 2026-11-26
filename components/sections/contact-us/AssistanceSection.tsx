import { Button } from "@/components/ui/buttonBtn";
import Link from "next/link";

interface AssistanceSectionProps {
  title?: string;
  description?: string;
  emailButtonText?: string;
  callButtonText?: string;
  emailButtonHref?: string;
  callButtonHref?: string;
}

const AssistanceSection = ({
  title = "Need Immediate Assistance?",
  description = "For urgent inquiries or immediate support, don't hesitate to call us directly.",
  emailButtonText = "Email Us",
  callButtonText = "Call Now",
  emailButtonHref = "mailto:info@axano.in",
  callButtonHref = "tel:+910000000000",
}: AssistanceSectionProps) => {
  return (
    <section className="w-full py-12.5" style={{ background: "var(--canvas)" }}>
      <div className="w-full max-w-[1094px] mx-auto px-4 xl:px-0">
        <div className="w-full max-w-full lg:max-w-[1094px] mx-auto p-6 sm:p-8 md:p-12 lg:p-[85px] rounded-xl sm:rounded-2xl lg:rounded-[20px]" style={{ background: "linear-gradient(277.65deg, var(--tech) -120%, transparent 51.07%, var(--tech) 190.99%)" }}>
          <div className="w-full max-w-full lg:max-w-[924px] mx-auto flex flex-col items-center justify-center gap-4 lg:gap-[25px]">
            <h2 className="font-semibold text-2xl sm:text-3xl md:text-[34px] lg:text-[42px] text-fg text-left sm:text-center leading-tight sm:leading-snug lg:leading-snug">
              {title}
            </h2>

            <p className="font-normal text-base sm:text-lg leading-relaxed text-left sm:text-center text-fg">
              {description}
            </p>
            <div className="flex flex-wrap gap-[25px]">
              <Link href={emailButtonHref}>
                <Button className="font-medium w-full xl:!w-fit text-sm sm:text-base px-[25px] py-2.5 flex gap-2.5">
                  <span>{emailButtonText}</span>
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.90012 0.900391H17.9001C18.4501 0.900391 18.9001 1.35039 18.9001 1.90039V13.9004C18.9001 14.4504 18.4501 14.9004 17.9001 14.9004H1.90012C1.35012 14.9004 0.900116 14.4504 0.900116 13.9004V1.90039C0.900116 1.35039 1.35012 0.900391 1.90012 0.900391Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M0.900116 2.40039L9.90012 7.90039L18.9001 2.40039" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </Link>
              <Link href={callButtonHref}>
                <Button className="font-medium w-full xl:!w-fit text-sm sm:text-base px-[25px] py-2.5 flex gap-2.5" style={{ background: "linear-gradient(360deg, var(--glow) 0%, var(--canvas-2) 100%)" }}>
                  <span>{callButtonText}</span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.31854 0.899414V0.901367C5.87531 0.898092 6.4148 1.09483 6.8371 1.45801C7.20841 1.77741 7.46687 2.20543 7.57831 2.67871L7.61737 2.88477L7.61835 2.89258C7.6985 3.50029 7.8466 4.09752 8.06073 4.67188C8.21598 5.08489 8.25042 5.5343 8.15839 5.96582C8.06633 6.39709 7.85221 6.79284 7.54218 7.10645L7.53827 7.11035L7.14569 7.50195C7.91893 8.67555 8.92338 9.67876 10.0969 10.4521L10.4894 10.0605L10.4924 10.0576C10.8061 9.7474 11.2025 9.53345 11.634 9.44141C12.0646 9.34956 12.5127 9.38267 12.925 9.53711C13.3562 9.69802 13.8005 9.82243 14.2521 9.9082L14.7062 9.98145L14.715 9.98242C15.2752 10.0616 15.7867 10.3438 16.1525 10.7754C16.5138 11.2017 16.707 11.7445 16.6984 12.3027H16.6994V14.4102C16.7007 14.7315 16.6348 15.0503 16.506 15.3447C16.3774 15.6389 16.1889 15.903 15.9523 16.1201C15.7155 16.3374 15.4355 16.5035 15.131 16.6064C14.8267 16.7094 14.5038 16.7467 14.1838 16.7178C14.1786 16.7173 14.1733 16.7174 14.1682 16.7168C11.8647 16.4665 9.65182 15.6795 7.70721 14.4199C5.89709 13.2696 4.36221 11.7354 3.21112 9.92578C1.94495 7.971 1.15631 5.74569 0.910339 3.42969L0.909363 3.41504C0.880589 3.09606 0.918464 2.77422 1.02069 2.4707C1.12297 2.16719 1.28718 1.88791 1.50311 1.65137C1.7191 1.41479 1.98254 1.22611 2.27557 1.09668C2.56849 0.967327 2.88506 0.899769 3.20526 0.899414H5.31854Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssistanceSection;
