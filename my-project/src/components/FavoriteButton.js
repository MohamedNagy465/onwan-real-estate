"use client";

import { useFavorites } from "@/context/FavoritesContext";

export default function FavoriteButton({ propertyId }) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  // Show the saved state only after favorites are read from the browser
  const saved = isLoaded && isFavorite(propertyId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(propertyId)}
      aria-pressed={saved}
      aria-label={saved ? "Remove from favorites" : "Add to favorites"}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
        saved ? "text-rose-600" : "text-slate-500 hover:text-rose-500"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
    </button>
  );
}