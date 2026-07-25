import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { pages } from "@/lib/pages";
import InfoPage from "@/components/InfoPage";

const slugs = Object.keys(pages);

export function generateStaticParams() {
  return slugs.map((page) => ({ page }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const c = pages[page];
  if (!c) return { title: "Not found | HarvestFlow" };
  return { title: `${c.title} | HarvestFlow`, description: c.intro };
}

export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  if (!pages[page]) notFound();
  const destinations: Record<string, string> = {
    about: "/company/about",
    careers: "/company/careers",
    blog: "/company/blog",
    help: "/ecosystem/how-it-works",
    "use-cases": "/ecosystem/use-cases",
    "quality-grading": "/ecosystem/quality-grading",
    security: "/infrastructure/security",
    compliance: "/infrastructure/compliance",
  };
  if (destinations[page]) permanentRedirect(destinations[page]);
  return <InfoPage slug={page} />;
}
