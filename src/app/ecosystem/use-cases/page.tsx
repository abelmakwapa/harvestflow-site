import InfoPage from "@/components/InfoPage";
import { metadataForContent } from "@/lib/metadata";

export const metadata = metadataForContent("use-cases", "/ecosystem/use-cases");

export default function Page() { return <InfoPage slug="use-cases" />; }
