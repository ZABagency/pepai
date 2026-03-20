export function buildAffiliateUrl(
  baseUrl: string,
  utmSource: string,
  utmMedium: string,
  peptideId: string
): string {
  const url = new URL(baseUrl);
  url.searchParams.set("utm_source", utmSource);
  url.searchParams.set("utm_medium", utmMedium);
  url.searchParams.set("utm_campaign", peptideId);
  return url.toString();
}
