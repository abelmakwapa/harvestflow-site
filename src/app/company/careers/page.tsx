import InfoPage from "@/components/InfoPage";
import { metadataForContent } from "@/lib/metadata";

export const metadata = metadataForContent("careers", "/company/careers");

export default function Page() { return <InfoPage slug="careers" />; }
