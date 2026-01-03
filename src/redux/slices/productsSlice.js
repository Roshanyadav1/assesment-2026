import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "https://fakestoreapi.com/products";

/**
 * Async Thunks
 */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error("Failed to fetch products");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) throw new Error("Failed to fetch product");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

/**
 * Filter and Sort Helper (Refactored for readability)
 */
const applyFiltersAndSort = (state) => {
  const { products, searchTerm, selectedCategory, sortBy } = state;

  return [...products]
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "all" || p.category === selectedCategory),
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating-high") return b.rating.rate - a.rating.rate;
      return 0;
    });
};

const initialState = {
  products: [],
  filteredProducts: [],
  currentProduct: null,
  loading: false,
  error: null,
  searchTerm: "",
  selectedCategory: "all",
  sortBy: "default",
  categories: [
    "all",
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ],
};

/**
 * Slice Definition
 */
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
      state.filteredProducts = applyFiltersAndSort(state);
    },
    setSelectedCategory: (state, { payload }) => {
      state.selectedCategory = payload;
      state.filteredProducts = applyFiltersAndSort(state);
    },
    setSortBy: (state, { payload }) => {
      state.sortBy = payload;
      state.filteredProducts = applyFiltersAndSort(state);
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Bulk Fetch
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload;
        state.filteredProducts = applyFiltersAndSort(state);
      })
      // Single Item Fetch
      .addCase(fetchProductById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentProduct = payload;
      })
      // Matchers for Shared Logic (Pending & Rejected)
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        },
      );
  },
});

export const {
  setSearchTerm,
  setSelectedCategory,
  setSortBy,
  clearCurrentProduct,
  clearError,
} = productsSlice.actions;

export default productsSlice.reducer;
