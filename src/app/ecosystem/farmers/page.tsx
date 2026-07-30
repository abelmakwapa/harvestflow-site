import LearnClient from "@/components/LearnClient";
import { metadataForAudience } from "@/lib/metadata";

export const metadata = metadataForAudience("farmers", "/ecosystem/farmers");

export default function Page() { return <LearnClient slug="farmers" />; }
