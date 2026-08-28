import InfoPage from "@/components/InfoPage";
import { pricingContent } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Enterprise Pricing",
  description: "HarvestFlow procurement workflows, supplier operations, reporting, traceability, and integrations for high-volume organizations.",
  path: "/pricing/enterprise",
});
export default function Page() { return <InfoPage content={pricingContent.enterprise} />; }
