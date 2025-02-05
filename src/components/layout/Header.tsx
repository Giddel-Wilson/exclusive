import { ShoppingCart, Heart, User, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Mock suggestions data - replace with actual API call in production
const getSuggestions = (query: string) => {
  const allSuggestions = [
    "iPhone 15", "Samsung Galaxy", "Gaming Laptop", "Wireless Earbuds",
    "Fresh Apples", "Organic Milk", "Whole Grain Bread", "Coffee Beans",
    "Running Shoes", "Yoga Mat", "Protein Powder", "Vitamins"
  ];
  return allSuggestions.filter(item => 
    item.toLowerCase().includes(query.toLowerCase())
  );
};

export function Header() {
  const { state, dispatch } = useStore();
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = state.favorites.length;

  useEffect(() => {
    if (searchInput.length > 0) {
      setSuggestions(getSuggestions(searchInput));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_SEARCH_QUERY', payload: searchInput });
    navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchInput(suggestion);
    dispatch({ type: 'SET_SEARCH_QUERY', payload: suggestion });
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="hidden md:block text-xl font-bold">
            Exclusive
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <Link to="/contact" className="hover:text-primary">Contact</Link>
            <Link to="/about" className="hover:text-primary">About</Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex relative" ref={suggestionsRef}>
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search"
                  className="w-full lg:w-[300px]"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <Button type="submit" variant="ghost" className="absolute right-0 top-0 h-full">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </Button>
              </form>
              
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
            
            <Link to="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
