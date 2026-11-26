import type { TechnologySimpleCardRecord } from "@/lib/content-types";

type QualityServiceProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  points?: TechnologySimpleCardRecord[];
};

const defaultPoints: TechnologySimpleCardRecord[] = [
  {
    title: "Non-Blocking I/O",
    description:
      "In Node.js, non-blocking I/O is a fundamental concept that enables its asynchronous and event-driven programming model, ensuring high concurrency, scalability, and performance, ideal for building modern web servers, APIs, and microservices.",
  },
  {
    title: "Single-Threaded Event Loop",
    description:
      "Node.js’s single-threaded event loop, combined with its non-blocking I/O model and thread pool for handling blocking operations, allows the building of highly scalable, responsive applications that make efficient use of system resources.",
  },
  {
    title: "Scalable Microservices",
    description:
      "By embracing microservices architecture with its asynchronous nature, rich ecosystem, and seamless integration with containerization, Node.js facilitates the creation of scalable, maintainable, and resilient applications.",
  },
  {
    title: "High Throughput",
    description:
      "The high throughput capabilities of Node JS make it a preferred choice for expert backend developers seeking to build scalable and efficient web solutions, handling significant traffic while maintaining performance.",
  },
  {
    title: "Unified Codebase",
    description:
      "A unified codebase in Node JS simplifies development, allowing client-side and server-side code to be written in JavaScript. This course streamlines the development process, enabling teams to work cohesively using the same language across the entire stack.",
  },
  {
    title: "Horizontal Scaling",
    description:
      "Node.js supports horizontal scaling, including techniques like clustering, load balancing, containerization, message queues, and content delivery networks (CDNs), ensuring efficient handling of increasing traffic demands.",
  },
  {
    title: "Rapid Development",
    description:
      "Node.js’s rapid development framework provides pre-built components, reduces coding overhead, allows for quick iterations, and accelerates project timelines, making it a preferred choice for clients looking to deploy robust solutions quickly.",
  },
  {
    title: "Lightweight Framework",
    description:
      "Node.js is recognized for its lightweight framework, significantly lowering overhead and improving application performance. This feature particularly benefits businesses looking to build scalable and efficient applications.",
  },
];

const QualityService = ({ eyebrow = "Quality-Focused Proficiency", title = "What makes Node.js ideal for scalable applications?", description = "Node.js demonstrates exceptional performance in creating scalable applications through its unique architecture. Its non-blocking I/O model, coupled with an event-driven approach and high concurrency capabilities, facilitates swift development and effective resource utilization, ensuring your applications grow while maintaining optimal performance.", points = defaultPoints }: QualityServiceProps) => {
  const resolvedPoints = points.length > 0 ? points : defaultPoints;

  return (
    <section className="sectionDefault">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 65%, var(--glow) 100%)" }} />

      <div className="relative grid grid-cols-1 xl:grid-cols-[599px_1fr] gap-[52px] max-w-[1350px] mx-auto px-4 xl:px-0">
        <div className="flex flex-col gap-3.75 w-full xl:max-w-[599px]">
          <h6 className="text-tech text-base md:text-lg font-medium">{eyebrow}</h6>
          <h2 className="title heading-gradient text-start">{title}</h2>
          <p className="font-normal text-sm md:text-base leading-relaxed text-fg/80">{description}</p>
        </div>
        <div className="flex flex-col w-full gap-6.25">
          {resolvedPoints.map((point, index) => (
            <div key={point.title} className={`flex flex-col gap-3 ${index < resolvedPoints.length - 1 ? "border-b pb-5 border-fg/50" : "pb-5 border-fg/50"}`}>
              <h6 className="text-fg font-semibold text-base md:text-lg">
                <div className="flex gap-2 items-center">
                  <span
                    style={{
                      background: "linear-gradient(90deg, var(--tech) 0%, var(--gold) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{point.title}</span>
                </div>
              </h6>
              <p className="ml-[32px] text-sm md:text-base leading-relaxed text-fg">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualityService;
