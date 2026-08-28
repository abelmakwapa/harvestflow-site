import InfoPage from "@/components/InfoPage";
import { pricingContent } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Basic Retailer Pricing",
  description: "Core HarvestFlow marketplace access with no monthly fee and a transparent fee only on completed trades.",
  path: "/pricing/basic",
});
export default function Page() { return <InfoPage content={pricingContent.basic} />; }
