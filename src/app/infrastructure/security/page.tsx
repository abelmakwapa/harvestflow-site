import InfoPage from "@/components/InfoPage";
import { metadataForContent } from "@/lib/metadata";

export const metadata = metadataForContent("security", "/infrastructure/security");

export default function Page() { return <InfoPage slug="security" />; }
