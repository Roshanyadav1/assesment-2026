import { createSlice } from "@reduxjs/toolkit";
import { KEYS, storage } from "../../utils/localStorage";

// Load favorites from localStorage on initialization
const loadFavoritesFromStorage = () => {
  const favorites = storage.get(KEYS.WISHLIST, []);
  if (favorites.length > 0) {
    console.log(`Loaded ${favorites.length} favorites from localStorage`);
  }
  return favorites;
};

// Save favorites to localStorage
const saveFavoritesToStorage = (favorites) => {
  storage.set(KEYS.WISHLIST, favorites);
};

const getInitialState = () => ({
  favorites: loadFavoritesFromStorage(),
});

const initialState = getInitialState();

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const product = action.payload;
      const existingIndex = state.favorites.findIndex(
        (item) => item.id === product.id,
      );

      if (existingIndex === -1) {
        state.favorites.push(product);
        saveFavoritesToStorage(state.favorites);
      }
    },
    removeFromFavorites: (state, action) => {
      const productId = action.payload;
      state.favorites = state.favorites.filter((item) => item.id !== productId);
      saveFavoritesToStorage(state.favorites);
    },
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const existingIndex = state.favorites.findIndex(
        (item) => item.id === product.id,
      );

      if (existingIndex === -1) {
        state.favorites.push(product);
      } else {
        state.favorites.splice(existingIndex, 1);
      }
      saveFavoritesToStorage(state.favorites);
    },
    clearFavorites: (state) => {
      state.favorites = [];
      saveFavoritesToStorage(state.favorites);
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  clearFavorites,
} = favoritesSlice.actions;

// Selectors
export const selectFavorites = (state) => state.favorites.favorites;
export const selectIsFavorite = (state, productId) =>
  state.favorites.favorites.some((item) => item.id === productId);
export const selectFavoritesCount = (state) => state.favorites.favorites.length;

export default favoritesSlice.reducer;
