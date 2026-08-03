import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_FAVICON_PATH, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f4e4",
    theme_color: "#0e4a39",
    icons: [{ src: SITE_FAVICON_PATH, sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
