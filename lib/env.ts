export const env = {
  WC_PROJECT_ID: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
  OX_BASE_URL: process.env.NEXT_PUBLIC_0X_BASE_URL ?? "https://api.0x.org",
};

export function assertEnv() {
  const missing: string[] = [];
  if (!env.WC_PROJECT_ID) missing.push("NEXT_PUBLIC_WC_PROJECT_ID");
  if (!env.OX_BASE_URL) missing.push("NEXT_PUBLIC_0X_BASE_URL");
  if (missing.length) {
    console.error("Missing ENV:", missing.join(", "));
  }
  return missing;
}
