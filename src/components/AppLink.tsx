"use client";

import { useSyncExternalStore, type AnchorHTMLAttributes, type ReactNode } from "react";
import {
  APP_PATHS,
  buildAppUrl,
  campaignParamsFromSearch,
  type AppDestination,
  type AppLinkQuery,
} from "@/lib/app-links";
import { trackWebsiteEvent, type WebsiteAnalyticsEvent } from "@/lib/analytics";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  destination: AppDestination;
  query?: AppLinkQuery;
  analyticsEvent?: WebsiteAnalyticsEvent["name"];
  children: ReactNode;
};

function subscribeToLocation(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

export default function AppLink({ destination, query = {}, analyticsEvent, children, onClick, ...props }: Props) {
  const search = useSyncExternalStore(subscribeToLocation, () => window.location.search, () => "");
  const campaign = campaignParamsFromSearch(search);
  const href = buildAppUrl(destination, { utm_source: "website", ...query, ...campaign });

  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        if (analyticsEvent === "marketplace_cta_clicked") {
          trackWebsiteEvent({
            name: analyticsEvent,
            properties: { destination: APP_PATHS[destination], intent: query.intent },
          });
        }
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
