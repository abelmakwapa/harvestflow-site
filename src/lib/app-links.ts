export const APP_PATHS = {
  login: "/login",
  marketplace: "/marketplace",
  createListing: "/create-listing",
  shop: "/shop",
  freight: "/freight",
  offerTruck: "/offer-truck",
  grade: "/grade",
  finance: "/finance",
  chats: "/chats",
} as const;

export type AppDestination = keyof typeof APP_PATHS;
export type AppPath = (typeof APP_PATHS)[AppDestination];
export type AudienceIntent = "farmer" | "buyer" | "logistics" | "supplier" | "enterprise";

export interface AppLinkQuery {
  returnTo?: AppPath;
  intent?: AudienceIntent;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

const DEFAULT_APP_URL = "http://localhost:5173";
const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

function applicationBaseUrl(): URL {
  const configured = process.env.NEXT_PUBLIC_HARVESTFLOW_APP_URL?.trim() || DEFAULT_APP_URL;
  const url = new URL(configured);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_HARVESTFLOW_APP_URL must be an HTTP(S) URL");
  }
  return url;
}

function safeCampaignValue(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized && normalized.length <= 100 ? normalized : undefined;
}

export function campaignParamsFromSearch(search: string): Pick<AppLinkQuery, (typeof CAMPAIGN_KEYS)[number]> {
  const source = new URLSearchParams(search);
  return Object.fromEntries(
    CAMPAIGN_KEYS.flatMap((key) => {
      const value = safeCampaignValue(source.get(key) ?? undefined);
      return value ? [[key, value]] : [];
    }),
  );
}

export function buildAppUrl(destination: AppDestination, query: AppLinkQuery = {}): string {
  const url = new URL(APP_PATHS[destination], applicationBaseUrl());
  const entries: Array<[keyof AppLinkQuery, string | undefined]> = [
    ["returnTo", query.returnTo],
    ["intent", query.intent],
    ["utm_source", safeCampaignValue(query.utm_source)],
    ["utm_medium", safeCampaignValue(query.utm_medium)],
    ["utm_campaign", safeCampaignValue(query.utm_campaign)],
  ];

  for (const [key, value] of entries) {
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}

export const appLinks = {
  login: (query?: AppLinkQuery) => buildAppUrl("login", query),
  marketplace: (query?: AppLinkQuery) => buildAppUrl("marketplace", query),
  createListing: (query?: AppLinkQuery) => buildAppUrl("createListing", query),
  shop: (query?: AppLinkQuery) => buildAppUrl("shop", query),
  freight: (query?: AppLinkQuery) => buildAppUrl("freight", query),
  offerTruck: (query?: AppLinkQuery) => buildAppUrl("offerTruck", query),
  grade: (query?: AppLinkQuery) => buildAppUrl("grade", query),
  finance: (query?: AppLinkQuery) => buildAppUrl("finance", query),
  chats: (query?: AppLinkQuery) => buildAppUrl("chats", query),
};
