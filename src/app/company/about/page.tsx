import InfoPage from "@/components/InfoPage";
import { metadataForContent } from "@/lib/metadata";

export const metadata = metadataForContent("about", "/company/about");

export default function Page() { return <InfoPage slug="about" />; }
