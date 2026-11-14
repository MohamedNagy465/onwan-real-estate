const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Personal or technical pages that shouldn't appear in search results
        disallow: ["/api/", "/favorites", "/login"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}