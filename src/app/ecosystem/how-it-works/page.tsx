import InfoPage from "@/components/InfoPage";
import { metadataForContent } from "@/lib/metadata";

export const metadata = metadataForContent("help", "/ecosystem/how-it-works");

export default function Page() { return <InfoPage slug="help" />; }
