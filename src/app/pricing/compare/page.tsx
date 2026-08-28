import InfoPage from "@/components/InfoPage";
import { pricingContent } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Compare Pricing Plans",
  description: "Compare HarvestFlow's free core marketplace access with enterprise procurement and integration workflows.",
  path: "/pricing/compare",
});
export default function Page() { return <InfoPage content={pricingContent.compare} />; }
