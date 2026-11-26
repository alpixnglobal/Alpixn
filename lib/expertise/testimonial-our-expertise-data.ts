export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar: string;
  rating?: number;
  featured?: boolean;
}

export interface TestimonialData {
  mainTitle: string;
  mainSubtitle: string;
  testimonials: TestimonialItem[];
}

export const testimonialData: TestimonialData = {
  mainTitle: "See What Our Clients Have To Say",
  mainSubtitle:
    "Our clients' success stories speak louder than words. From AI-powered innovations to enterprise workflow automation, businesses trust Jellyfish Technologies to deliver with excellence, agility, and enduring strategic value.",
  testimonials: [
    {
      id: "testimonial-1",
      quote:
        "The team enabled the app to launch in both New Zealand and the United States, seamlessly handling multiple currencies and transactions upon deployment. About 1,200 users are registered to the platform, and the app is fully-functioning. The team added value with their responsiveness and efficiency.",
      author: "James Anderson",
      position: "Co-Founder",
      company: "Shootzu",
      avatar: "/images/avatar-profile.png",
    },
    {
      id: "testimonial-4",
      quote:
        "The team enabled the app to launch in both New Zealand and the United States, seamlessly handling multiple currencies and transactions upon deployment. About 1,200 users are registered to the platform, and the app is fully-functioning. The team added value with their responsiveness and efficiency.",
      author: "Rachel Lee",
      position: "VP of Product",
      company: "SaaS Platform",
      avatar: "/images/avatar-profile.png",
    },
    {
      id: "testimonial-3",
      quote:
        "The technical expertise and project management skills demonstrated by Jellyfish were exceptional. They delivered a complex solution on time and within budget.",
      author: "Thomas Wilson",
      position: "IT Director",
      company: "Healthcare Network",
      avatar: "/images/avatar-profile.png",
    },
    {
      id: "testimonial-4",
      quote:
        "Their collaborative approach and attention to detail resulted in a product that exceeded our expectations. The solution has scaled perfectly with our growing user base.",
      author: "Rachel Lee",
      position: "VP of Product",
      company: "SaaS Platform",
      avatar: "/images/avatar-profile.png",
    },
    // Add more testimonials here if needed
  ],
};

// Simple export - no slug logic needed
export default testimonialData;
