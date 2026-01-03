const isServer = typeof window === "undefined";

export const KEYS = {
  WISHLIST: "studio_wishlist_v1",
};

export const storage = {
  get: (key, fallback = null) => {
    if (isServer) return fallback;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (err) {
      console.warn(`Storage Read Error [${key}]:`, err);
      return fallback;
    }
  },

  set: (key, value) => {
    if (isServer) return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn(`Storage Write Error [${key}]:`, err);
      return false;
    }
  },

  remove: (key) => {
    if (isServer) return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.warn(`Storage Delete Error [${key}]:`, err);
      return false;
    }
  },

  clear: () => {
    if (isServer) return false;
    try {
      localStorage.clear();
      return true;
    } catch (err) {
      console.warn("Storage Clear Error:", err);
      return false;
    }
  },
};
