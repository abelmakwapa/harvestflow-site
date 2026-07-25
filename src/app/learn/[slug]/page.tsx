import { notFound } from "next/navigation";
import { audienceProfiles } from "@/lib/content";
import LearnClient from "@/components/LearnClient";

export function generateStaticParams() {
  return audienceProfiles.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exists = audienceProfiles.some((p) => p.slug === slug);
  if (!exists) notFound();
  return <LearnClient slug={slug} />;
}
