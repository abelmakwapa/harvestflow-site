import { notFound, permanentRedirect } from "next/navigation";
import { audienceProfiles } from "@/lib/content";

export function generateStaticParams() {
  return audienceProfiles.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exists = audienceProfiles.some((p) => p.slug === slug);
  if (!exists) notFound();
  permanentRedirect(`/ecosystem/${slug}`);
}
