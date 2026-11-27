import Accent from "@/components/ui/Accent";
import { submitContactFormAction } from "@/admin/actions/admin-actions";
import { InputField } from "@/components/ui/Input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValueAsteriks } from "@/components/ui/select";
import { TextareaInput } from "@/components/ui/textarea";

interface ContactFromSectionProps {
  introTitle?: string;
  introDescription?: string;
  phoneNumber?: string;
  phoneAvailability?: string;
  email?: string;
  supportEmail?: string;
  address?: string;
  buttonText?: string;
  firstNameLabel?: string;
  lastNameLabel?: string;
  emailLabel?: string;
  phoneLabel?: string;
  interestPlaceholder?: string;
  messageLabel?: string;
  interestOptions?: string[];
}

const ContactFromSection = ({
  introTitle = "Your Digital Future",
  introDescription = "Ready to transform your digital presence? We're here to help you achieve extraordinary results. Get in touch with our team of experts and let's discuss how we can accelerate your business growth.",
  phoneNumber = "+91 7291031315",
  phoneAvailability = "Available Monday to Friday 9AM – 7PM IST",
  email = "info@alpixn.com",
  supportEmail = "support@alpixn.com",
  address = "Unitech Cyber Park 3rd & 10th Floor, Tower B, Unitech Cyber Park, Sector -39, Gurugram, Haryana 122001, India",
  buttonText = "Let’s Get Started",
  firstNameLabel = "First Name",
  lastNameLabel = "Last Name",
  emailLabel = "Email Address",
  phoneLabel = "Phone Number",
  interestPlaceholder = "Interested in",
  messageLabel = "Your Message",
  interestOptions = ["Male", "Female"],
}: ContactFromSectionProps) => {
  const addressParts = address.split(",");
  const addressLine1 = addressParts.slice(0, Math.ceil(addressParts.length / 2)).join(",");
  const addressLine2 = addressParts.slice(Math.ceil(addressParts.length / 2)).join(",").trim();

  return (
    <section className="relative w-full bg-canvas py-16 sm:py-20">

      <div className="relative mx-auto w-full max-w-[1320px] px-0 sm:px-2 lg:px-6">
        <div className="grid grid-cols-1 gap-8 px-4 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-10">
          <div
            className="dark relative flex h-fit min-h-[365px] w-full flex-col gap-10 overflow-hidden rounded-[32px] bg-[linear-gradient(150deg,#071a33,#064a87_75%,#0878d1_130%)] p-8 text-white shadow-[0_40px_80px_-40px_rgba(7,26,51,0.8)]"
          >
            <div className="flex gap-[25px] items-center">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[22] h-[22] lg:w-[25px] lg:h-[25px]">
                <path d="M28.75 28.75H27.5C22.4161 28.75 17.6682 27.3043 13.6465 24.8008L13.2588 24.5547C10.3274 22.6575 7.80352 20.1986 5.83203 17.3223L5.44531 16.7412C2.69836 12.4994 1.24109 7.55164 1.25 2.49805L1.25195 1.25H12.4219L12.6387 2.22949L14.207 9.29785L14.3555 9.9668L13.8711 10.4521L11.9004 12.4219C13.356 14.7049 15.2923 16.6418 17.5752 18.0977L20.0312 15.6416L20.7012 15.79L27.7715 17.3623L28.75 17.5801V28.75Z" stroke="#2EA8FF" strokeWidth="2.5" />
              </svg>
              <div className="flex flex-col gap-2.5">
                <div className="font-medium text-base lg:text-[20px] text-white">{phoneNumber}</div>
                <div className="text-sm lg:text-base text-white/75">{phoneAvailability}</div>
              </div>
            </div>

            <div className="flex gap-[25px] items-center">
              <svg width="33" height="25" viewBox="0 0 33 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[22] h-[22] lg:w-[32px] lg:h-[25px]">
                <path d="M1.78613 1.25H30.3574C30.6491 1.25015 30.8926 1.49444 30.8926 1.78613V23.2139C30.8926 23.5056 30.6491 23.7498 30.3574 23.75H1.78613C1.49435 23.75 1.25 23.5057 1.25 23.2139V1.78613C1.25 1.49435 1.49435 1.25 1.78613 1.25Z" stroke="#2EA8FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <mask id="path-2-inside-1_7544_3828" fill="white">
                  <path d="M0 2.67969L16.0714 12.5011L32.1429 2.67969" />
                </mask>
                <path d="M1.30362 0.546483C0.125488 -0.173489 -1.41323 0.197926 -2.1332 1.37606C-2.85318 2.5542 -2.48176 4.09292 -1.30362 4.81289L0 2.67969L1.30362 0.546483ZM16.0714 12.5011L14.7678 14.6343C15.5681 15.1234 16.5748 15.1234 17.3751 14.6343L16.0714 12.5011ZM33.4465 4.81289C34.6246 4.09292 34.996 2.5542 34.2761 1.37606C33.5561 0.197926 32.0174 -0.173489 30.8392 0.546483L32.1429 2.67969L33.4465 4.81289ZM0 2.67969L-1.30362 4.81289L14.7678 14.6343L16.0714 12.5011L17.3751 10.3679L1.30362 0.546483L0 2.67969ZM16.0714 12.5011L17.3751 14.6343L33.4465 4.81289L32.1429 2.67969L30.8392 0.546483L14.7678 10.3679L16.0714 12.5011Z" fill="#2EA8FF" mask="url(#path-2-inside-1_7544_3828)" />
              </svg>
              <div className="flex flex-col gap-2.5">
                <div className="font-medium text-base lg:text-[20px] text-white">{email}</div>
                <div className="text-sm lg:text-base text-white/75">For support: {supportEmail}</div>
              </div>
            </div>

            <div className="flex gap-[25px] items-center">
              <svg width="30" height="39" viewBox="0 0 30 39" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[22] h-[22] lg:w-[38px] lg:h-[38px]">
                <path d="M15.002 1.25L15.3428 1.25488C18.8661 1.34681 22.2244 2.79423 24.7207 5.30469C27.2169 7.81515 28.6539 11.19 28.7451 14.7275L28.75 15.0703L28.7393 15.6309C28.6311 18.3529 27.7151 20.9824 26.1094 23.1846L26.1035 23.2051L25.9775 23.3701L25.9766 23.3711V23.3721C25.9759 23.373 25.9749 23.3743 25.9736 23.376C25.9711 23.3794 25.9667 23.3843 25.9619 23.3906C25.9524 23.4032 25.9383 23.4208 25.9219 23.4424C25.8888 23.4859 25.8443 23.5447 25.7979 23.6055C25.7169 23.7114 25.5982 23.8669 25.5537 23.9209L25.5459 23.9307L15.9561 35.3057L15 36.4395L14.0439 35.3057L4.45898 23.9365V23.9355C4.39903 23.8642 4.27552 23.7031 4.20117 23.6055C4.15421 23.5438 4.10939 23.4843 4.07617 23.4404C4.05955 23.4185 4.04574 23.4004 4.03613 23.3877C4.03133 23.3813 4.02701 23.3765 4.02441 23.373C4.02316 23.3714 4.02215 23.37 4.02148 23.3691L4.02051 23.3682V23.3672C2.21963 20.9797 1.24671 18.0652 1.25 15.0703C1.2543 11.4086 2.70267 7.89604 5.2793 5.30469C7.85602 2.7134 11.351 1.25445 14.998 1.25H15.002ZM16.2588 12.002C15.6575 11.7515 14.9962 11.6859 14.3584 11.8135C13.7205 11.9411 13.1332 12.2567 12.6719 12.7207C12.2107 13.1846 11.8963 13.7765 11.7686 14.4219C11.6409 15.0675 11.7058 15.737 11.9561 16.3447C12.2064 16.9525 12.63 17.4708 13.1719 17.835C13.7134 18.1988 14.3492 18.3914 14.999 18.3916C15.8706 18.3903 16.7077 18.0429 17.3262 17.4209C17.9447 16.7988 18.2944 15.954 18.2959 15.0713L18.2861 14.8252C18.244 14.2536 18.0558 13.7016 17.7383 13.2236C17.3753 12.6773 16.8601 12.2525 16.2588 12.002Z" stroke="#2EA8FF" strokeWidth="2.5" />
              </svg>
              <div className="flex flex-col gap-2.5">
                <div className="font-medium text-base lg:text-[20px] text-white">{addressLine1}</div>
                <div className="text-sm lg:text-base text-white/75">{addressLine2}</div>
              </div>
            </div>
          </div>


          <div className="flex flex-col gap-[25px] rounded-[32px] border border-line bg-surface-2 p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div className="flex flex-col gap-[25px]">
              <h2 className="font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg"><Accent text={introTitle} /></h2>
              <p className="text-fg/80 text-base md:text-lg leading-relaxed">{introDescription}</p>
            </div>

            <form action={submitContactFormAction} className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] space-y-[11px]">
              <div className="col-span-2 lg:col-span-1 w-full">
                <InputField name="firstName" label={firstNameLabel} className="h-[48px] sm:h-[60px] rounded-2xl w-full border border-line bg-surface" />
              </div>
              <div className="col-span-2 lg:col-span-1 w-full">
                <InputField name="lastName" label={lastNameLabel} className="h-[48px] sm:h-[60px] rounded-2xl w-full border border-line bg-surface" />
              </div>
              <div className="col-span-2 lg:col-span-1 w-full">
                <InputField name="email" label={emailLabel} type="email" className="h-[48px] sm:h-[60px] rounded-2xl w-full border border-line bg-surface" />
              </div>
              <div className="col-span-2 lg:col-span-1 w-full">
                <InputField name="phone" label={phoneLabel} className="h-[48px] sm:h-[60px] rounded-2xl w-full border border-line bg-surface" />
              </div>
              <div className="col-span-2 w-full">
                <Select name="interest">
                  <SelectTrigger className="h-[48px] w-full rounded-2xl border border-line bg-surface sm:h-[58px]">
                    <SelectValueAsteriks placeholder={interestPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{interestPlaceholder}</SelectLabel>
                      {interestOptions.map((option) => (
                        <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, "-")}>{option}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 w-full">
                <TextareaInput name="message" label={messageLabel} className="h-[120px] sm:h-[208px] rounded-2xl w-full border border-line bg-surface" />
              </div>
              <button type="submit" className="btn-brand col-span-2 w-full">
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFromSection;
