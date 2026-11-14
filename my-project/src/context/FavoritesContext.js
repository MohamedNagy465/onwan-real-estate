
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites");

      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);

        if (Array.isArray(parsedFavorites)) {
          setFavoriteIds(parsedFavorites);
        }
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "favorites",
      JSON.stringify(favoriteIds)
    );
  }, [favoriteIds, isLoaded]);

  // Add or remove favorite
  function toggleFavorite(id) {
    setFavoriteIds((currentFavorites) => {
      if (currentFavorites.includes(id)) {
        return currentFavorites.filter(
          (favoriteId) => favoriteId !== id
        );
      }

      return [...currentFavorites, id];
    });
  }

  // Check if property is favorite
  function isFavorite(id) {
    return favoriteIds.includes(id);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        toggleFavorite,
        isFavorite,
        isLoaded,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}
