import Link from "next/link";
import { ArrowRight, ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { submitContactFormAction } from "@/admin/actions/admin-actions";
import { accentSplit } from "@/components/sections/shared/PageHero";
import SpamGuard from "@/components/forms/SpamGuard";
import Captcha from "@/components/forms/Captcha";

/**
 * Contact page "studio": the headline and direct lines on the left, a three-step
 * project brief on the right (topic chips → details → message). Server-rendered form,
 * same field names as before so the existing contact action keeps working.
 */
const TOPICS = ["AI solution", "Robotics software", "Web application", "Mobile app", "Cloud & DevOps", "Hire developers", "Something else"];

type Social = { instagram?: string; linkedin?: string; facebook?: string; twitter?: string; youtube?: string };

export default function ContactStudio({
  title,
  description,
  phone,
  phoneAvailability,
  email,
  supportEmail,
  address,
  buttonText = "Send my brief",
  interestOptions = [],
  social = {},
}: {
  title: string;
  description: string;
  phone: string;
  phoneAvailability: string;
  email: string;
  supportEmail: string;
  address: string;
  buttonText?: string;
  interestOptions?: string[];
  social?: Social;
}) {
  // Legacy CMS options ("Male", "Female") are not project topics; use real ones unless admin set proper values.
  const topics = interestOptions.filter((o) => !/^(male|female)$/i.test(o.trim())).length >= 3 ? interestOptions : TOPICS;
  const { lead, tail } = accentSplit(title || "Let's Build What's Next", 2);
  const tel = phone.replace(/[^\d+]/g, "");
  const socials = [
    { href: social.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: social.instagram, label: "Instagram", Icon: Instagram },
    { href: social.facebook, label: "Facebook", Icon: Facebook },
    { href: social.twitter, label: "X (Twitter)", Icon: Twitter },
    { href: social.youtube, label: "YouTube", Icon: Youtube },
  ].filter((s) => s.href);

  const lines = [
    { icon: Mail, label: "Email us", value: email, sub: supportEmail ? `Support: ${supportEmail}` : "", href: `mailto:${email}`, c: "#0878d1" },
    { icon: Phone, label: "Call us", value: phone, sub: phoneAvailability, href: `tel:${tel}`, c: "#d99a19" },
    { icon: MapPin, label: "Visit us", value: address, sub: "Head office", href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, c: "#9a5b08" },
  ];

  return (
    <section aria-labelledby="contact-title" className="relative overflow-hidden bg-canvas">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-[0.3] [mask-image:radial-gradient(ellipse_60%_60%_at_20%_20%,#000_30%,transparent_80%)]" />
        <div className="absolute -left-40 -top-24 h-[460px] w-[460px] rounded-full bg-[#0878d1]/14 blur-[130px]" />
        <div className="absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-[#f6d77a]/40 blur-[130px] dark:bg-[#d99a19]/14" />
      </div>

      <div className="relative mx-auto grid max-w-[1180px] gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-12 lg:items-start lg:gap-12 lg:px-10 lg:py-16">
        {/* Left: message + direct lines */}
        <div className="lg:col-span-5">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#0878d1]">/ contact</p>
          <h1 id="contact-title" className="mt-4 font-display text-[clamp(1.55rem,2.5vw,2.2rem)] font-bold leading-[1.08] tracking-[-0.03em] text-fg">
            {lead ? `${lead} ` : null}
            <span className="text-brand-spectrum">{tail}</span>
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-fg-muted">{description}</p>

          <ul className="mt-7 divide-y divide-line overflow-hidden rounded-[22px] border border-line bg-surface shadow-[var(--shadow-card)]">
            {lines.map(({ icon: Icon, label, value, sub, href, c }) => (
              <li key={label}>
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-surface-2">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white" style={{ background: c }}>
                    <Icon aria-hidden className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">{label}</span>
                    <span className="mt-0.5 block break-words text-[14px] font-semibold leading-snug text-fg">{value}</span>
                    {sub ? <span className="mt-0.5 block text-[12px] text-fg-muted">{sub}</span> : null}
                  </span>
                  <ArrowUpRight aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#d99a19]" />
                </a>
              </li>
            ))}
          </ul>

          {socials.length ? (
            <div className="mt-6 flex items-center gap-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">Follow</span>
              <ul className="flex gap-2">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <Link href={href as string} aria-label={label} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-fg-muted transition-all hover:-translate-y-0.5 hover:border-[#d99a19]/60 hover:text-[#d99a19]">
                      <Icon className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Right: three-step brief */}
        <div className="lg:col-span-7">
          <form action={submitContactFormAction} className="relative mx-auto max-w-[620px] overflow-hidden rounded-[26px] border border-line bg-surface p-5 shadow-[0_40px_90px_-50px_rgba(7,26,51,0.55)] sm:p-6">
              <SpamGuard />
            <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-brand-spectrum" />
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-fg">Start your project brief</h2>
              <span className="hidden rounded-full bg-surface-2 px-3 py-1 text-[12px] text-fg-muted sm:inline">About 2 minutes</span>
            </div>

            <fieldset className="mt-5">
              <legend className="flex items-center gap-3 text-[13px] font-semibold text-fg">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#0878d1] text-[12px] text-white">1</span>
                What can we help with?
              </legend>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {topics.map((t, i) => (
                  <label key={t} className="cursor-pointer">
                    <input type="radio" name="interest" value={t.toLowerCase().replace(/\s+/g, "-")} defaultChecked={i === 0} className="peer sr-only" />
                    <span className="inline-flex rounded-full border border-line bg-canvas px-3 py-1.5 text-[12.5px] font-medium text-fg transition-all peer-checked:border-transparent peer-checked:bg-[linear-gradient(135deg,#071a33,#064a87)] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#d99a19] hover:border-[#d99a19]/60">
                      {t}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-5">
              <legend className="flex items-center gap-3 text-[14px] font-semibold text-fg">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#d99a19] text-[12px] text-[#071a33]">2</span>
                About you
              </legend>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {[
                  { name: "firstName", label: "First name", type: "text", auto: "given-name" },
                  { name: "lastName", label: "Last name", type: "text", auto: "family-name" },
                  { name: "email", label: "Work email", type: "email", auto: "email" },
                  { name: "phone", label: "Phone number", type: "tel", auto: "tel" },
                ].map((f) => (
                  <label key={f.name} className="group relative block">
                    <input
                      name={f.name}
                      type={f.type}
                      required
                      autoComplete={f.auto}
                      placeholder=" "
                      className="peer h-11 w-full rounded-xl border border-line bg-canvas px-3.5 pt-3.5 text-[14px] text-fg outline-none transition-colors focus:border-[#0878d1]"
                    />
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-fg-subtle transition-all peer-focus:top-2.5 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[10px]">
                      {f.label} *
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-5">
              <legend className="flex items-center gap-3 text-[14px] font-semibold text-fg">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#9a5b08] text-[12px] text-white">3</span>
                Your project
              </legend>
              <label className="mt-3 block">
                <span className="sr-only">Message</span>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="What are you building, who is it for, and is there a timeline we should know about?"
                  className="w-full resize-y rounded-xl border border-line bg-canvas p-3.5 text-[14px] text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-[#0878d1]"
                />
              </label>
            </fieldset>

            <Captcha className="mt-5" />
            <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[13px] text-fg-subtle">We read every brief and reply by email.</p>
              <button type="submit" className="btn-brand !px-6 !py-2.5 text-[14px]">
                {buttonText} <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div aria-hidden className="h-1 bg-brand-spectrum" />
    </section>
  );
}
