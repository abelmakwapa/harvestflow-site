import LearnClient from "@/components/LearnClient";
import { metadataForAudience } from "@/lib/metadata";

export const metadata = metadataForAudience("suppliers", "/ecosystem/suppliers");

export default function Page() { return <LearnClient slug="suppliers" />; }
