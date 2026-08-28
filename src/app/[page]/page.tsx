import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { isPageSlug, pages } from "@/lib/pages";
import InfoPage from "@/components/InfoPage";
import { createPageMetadata } from "@/lib/site";

const slugs = Object.keys(pages);
const destinations: Partial<Record<keyof typeof pages, `/${string}`>> = {
  about: "/company/about",
  careers: "/company/careers",
  blog: "/company/blog",
  help: "/ecosystem/how-it-works",
  "use-cases": "/ecosystem/use-cases",
  "quality-grading": "/ecosystem/quality-grading",
  security: "/infrastructure/security",
  compliance: "/infrastructure/compliance",
};

export function generateStaticParams() {
  return slugs.map((page) => ({ page }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  if (!isPageSlug(page)) {
    return {
      title: "Page not found",
      description: "The requested HarvestFlow page could not be found.",
      alternates: { canonical: "/" },
    };
  }
  const c = pages[page];
  return createPageMetadata({
    title: c.title,
    description: c.intro,
    path: destinations[page] ?? `/${page}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  if (!isPageSlug(page)) notFound();
  const destination = destinations[page];
  if (destination) permanentRedirect(destination);
  return <InfoPage slug={page} />;
}
