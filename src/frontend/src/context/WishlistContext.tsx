import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface WishlistContextType {
  wishlistItems: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistItems: () => string[];
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'studyneeds-wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (productId: string) => {
    setWishlistItems((prev) => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prev) => prev.filter((id) => id !== productId));
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.includes(productId);
  };

  const getWishlistItems = (): string[] => {
    return wishlistItems;
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getWishlistItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = React.useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlistContext must be used within a WishlistProvider');
  }
  return context;
}
