import LearnClient from "@/components/LearnClient";
import { metadataForAudience } from "@/lib/metadata";

export const metadata = metadataForAudience("logistics", "/ecosystem/logistics");

export default function Page() { return <LearnClient slug="logistics" />; }
