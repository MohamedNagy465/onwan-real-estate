import { NextResponse } from "next/server";

import properties from "@/data/properties";

const DEFAULT_LIMIT = 6;
const MAX_LIMIT = 24;
const SORTS = ["default", "low-high", "high-low"];

function toNumber(value) {
  if (value === null || value.trim() === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function toPositiveInt(value, fallback) {
  const number = parseInt(value ?? "", 10);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

/**
 * GET /api/properties
 *
 * Query params (all optional):
 *   search    text matched against the property location
 *   type      property type, or "All"
 *   minPrice  minimum price
 *   maxPrice  maximum price
 *   sort      "default" | "low-high" | "high-low"
 *   ids       comma-separated property ids (used for "Saved only")
 *   page      1-based page number
 *   limit     items per page (max 24)
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const search = (searchParams.get("search") ?? "").toLowerCase().trim();
  const type = searchParams.get("type") ?? "All";
  const minPrice = toNumber(searchParams.get("minPrice"));
  const maxPrice = toNumber(searchParams.get("maxPrice"));

  const requestedSort = searchParams.get("sort") ?? "default";
  const sort = SORTS.includes(requestedSort) ? requestedSort : "default";

  const page = toPositiveInt(searchParams.get("page"), 1);
  const limit = Math.min(
    toPositiveInt(searchParams.get("limit"), DEFAULT_LIMIT),
    MAX_LIMIT
  );

  const ids = searchParams.has("ids")
    ? new Set(
        searchParams
          .get("ids")
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean)
      )
    : null;

  const result = properties.filter((property) => {
    if (ids && !ids.has(String(property.id))) return false;

    if (search && !property.location.toLowerCase().includes(search)) {
      return false;
    }

    if (type !== "All" && property.type !== type) return false;
    if (minPrice !== null && property.price < minPrice) return false;
    if (maxPrice !== null && property.price > maxPrice) return false;

    return true;
  });

  if (sort === "low-high") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "high-low") {
    result.sort((a, b) => b.price - a.price);
  }

  const total = result.length;
  const start = (page - 1) * limit;
  const items = result.slice(start, start + limit);

  return NextResponse.json({
    items,
    total,
    page,
    limit,
    hasMore: start + items.length < total,
  });
}