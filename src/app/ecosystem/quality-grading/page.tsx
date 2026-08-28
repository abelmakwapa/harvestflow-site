import InfoPage from "@/components/InfoPage";
import { metadataForContent } from "@/lib/metadata";

export const metadata = metadataForContent("quality-grading", "/ecosystem/quality-grading");

export default function Page() { return <InfoPage slug="quality-grading" />; }
