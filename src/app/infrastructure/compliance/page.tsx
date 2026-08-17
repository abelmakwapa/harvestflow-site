import InfoPage from "@/components/InfoPage";
import { metadataForContent } from "@/lib/metadata";

export const metadata = metadataForContent("compliance", "/infrastructure/compliance");

export default function Page() { return <InfoPage slug="compliance" />; }
