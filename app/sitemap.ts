import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://usatether.io";
  const now = new Date().toISOString();
  const paths = ["", "/swap", "/bridge", "/buy", "/features", "/stats", "/faq", "/about", "/support", "/wallet", "/compliance"];
  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.6,
  }));
}
