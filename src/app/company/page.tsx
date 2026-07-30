import type { Metadata } from "next";
import SectionLanding from "@/components/SectionLanding";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({ title: "Company", description: "Learn about HarvestFlow, our team, and our work.", path: "/company" });

export default function CompanyPage() {
  return <SectionLanding eyebrow="Company" title="Building trade infrastructure for the real world." intro="Learn about the mission, the people building it, and the latest work from HarvestFlow." links={[
    { title: "About", description: "Our mission, product, and operating markets.", href: "/company/about" },
    { title: "Careers", description: "Join the team rebuilding the supply chain.", href: "/company/careers" },
    { title: "Press", description: "Publications, company information, and media resources.", href: "/company/press" },
    { title: "Blog", description: "Field notes, engineering, and product updates.", href: "/company/blog" },
  ]} />;
}
