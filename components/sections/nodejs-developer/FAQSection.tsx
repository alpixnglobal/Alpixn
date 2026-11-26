import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <section className="sectionDefault">
      {/* Background Color */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, #00070E 55%, #002348 100%)" }} />

      {/* Container */}
      <div className="container max-w-[1349px]">
        {/* Title */}
        <h2 className="title heading-gradient text-left md:text-center">We’ve Got the Answers You’re Looking For</h2>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full -mt-2.5" defaultValue="item-5">
          <AccordionItem value="item-1">
            <AccordionTrigger>How does node.js differ from other server-side programming languages?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="text-sm md:text-base leading-relaxed">
                We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days,
                while express shipping ensures delivery within 1-2 business days.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                All orders are carefully packaged and fully insured. Track your shipment in real-time through our
                dedicated tracking portal.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Which companies use node.js for software development?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="text-sm md:text-base leading-relaxed">
                We stand behind our products with a comprehensive 30-day return policy. If you&apos;re not completely
                satisfied, simply return the item in its original condition.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                Our hassle-free return process includes free return shipping and full refunds processed within 48 hours
                of receiving the returned item.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Why should you outsource node.js development?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="text-sm md:text-base leading-relaxed">
                We stand behind our products with a comprehensive 30-day return policy. If you&apos;re not completely
                satisfied, simply return the item in its original condition.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                Our hassle-free return process includes free return shipping and full refunds processed within 48 hours
                of receiving the returned item.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>What kind of applications can you build using node.js?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="text-sm md:text-base leading-relaxed">
                We stand behind our products with a comprehensive 30-day return policy. If you&apos;re not completely
                satisfied, simply return the item in its original condition.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                Our hassle-free return process includes free return shipping and full refunds processed within 48 hours
                of receiving the returned item.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>What is the cost of node.js development?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="text-sm md:text-base text-white leading-relaxed">
                The cost of Node.js development varies based on project complexity, scope, and developer rates. Factors
                like whether you hire a Node.js developer or engage a Node.js development company can influence costs.
                Consulting with Node.js experts can provide a more accurate estimate.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;

