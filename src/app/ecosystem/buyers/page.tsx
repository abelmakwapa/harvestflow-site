import LearnClient from "@/components/LearnClient";
import { metadataForAudience } from "@/lib/metadata";

export const metadata = metadataForAudience("buyers", "/ecosystem/buyers");

export default function Page() { return <LearnClient slug="buyers" />; }
