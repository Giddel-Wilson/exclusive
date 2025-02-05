import React, { createContext, useContext, useReducer, useEffect } from 'react';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  discount?: number;
  category: string;
  description: string;
};

type CartItem = Product & { quantity: number };

type StoreState = {
  cart: CartItem[];
  favorites: Product[];
  searchQuery: string;
};

type StoreAction =
  | { type: 'ADD_TO_CART'; payload: Product & { quantity?: number } }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'TOGGLE_FAVORITE'; payload: Product }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'CLEAR_CART' };

const initialState: StoreState = {
  cart: [],
  favorites: [],
  searchQuery: '',
};

const storeReducer = (state: StoreState, action: StoreAction): StoreState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'TOGGLE_FAVORITE': {
      const isFavorite = state.favorites.some(item => item.id === action.payload.id);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(item => item.id !== action.payload.id)
          : [...state.favorites, action.payload],
      };
    }
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
} | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    if (savedCart) {
      state.cart = JSON.parse(savedCart);
    }
    if (savedFavorites) {
      state.favorites = JSON.parse(savedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.cart, state.favorites]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};