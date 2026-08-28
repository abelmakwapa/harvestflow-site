import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Contact sales and support",
  description: "Contact HarvestFlow about marketplace access, enterprise rollout, partnerships, or product support.",
  path: "/contact",
});

export default function Page() {
  return <main><ContactForm /></main>;
}
