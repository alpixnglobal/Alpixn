import { Heading, Section, tone } from "@/components/ui/v4";

type CustomSupportProps = {
  title?: string;
  description?: string;
  imageData?: string;
};

const CustomSupport = ({
  title = "Empower Your Customer Support with ALPIXN AI Chatbot",
  description = "ALPIXN AI Chatbot, powered by advanced GenAI, seamlessly integrates with your websites and applications to provide immediate, accurate responses to customer queries. Say goodbye to delayed responses and hello to 24/7 personalized support that boosts user satisfaction and captures every opportunity for engagement and conversion.",
  imageData = "/images/ai-circle.svg",
}: CustomSupportProps) => {
  void imageData;
  return (
    <Section id="support-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <Heading id="support-title" kicker="Why it matters" title={title} subtitle={description} />
        </div>
        <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(150deg,#071a33,#064a87_75%,#0878d1_130%)] p-7 text-white shadow-[0_40px_80px_-40px_rgba(7,26,51,0.8)] sm:p-9 lg:col-span-6">
          <div aria-hidden className="absolute inset-0 bg-grid opacity-25" />
          <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#f6d77a]/25 blur-[70px]" />
          <p className="relative text-[12px] font-semibold uppercase tracking-[0.18em] text-[#f6d77a]">What your team gets</p>
          <ul className="relative mt-5 grid gap-3 sm:grid-cols-2">
            {["Answers from your own content", "Hand-over to a person when needed", "Works on web, WhatsApp and in-app", "Conversation history and insights", "Access control and data privacy", "Continuous tuning after launch"].map((t, i) => (
              <li key={t} className="flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-3 text-[14px]">
                <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: tone(i).c === "#071a33" ? "#f6d77a" : tone(i).c }} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default CustomSupport;
