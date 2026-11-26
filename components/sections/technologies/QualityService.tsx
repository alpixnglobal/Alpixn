import { Heading, NumberedList, Section } from "@/components/ui/v4";
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
  const resolvedPoints = points.length ? points : defaultPoints;
  return (
    <Section id="quality-title" alt>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <Heading id="quality-title" kicker={eyebrow} kickerTone="blue" title={title} subtitle={description} />
        </div>
        <div className="lg:col-span-8">
          <NumberedList items={resolvedPoints.map((p) => ({ title: p.title, description: p.description }))} />
        </div>
      </div>
    </Section>
  );
};

export default QualityService;
