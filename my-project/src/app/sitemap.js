import properties from "@/data/properties";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap() {
  const now = new Date();

  const pages = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
  ].map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: page.priority,
  }));

  // Change "/properties/" if your details route is different
  const listings = properties.map((property) => ({
    url: `${SITE_URL}/properties/${property.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...pages, ...listings];
}