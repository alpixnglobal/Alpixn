/** Maps an office/market name to its IANA time zone (shared by server and client code). */
const ZONES: [RegExp, string, string][] = [
  [/india|mumbai|ahmedabad|delhi/i, "Asia/Kolkata", "IST"],
  [/usa|new york|united states/i, "America/New_York", "ET"],
  [/uk|london|united kingdom/i, "Europe/London", "UK"],
  [/uae|dubai|emirates/i, "Asia/Dubai", "GST"],
  [/australia|sydney/i, "Australia/Sydney", "AET"],
  [/canada|toronto/i, "America/Toronto", "ET"],
  [/italy|milan/i, "Europe/Rome", "CET"],
  [/thailand|bangkok/i, "Asia/Bangkok", "ICT"],
  [/south africa|johannesburg/i, "Africa/Johannesburg", "SAST"],
];

export function zoneFor(name: string): { zone: string; abbr: string } {
  const hit = ZONES.find(([re]) => re.test(name));
  return hit ? { zone: hit[1], abbr: hit[2] } : { zone: "Asia/Kolkata", abbr: "IST" };
}
