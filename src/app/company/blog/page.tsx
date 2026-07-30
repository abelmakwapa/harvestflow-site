import InfoPage from "@/components/InfoPage";
import { metadataForContent } from "@/lib/metadata";

export const metadata = metadataForContent("blog", "/company/blog");

export default function Page() { return <InfoPage slug="blog" />; }
